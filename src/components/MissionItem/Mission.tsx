import missionItemData from '../../data/MissionItem/MissionItem.json'
import missionMapData from '../../data/MissionItem/MissionMap.json'
import { MissionData, MissionState, MissionItemData, MapId, MissionId, ItemId } from '../../types'
import styled, { css } from 'styled-components'
import { useState } from 'react'
import MissionItems from './MissionItems'
import { useSettingsContext } from '../../context/Settings'
import { useItemsContext } from '../../context/Items'
import { missionMap } from '../../data/MissionItem/Data'

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
const MissionBox = styled.div<{ flash: boolean; inSelectedMap: boolean; relevantToItem: boolean }>`
    height: 25px;
    width: 50px;
    min-width: 50px;
    font-size: 13px;
    text-align: center;
    border-radius: 8px;
    user-select: none;
    cursor: pointer;
    background-color: ${(props) => (props.relevantToItem ? 'orange' : 'lightblue')};
    display: grid;

    ${(props) => props.flash && flashMission}
    ${(props) => props.inSelectedMap && 'box-shadow: inset 0 0 1px 4px orange'}
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
    mission: MissionData
    state: MissionState
    items: ItemId[]
}
const Mission = ({ mission, state, items }: MissionProps) => {
    const { map } = useSettingsContext()
    const { itemHovered } = useItemsContext()
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
            relevantToItem={relevantToItem}
            inSelectedMap={inSelectedMap}
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
