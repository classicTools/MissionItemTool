import styled from 'styled-components'
import missions from '../../data/MissionItem/Mission.json'
import missionSets from '../../data/MissionItem/MissionSet.json'
import { useMissionsContext } from '../../context/Mission'
const missionRewardTotal = missions.reduce((acc, cur) => {
    acc += cur.reward
    return acc
}, 0)

const UnlocksDiv = styled.div`
    display: grid;
    grid-template-columns: 100px 130px 90px;
    grid-template-rows: repeat(3, 18px);
    column-gap: 10px;
    row-gap: 5px;
`
const LabelDiv = styled.div`
    grid-column: 1 / 2;
    text-align: right;
    font-weight: bold;
`
const Value = styled.div`
    grid-column: 2 / 3;
    text-align: right;
`
const Unit = styled.div`
    grid-column: 3 / 4;
    text-align: left;
`
const Unlocks = () => {
    const { unlockedRewards, unlockedMissions, unlockedMissionSets } = useMissionsContext()
    return (
        <UnlocksDiv>
            <LabelDiv>Unlocks:</LabelDiv>
            <Value>
                {' '}
                {unlockedRewards} / {missionRewardTotal}
            </Value>
            <Unit> gm$</Unit>

            <Value>
                {unlockedMissions} / {missions.length}
            </Value>
            <Unit>missions</Unit>
            <Value>
                {unlockedMissionSets} / {missionSets.length}
            </Value>
            <Unit>mission packs</Unit>
        </UnlocksDiv>
    )
}

export default Unlocks
