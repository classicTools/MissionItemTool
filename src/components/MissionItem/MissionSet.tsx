import styled from 'styled-components'
import missionData from '../../data/MissionItem/Mission.json'
import missionItemData from '../../data/MissionItem/MissionItem.json'
import missionSetMapData from '../../data/MissionItem/MissionSetMap.json'
import { flexR } from '../../CommonStyles'
import {
    ItemId,
    MapId,
    MissionData,
    MissionDataPlus,
    MissionItemData,
    MissionSetData,
    MissionSetId,
    MS,
} from '../../types'
import Mission from './Mission'
import { useSettingsContext } from '../../context/Settings'
import WithItemsContext, { useItemsContext } from '../../context/Items'
import { missionSetMap, missionSetMissions, simpleMissionItems } from '../../data/MissionItem/Data'
import { useEffect, useState } from 'react'
import { useMissionsContext } from '../../context/Mission'
import { useItemHoverContext } from '../../context/ItemHover'

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
    cursor: pointer;
    user-select: none;
`
export const SetHeader = styled.div<{ bold?: boolean; inSelectedMap?: boolean }>`
    ${flexR}
    justify-content:flex-end;
    align-items: center;
    gap: 5px;
    cursor: pointer;
    user-select: none;
    &:hover {
        color: DarkOrange;
    }
    ${(props) => props.bold && 'font-weight:bold'}
    ${(props) => props.inSelectedMap && 'background-color:gold'}
`

const MissionSet = ({ missionSet }: MissionSetProps) => {
    const { map } = useSettingsContext()
    const { missionDataState } = useMissionsContext()
    const { setItemsBought } = useItemsContext()
    const { itemHovered } = useItemHoverContext()
    const inSelectedMap: boolean = map ? missionSetMap[map].includes(missionSet.pk) : false

    const toggleMustHaves = (): void => {
        const mustHaves: ItemId[] = missionItemData
            .filter((mi) => !mi.any && mi.group === null && missionSetMissions[missionSet.pk].includes(mi.mission))
            .map((mi) => mi.item)

        setItemsBought((itemsBought) => {
            const notAllBought = !mustHaves.every((m) => itemsBought.includes(m))
            if (notAllBought) {
                //add all
                itemsBought = [...itemsBought, ...mustHaves]
            } else {
                itemsBought = itemsBought.filter((itemB) => !mustHaves.includes(itemB))
            }
            return itemsBought
        })
    }

    return (
        <MissionSetRow>
            <SetHeader inSelectedMap={inSelectedMap} onClick={toggleMustHaves}>
                <SetLabel> {missionSet.name}</SetLabel>
                <SetPic src={missionSet.image_url} />
            </SetHeader>
            <MissionsContainer>
                {missionDataState
                    .filter((m) => m.mission_set === missionSet.pk)
                    .map((m: MissionDataPlus) => {
                        return <Mission mission={m} key={m.pk} />
                    })}
            </MissionsContainer>
        </MissionSetRow>
    )
}

export default MissionSet
