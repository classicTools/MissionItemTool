import missionsData from '../data/MissionItem/Mission.json'
import missionItemData from '../data/MissionItem/MissionItem.json'
import sortBy from 'sort-by'
import { createContext, useContext, PropsWithChildren } from 'react'
import { ItemData, ItemId, MissionItemData, MissionDataPlus, MS, MissionData, MissionSetId } from '../types'
import { useItemsContext } from './Items'
import { missionSetMissions } from '../data/MissionItem/Data'

type RequirementGroups = { [index: string]: MissionItemData[] }

export const calculateGain = (missionDataState: MissionDataPlus[], itemsBought: ItemId[], itemId: number): number => {
    const relevantMissions = missionItemData.filter((mi) => mi.item === itemId).map((mi) => mi.mission)
    const missionSets = new Set(missionsData.filter((m) => relevantMissions.includes(m.pk)).map((m) => m.mission_set))
    const lockedMissionsInRelevantSets = missionDataState.filter(
        (mi) => missionSets.has(mi.mission_set) && mi.state !== MS.Ready
    )

    const gainState: MissionDataPlus[] = getMissionStates(lockedMissionsInRelevantSets, [...itemsBought, itemId])
    const gain = gainState.filter((g) => g.state === MS.Ready).reduce((acc, cur) => (acc += cur.reward), 0)
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
    const allNeedsMetState = blockedFromNow ? MS.Blocked : MS.Ready
    let state = allNeedsMetState

    if (missionItems.length) {
        // count all requirements and met requirements
        const itemsMinusBoughtMustHaves = missionItems
            .filter(
                (mi: MissionItemData) =>
                    (itemsBought && !itemsBought.includes(mi.item) && !mi.any && mi.group === null) ||
                    mi.any ||
                    mi.group
            )
            .sort(sortBy('group'))
        const metMusthaves = missionItems.length - itemsMinusBoughtMustHaves.length
        const unmetMusthaves = itemsMinusBoughtMustHaves.filter((item) => !item.any && !item.group).length

        //shortcut
        if (metMusthaves > 0 && unmetMusthaves > 0) return { state: MS.PartlyLocked, blockedFromNow: true }

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
                if (metORs > 0 && metORs < ORs) return { state: MS.PartlyLocked, blockedFromNow: true }
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
            state = MS.Locked
            blockedFromNow = true
        } else {
            state = MS.PartlyLocked
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
export const getStatesAndTotals: (md: MissionData[], itemsBought: ItemId[]) => MissionsContext = (md, itemsBought) => {
    const missionDataState: MissionDataPlus[] = getMissionStates(md, itemsBought)
    const readyMissions = missionDataState.filter((mi) => mi.state === MS.Ready)
    const unlockedMissions = readyMissions.length

    let unlockedMissionSets = 0
    Object.entries(missionSetMissions).forEach(([key, value]) => {
        if (
            value.length ===
            missionDataState.filter((m) => m.mission_set.toString() === key && m.state === MS.Ready).length
        )
            unlockedMissionSets++
    })

    const unlockedRewards = readyMissions.reduce((acc: number, cur) => {
        return (acc += cur.reward)
    }, 0)

    return { missionDataState, unlockedMissions, unlockedRewards, unlockedMissionSets }
}

interface MissionsContext {
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
const MissionsContext = createContext<MissionsContext>(defaultMissions)
const WithMissionsContext = ({ children }: PropsWithChildren) => {
    const { itemsBought } = useItemsContext()
    const { missionDataState, unlockedMissions, unlockedRewards, unlockedMissionSets } = getStatesAndTotals(
        missionsData,
        itemsBought
    )

    return (
        <MissionsContext.Provider value={{ missionDataState, unlockedRewards, unlockedMissions, unlockedMissionSets }}>
            {children}
        </MissionsContext.Provider>
    )
}
export default WithMissionsContext
export const useMissionsContext = () => useContext(MissionsContext)
