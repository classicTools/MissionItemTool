import styled from 'styled-components'
import { useMissionsContext } from '../../context/MissionContext'

const UnlocksDiv = styled.div`
    display: grid;
    grid-template-columns: 150px 110px 90px;
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
    const { missionDataState, unlockedRewards, unlockedMissions, unlockedMissionSets } = useMissionsContext()
    const missionRewardTotal = missionDataState.reduce((acc, cur) => {
        acc += cur.reward
        return acc
    }, 0)
    return (
        <UnlocksDiv>
            <LabelDiv>Unlocks:</LabelDiv>
            <Value>
                {' '}
                {unlockedRewards} / {missionRewardTotal}
            </Value>
            <Unit> gm$</Unit>

            <Value>
                {unlockedMissions} / {missionDataState.length}
            </Value>
            <Unit>missions</Unit>
            <Value>
                {unlockedMissionSets} / {new Set(missionDataState.map((mds) => mds.mission_set)).size}
            </Value>
            <Unit>mission packs</Unit>
        </UnlocksDiv>
    )
}

export default Unlocks
