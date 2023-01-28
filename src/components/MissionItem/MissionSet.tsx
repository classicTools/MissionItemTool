import styled from 'styled-components'
import missionData from '../../data/MissionItem/Mission.json'
import missionItemData from '../../data/MissionItem/MissionItem.json'
import { flexR } from '../../GenericStyles'
import { MissionData, MissionSetData, MissionState } from '../../types'
import Mission from './Mission'
export const MissionSetRow = styled.div`
    display: grid;
    grid-template-columns: 180px 500px;
    gap: 5px;
    height: 27px;
`

const MissionsContainer = styled.div`
    ${flexR}
    align-items: center;
    gap: 2px;
`
interface MissionSetProps {
    missionSet: MissionSetData
}

const SetPic = styled.img`
    height: 16px;
`
const SetLabel = styled.label`
    text-align: right;
`
export const SetHeader = styled.div<{ bold?: boolean }>`
    ${flexR}
    justify-content:flex-end;
    gap: 5px;
    ${(props) => props.bold && 'font-weight:bold'}
`
const MissionSet = ({ missionSet }: MissionSetProps) => {
    const missions: MissionData[] = missionData.filter((m) => m.mission_set === missionSet.pk)
    let unlocked = true
    return (
        <MissionSetRow>
            <SetHeader>
                <SetLabel> {missionSet.name}</SetLabel>
                <SetPic src={missionSet.image_url} />
            </SetHeader>
            <MissionsContainer>
                {missions.map((m: MissionData) => {
                    missionItemData.filter((mi) => mi.mission == m.pk)

                    return <Mission mission={m} state={MissionState.Unlocked} key={m.pk} />
                })}
            </MissionsContainer>
        </MissionSetRow>
    )
}

export default MissionSet
