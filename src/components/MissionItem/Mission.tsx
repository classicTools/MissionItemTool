import missionItemData from '../../data/MissionItem/MissionItem.json'
import missionMapData from '../../data/MissionItem/MissionMap.json'
import { MissionData, MS, MissionItemData, MapId, MissionId, ItemId, MissionDataPlus } from '../../types'
import styled, { css } from 'styled-components'
import { useState } from 'react'
import MissionItems from './MissionItems'
import { useSettingsContext } from '../../context/Settings'
import { useItemsContext } from '../../context/Items'
import { missionMap } from '../../data/MissionItem/Data'
import { useItemHoverContext } from '../../context/ItemHover'

const flashMission = css`
    @keyframes flashMission {
        0%,
        50%,
        100% {
            opacity: 1;
        }
        25%,
        75% {
            opacity: 0;
        }
    }
    animation: flashMission 3s linear 0s infinite;
    color: black;
`
const MissionBox = styled.div<{ flash: boolean; inSelectedMap: boolean; containsBoughtItem: boolean; state: MS }>`
    height: 25px;
    width: 50px;
    min-width: 50px;
    font-size: 13px;
    text-align: center;
    border-radius: 8px;
    user-select: none;
    display: grid;

    background-color: ${(props) => {
        let c
        if (props.containsBoughtItem) c = 'orange'

        if (props.state === MS.Ready) c = 'lightgreen'
        else if (props.state === MS.Blocked) c = 'green'
        else if (props.state === MS.PartlyLocked) c = 'yellow'
        //else c = 'white'

        return c
    }};

    ${(props) => props.inSelectedMap && 'box-shadow: inset 0 0 1px 4px orange'}
    ${(props) => props.flash && flashMission}
`
const Reward = styled.div<{ requiresItems: boolean }>`
    height: 20px;
    width: 40px;
    min-width: 40px;
    font-weight: ${(props) => (props.requiresItems ? 'bold' : 'normal')};
    justify-self: center;
    align-self: end;
`

const TooltipAnchor = styled.div`
    position: relative;
    display: inline-block;
    min-width: 38px;
`

const Tooltip = styled.div<{ left: boolean; show: boolean }>`
    visibility: ${(props) => (props.show ? 'visible' : 'hidden')};
    width: 500px;
    background-color: lightyellow;
    color: black;
    text-align: left;
    border-radius: 6px;
    padding: 10px 10px 0 10px;

    /* Position the tooltip */
    position: absolute;
    z-index: 20;
    line-height: initial;

    top: 15px;
    ${(props) =>
        props.left
            ? css`
                  left: 15px;
              `
            : css`
                  right: 15px;
              `}
`

interface MissionProps {
    mission: MissionDataPlus
    items: ItemId[]
}
const Mission = ({ mission, items }: MissionProps) => {
    const { map } = useSettingsContext()
    const { itemHovered } = useItemHoverContext()
    const [missionHovered, setMissionHovered] = useState<boolean>(false)
    const missionItems: MissionItemData[] = missionItemData.filter((mi) => mi.mission === mission.pk)

    const requiresItems = missionItems.length > 0
    const relevantToItem = itemHovered !== null && items?.includes(itemHovered)
    const flash = relevantToItem && !missionHovered

    const inSelectedMap = map ? missionMap[map].includes(mission.pk) : false
    return (
        <MissionBox
            onMouseEnter={() => setMissionHovered(true)}
            onMouseLeave={() => setMissionHovered(false)}
            flash={flash}
            containsBoughtItem={relevantToItem}
            inSelectedMap={inSelectedMap}
            state={mission.state}
        >
            <Reward requiresItems={requiresItems}>{mission.reward}</Reward>
            {missionHovered && (
                <TooltipAnchor>
                    <Tooltip left={mission.order < 8} show={missionHovered}>
                        {mission.order} - {mission.name}
                        <div dangerouslySetInnerHTML={{ __html: mission.objectives }}></div>
                        {requiresItems && <MissionItems missionItems={missionItems} />}
                    </Tooltip>
                </TooltipAnchor>
            )}
        </MissionBox>
    )
}

export default Mission
