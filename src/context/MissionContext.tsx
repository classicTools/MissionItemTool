import missionsData from '../data/MissionItem/lookups/Mission.json'
import missionItemData from '../data/MissionItem/MissionItem.json'
import sortBy from 'sort-by'
import { createContext, useContext, PropsWithChildren } from 'react'
import { ItemData, ItemId, MissionItemData, MissionDataPlus, MissionState, MissionData, MissionSetId } from '../types'
import { useItemsContext } from './ItemContext'
import { missionSetMissions } from '../data/MissionItem/Data'

type RequirementGroups = { [index: string]: MissionItemData[] }

export const calculateGain = (missionDataState: MissionDataPlus[], itemsBought: ItemId[], itemId: number): number => {
    const relevantMissions = missionItemData.filter((mi) => mi.item === itemId).map((mi) => mi.mission)
    const missionSets = new Set(missionsData.filter((m) => relevantMissions.includes(m.pk)).map((m) => m.mission_set))
    const lockedMissionsInRelevantSets = missionDataState.filter((mi) => missionSets.has(mi.mission_set) && mi.state !== MissionState.Ready)

    const gainState: MissionDataPlus[] = getMissionStates(lockedMissionsInRelevantSets, [...itemsBought, itemId])
    const gain = gainState.filter((g) => g.state === MissionState.Ready).reduce((acc, cur) => (acc += cur.reward), 0)
    return gain
}

/**
 *
 * @param missionItems
 * @param itemsBought
 * @param blockedFromNow whether the rest of the missions in the parent mission set should be blocked because this or a previous mission is locked
 * @returns
 */
const getMissionState = (missionItems: MissionItemData[], itemsBought: ItemId[], blockedFromNow: boolean) => {
    const allNeedsMetState = blockedFromNow ? MissionState.Blocked : MissionState.Ready
    let state = allNeedsMetState

    if (missionItems.length) {
        // count all requirements and met requirements
        const itemsMinusBoughtMustHaves = missionItems
            .filter((mi: MissionItemData) => (itemsBought && !itemsBought.includes(mi.item) && !mi.any && mi.group === null) || mi.any || mi.group)
            .sort(sortBy('group'))
        const metMusthaves = missionItems.length - itemsMinusBoughtMustHaves.length
        const unmetMusthaves = itemsMinusBoughtMustHaves.filter((item) => !item.any && !item.group).length

        //shortcut
        if (metMusthaves > 0 && unmetMusthaves > 0) return { state: MissionState.PartlyLocked, blockedFromNow: true }

        let [ORs, metORs, ANDs, metANDs] = [0, 0, 0, 0]

        if (itemsMinusBoughtMustHaves.length) {
            if (itemsMinusBoughtMustHaves.some((item) => item.any)) {
                const itemORGroups = itemsMinusBoughtMustHaves.reduce((acc: RequirementGroups, cur) => {
                    if (cur.group !== null && cur.any) acc[cur.group] = [...(acc[cur.group] ?? []), cur]
                    return acc
                }, {})
                ORs = Object.keys(itemORGroups).length
                Object.entries(itemORGroups).forEach(([key, value]) => {
                    let oneGroup = value
                    if (oneGroup.some((mi) => itemsBought.includes(mi.item))) {
                        metORs++
                    }
                })

                //shortcut
                if (metORs > 0 && metORs < ORs) return { state: MissionState.PartlyLocked, blockedFromNow: true }
            }

            if (itemsMinusBoughtMustHaves.some((item) => !item.any && item.group)) {
                ANDs = 1 //axis deer mission 9
                const itemANDGroups = itemsMinusBoughtMustHaves.reduce((acc: RequirementGroups, cur) => {
                    if (cur.group !== null && !cur.any) acc[cur.group] = [...(acc[cur.group] ?? []), cur]
                    return acc
                }, {})

                Object.entries(itemANDGroups).forEach(([key, value]) => {
                    //only need one group satisfied to pass TODO: support > 1 such condition
                    let groupOfItems = value
                    if (metANDs === 0 && groupOfItems.every((mi) => itemsBought.includes(mi.item))) {
                        metANDs++
                    }
                })
            }
        }
        const totalReqs = ORs + ANDs + metMusthaves + unmetMusthaves
        const satisfiedReqs = metORs + metANDs + metMusthaves
        const diff = totalReqs - satisfiedReqs
        if (diff === 0) {
            state = allNeedsMetState
        } else if (diff === totalReqs) {
            state = MissionState.Locked
            blockedFromNow = true
        } else {
            state = MissionState.PartlyLocked
            blockedFromNow = true
        }
    }
    return { state, blockedFromNow }
}
const getMissionStates = (md: MissionData[], itemsBought: ItemId[]): MissionDataPlus[] => {
    let blockedFromNow = false
    let set: MissionSetId
    const missionDataState: MissionDataPlus[] = md.map((mission) => {
        if (set !== mission.mission_set) {
            blockedFromNow = false //reset for each new set
            set = mission.mission_set
        }
        // each mission
        const missionItems = missionItemData.filter((mi: MissionItemData) => mi.mission === mission.pk)
        const { state, blockedFromNow: blocked } = getMissionState(missionItems, itemsBought, blockedFromNow)
        blockedFromNow = blocked
        return { ...mission, state }
    })
    return missionDataState
}
export const getStatesAndTotals: (md: MissionData[], itemsBought: ItemId[]) => MissionContext = (md, itemsBought) => {
    const missionDataState: MissionDataPlus[] = getMissionStates(md, itemsBought)
    const readyMissions = missionDataState.filter((mi) => mi.state === MissionState.Ready)
    const unlockedMissions = readyMissions.length

    let unlockedMissionSets = 0
    Object.entries(missionSetMissions).forEach(([key, value]) => {
        if (value.length === missionDataState.filter((m) => m.mission_set.toString() === key && m.state === MissionState.Ready).length) unlockedMissionSets++
    })

    const unlockedRewards = readyMissions.reduce((acc: number, cur) => {
        return (acc += cur.reward)
    }, 0)

    return { missionDataState, unlockedMissions, unlockedRewards, unlockedMissionSets }
}

interface MissionContext {
    missionDataState: MissionDataPlus[]
    unlockedRewards: number
    unlockedMissions: number
    unlockedMissionSets: number
}

const defaultMissions = {
    missionDataState: [],
    unlockedRewards: 0,
    unlockedMissions: 0,
    unlockedMissionSets: 0,
}
const MissionContext = createContext<MissionContext>(defaultMissions)
const WithMissionsContext = ({ children }: PropsWithChildren) => {
    const { itemsBought } = useItemsContext()
    const { missionDataState, unlockedMissions, unlockedRewards, unlockedMissionSets } = getStatesAndTotals(missionsData, itemsBought)

    return <MissionContext.Provider value={{ missionDataState, unlockedRewards, unlockedMissions, unlockedMissionSets }}>{children}</MissionContext.Provider>
}
export default WithMissionsContext
export const useMissionsContext = () => useContext(MissionContext)
