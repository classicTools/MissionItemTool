import missionItemData from '../../data/MissionItem/mappings/MissionItem.json'
import { MissionState, MissionItemData, MissionDataPlus } from '../../types'
import styled, { css } from 'styled-components'
import { CustomColors, useSettingsContext } from '../../context/SettingsContext'
import { missionMap, simpleMissionItems } from '../../data/MissionItem/Data'
import { useItemHoverContext } from '../../context/ItemHover'
import { useBookmarkContext } from '../../context/BookmarkContext'
import { useHover } from '../../hooks'
import { pointerCss } from '../../CommonStyles'
import MissionTooltip from './MissionTooltip'
import { transitionCss } from '../PermittedAmmo/Animal'

const flashMission = css`
    animation: flash 3s linear 0s infinite;
    color: ${({ theme }) => theme.fontColor};
`
const MissionBox = styled.div<{
    flash: boolean
    inSelectedMap: boolean
    containsBoughtItem: boolean
    state: MissionState
    customColors: CustomColors
}>`
    height: 25px;
    width: 50px;
    min-width: 50px;
    font-size: 13px;
    text-align: center;
    border-radius: 8px;
    ${pointerCss}
    display: grid;

    background-color: ${({ containsBoughtItem, state, customColors, theme }) => {
        let c
        if (containsBoughtItem) c = theme.boughtItemHighlight

        if (state === MissionState.Ready) c = customColors.ready
        else if (state === MissionState.Blocked) c = customColors.blocked
        else if (state === MissionState.PartlyLocked) c = customColors.partlyLocked

        return c
    }};

    ${({ inSelectedMap, theme }) => inSelectedMap && `box-shadow: inset 0 0 1px 4px ${theme.missionHighlight};`}
    ${({ flash }) => flash && flashMission}
    ${transitionCss}
`
const Reward = styled.div<{ requiresItems: boolean; bookmarked?: boolean; color: string }>`
    height: 20px;
    width: 40px;
    min-width: 40px;
    font-weight: ${(props) => (props.requiresItems ? 'bold' : 'normal')};
    justify-self: center;
    align-self: end;
    ${(props) => props.bookmarked && `color: ${props.color || props.theme.bookmarkColor}; font-weight: bold;`}
    ${transitionCss}
`

export interface MissionProps {
    mission: MissionDataPlus
}

const Mission = ({ mission }: MissionProps) => {
    const { map, customColors } = useSettingsContext()
    const { itemHovered } = useItemHoverContext()
    const { hover: missionHovered, hoverFunctions } = useHover()
    const { bookmarks, toggleBookmark } = useBookmarkContext()
    const { pk, state, reward, order, mission_set } = mission
    const missionItems: MissionItemData[] = missionItemData.filter((mi) => mi.mission === pk)

    const bookmarked = bookmarks[mission_set] === order

    const requiresItems = missionItems.length > 0
    const containsHoveredItem = itemHovered !== null && simpleMissionItems[pk]?.includes(itemHovered)
    const flash = containsHoveredItem && !missionHovered

    const inSelectedMap = map ? missionMap[map].includes(pk) : false

    return (
        <MissionBox
            {...hoverFunctions}
            onClick={() => toggleBookmark(mission, bookmarked)}
            flash={flash}
            containsBoughtItem={containsHoveredItem}
            inSelectedMap={inSelectedMap}
            state={state}
            customColors={customColors}
        >
            <Reward requiresItems={requiresItems} bookmarked={bookmarked} color={customColors.bookmarkColor}>
                {reward}
            </Reward>
            {missionHovered && <MissionTooltip mission={mission} />}
        </MissionBox>
    )
}

export default Mission
