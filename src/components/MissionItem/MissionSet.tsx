import styled from 'styled-components'
import missionData from '../../data/MissionItem/Mission.json'
import missionItemData from '../../data/MissionItem/MissionItem.json'
import missionSetMapData from '../../data/MissionItem/MissionSetMap.json'
import { flexR } from '../../CommonStyles'
import { MapId, MissionData, MissionDataPlus, MissionSetData, MissionSetId, MissionState } from '../../types'
import Mission from './Mission'
import { useSettingsContext } from '../../context/Settings'
import WithItemsContext, { useItemsContext } from '../../context/Items'
import { missionSetMap, simpleMissionItems } from '../../data/MissionItem/Data'
import { useEffect, useState } from 'react'

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
export const SetHeader = styled.div<{ bold?: boolean; inSelectedMap?: boolean }>`
    ${flexR}
    justify-content:flex-end;
    align-items: center;
    gap: 5px;
    ${(props) => props.bold && 'font-weight:bold'}
    ${(props) => props.inSelectedMap && 'background-color:gold'}
`

const MissionSet = ({ missionSet }: MissionSetProps) => {
    const { map } = useSettingsContext()
    const { itemsBought } = useItemsContext()
    const [missions, setMissions] = useState<MissionDataPlus[]>(
        missionData.filter((m) => m.mission_set === missionSet.pk).map((m) => ({ ...m, state: MissionState.Ready }))
    )

    const inSelectedMap: boolean = map ? missionSetMap[map].includes(missionSet.pk) : false

    useEffect(() => {
        // determines mission state
        missions.map((m) => {})
        return () => {}
    }, [itemsBought])

    return (
        <MissionSetRow>
            <SetHeader inSelectedMap={inSelectedMap}>
                <SetLabel> {missionSet.name}</SetLabel>
                <SetPic src={missionSet.image_url} />
            </SetHeader>
            <MissionsContainer>
                {missions.map((m: MissionData) => {
                    return (
                        <Mission mission={m} state={MissionState.Ready} items={simpleMissionItems[m.pk]} key={m.pk} />
                    )
                })}
            </MissionsContainer>
        </MissionSetRow>
    )
}

export default MissionSet
