import { getStatesAndTotals } from '../context/MissionContext'
import itemsData from '../data/MissionItem/lookups/Item.json'
import missionItemsData from '../data/MissionItem/MissionItem.json'
import missionsData from '../data/MissionItem/lookups/Mission.json'
import { MissionDataPlus, MissionId, MissionState } from '../types'

it('no items bought', () => {
    const { missionDataState } = getStatesAndTotals(missionsData, [])
    expect(missionDataState.filter((ms) => ms.state === MissionState.Ready).length).toBe(299)
    const missionsWithRequirements = missionItemsData.reduce((acc: MissionId[], cur) => {
        if (!acc.includes(cur.mission)) acc.push(cur.mission)
        return acc
    }, [])
    expect(missionDataState.filter((ms: MissionDataPlus) => ms.state === MissionState.Locked).length).toBe(missionsWithRequirements.length)
})
it('all items bought', () => {
    const { missionDataState } = getStatesAndTotals(
        missionsData,
        itemsData.map((i) => i.pk)
    )
    expect(missionDataState.filter((ms: MissionDataPlus) => ms.state === MissionState.Ready).length).toBe(missionsData.length)
})
