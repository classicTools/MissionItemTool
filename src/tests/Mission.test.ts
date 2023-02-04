import { getStatesAndTotals } from '../context/Mission'
import itemsData from '../data/MissionItem/Item.json'
import missionItemsData from '../data/MissionItem/MissionItem.json'
import missionsData from '../data/MissionItem/Mission.json'
import { MissionDataPlus, MissionId, MS } from '../types'

it('no items bought', () => {
    const { missionDataState } = getStatesAndTotals(missionsData, [])
    expect(missionDataState.filter((ms) => ms.state === MS.Ready).length).toBe(299)
    const missionsWithRequirements = missionItemsData.reduce((acc: MissionId[], cur) => {
        if (!acc.includes(cur.mission)) acc.push(cur.mission)
        return acc
    }, [])
    expect(missionDataState.filter((ms: MissionDataPlus) => ms.state === MS.Locked).length).toBe(
        missionsWithRequirements.length
    )
})
it('all items bought', () => {
    const { missionDataState } = getStatesAndTotals(
        missionsData,
        itemsData.map((i) => i.pk)
    )
    expect(missionDataState.filter((ms: MissionDataPlus) => ms.state === MS.Ready).length).toBe(missionsData.length)
})
