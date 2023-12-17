import missionItemData from '../../data/MissionItem/MissionItem.json'
import missionMapData from '../../data/MissionItem/MissionMap.json'
import { MissionData, MissionState, MissionItemData, MapId, MissionId, ItemId, MissionDataPlus, LocalStorageVars } from '../../types'
import styled, { css } from 'styled-components'
import { useState } from 'react'
import MissionItems from './MissionItems'
import { useSettingsContext } from '../../context/Settings'
import { useItemsContext } from '../../context/Items'
import { missionMap, simpleMissionItems } from '../../data/MissionItem/Data'
import { useItemHoverContext } from '../../context/ItemHover'
import { useBookmarkContext } from '../../context/Bookmarks'

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
const MissionBox = styled.div<{
    flash: boolean
    inSelectedMap: boolean
    containsBoughtItem: boolean
    state: MissionState
}>`
    height: 25px;
    width: 50px;
    min-width: 50px;
    font-size: 13px;
    text-align: center;
    border-radius: 8px;
    user-select: none;
    cursor: pointer;
    display: grid;

    background-color: ${({ containsBoughtItem, state }) => {
        let c
        if (containsBoughtItem) c = 'orange'

        if (state === MissionState.Ready) c = 'lightgreen'
        else if (state === MissionState.Blocked) c = 'green'
        else if (state === MissionState.PartlyLocked) c = 'yellow'
        //else c = 'white'

        return c
    }};

    ${({ inSelectedMap }) => inSelectedMap && 'box-shadow: inset 0 0 1px 4px orange'}
    ${({ flash }) => flash && flashMission}
`
const Reward = styled.div<{ requiresItems: boolean; bookmarked?: boolean }>`
    height: 20px;
    width: 40px;
    min-width: 40px;
    font-weight: ${(props) => (props.requiresItems ? 'bold' : 'normal')};
    justify-self: center;
    align-self: end;
    ${(props) => props.bookmarked && 'color: red'}
`

const TooltipAnchor = styled.div`
    position: relative;
    display: inline-block;
    min-width: 38px;
`

const Tooltip = styled.div<{ left: boolean }>`
    width: 500px;
    background-color: lightyellow;
    color: black;
    text-align: left;
    border-radius: 6px;
    padding: 10px 10px 0 10px;

    /* Position the tooltip */
    position: absolute;
    z-index: 20;

    ${({ left }) =>
        left
            ? css`
                  left: 15px;
              `
            : css`
                  right: 15px;
              `}
`

interface MissionProps {
    mission: MissionDataPlus
}
const bookmarks = LocalStorageVars.Bookmarks

const Mission = ({ mission }: MissionProps) => {
    const { map } = useSettingsContext()
    const { itemHovered } = useItemHoverContext()
    const [missionHovered, setMissionHovered] = useState<boolean>(false)
    const { bookmarks, toggleBookmark } = useBookmarkContext()
    const missionItems: MissionItemData[] = missionItemData.filter((mi) => mi.mission === mission.pk)

    const bookmarked = bookmarks[mission.mission_set] === mission.order

    const requiresItems = missionItems.length > 0
    const containsHoveredItem = itemHovered !== null && simpleMissionItems[mission.pk]?.includes(itemHovered)
    const flash = containsHoveredItem && !missionHovered

    const inSelectedMap = map ? missionMap[map].includes(mission.pk) : false

    return (
        <MissionBox
            onMouseEnter={() => setMissionHovered(true)}
            onMouseLeave={() => setMissionHovered(false)}
            onClick={() => toggleBookmark(mission)}
            flash={flash}
            containsBoughtItem={containsHoveredItem}
            inSelectedMap={inSelectedMap}
            state={mission.state}
        >
            <Reward requiresItems={requiresItems} bookmarked={bookmarked}>
                {mission.reward}
            </Reward>
            {missionHovered && (
                <TooltipAnchor>
                    <Tooltip left={mission.order < 8}>
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
