import missionItemData from '../../data/MissionItem/mappings/MissionItem.json'
import { MissionState, MissionItemData, MissionDataPlus, AssetFolder } from '../../types'
import styled, { css } from 'styled-components'
import MissionItems from './MissionItems'
import { CustomColors, useSettingsContext } from '../../context/SettingsContext'
import { missionMap, simpleMissionItems } from '../../data/MissionItem/Data'

import { useItemHoverContext } from '../../context/ItemHover'
import { useBookmarkContext } from '../../context/BookmarkContext'
import { getMissionImage, useHover, useImage } from '../../hooks'
import { Anchor, Tooltip } from '../genericElements'
import { pointerCss } from '../../CommonStyles'

const flashMission = css`
    /* @keyframes flashMission {
        0%,
        50%,
        100% {
            opacity: 1;
        }
        25%,
        75% {
            opacity: 0;
        }
    } */
    animation: flash 3s linear 0s infinite;
    color: black;
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

    background-color: ${({ containsBoughtItem, state, customColors }) => {
        let c
        if (containsBoughtItem) c = 'orange'

        if (state === MissionState.Ready) c = customColors.ready // 'lightgreen'
        else if (state === MissionState.Blocked) c = customColors.blocked //'green'
        else if (state === MissionState.PartlyLocked) c = customColors.partlyLocked //'yellow'
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
    ${(props) => props.bookmarked && 'color: red; font-weight: bold;'}
`

const Tip = styled(Tooltip)<{ left: boolean }>`
    width: fit-content;
    text-align: left;
    border: solid 2px black;
    padding-bottom: 0;

    /* Position the tooltip */
    display: flex;
    flex-direction: row;
    left: -185px;
    ${({ left }) =>
        left
            ? css`
                  left: -185px;
              `
            : css`
                  left: -415px;
              `}
`
const Info = styled.div`
    min-width: 400px;
`
export const HintImage = styled.img<{ show: boolean }>`
    max-width: 95vw;
    max-height: 95vh;
    margin: auto;
    padding: 10px;
    border-radius: 25px;

    opacity: ${({ show }) => (show ? 1 : 0)};
    visibility: ${({ show }) => (show ? 'visible' : 'hidden')};
    transition: all 0.5s ease;
`
const MissionHintImage = styled(HintImage)`
    max-width: 500px;
    max-height: 750px;
`

interface MissionProps {
    mission: MissionDataPlus
}

const Mission = ({ mission }: MissionProps) => {
    const { map, customColors } = useSettingsContext()
    const { itemHovered } = useItemHoverContext()
    const { hover: missionHovered, hoverFunctions } = useHover()
    const { bookmarks, toggleBookmark } = useBookmarkContext()
    const { pk, objectives, state, reward, order, name, mission_set } = mission
    const image = useImage(AssetFolder.Missions, getMissionImage(mission))
    const missionItems: MissionItemData[] = missionItemData.filter((mi) => mi.mission === pk)

    const bookmarked = bookmarks[mission_set] === order

    const requiresItems = missionItems.length > 0
    const containsHoveredItem = itemHovered !== null && simpleMissionItems[pk]?.includes(itemHovered)
    const flash = containsHoveredItem && !missionHovered && [MissionState.Locked, MissionState.PartlyLocked].includes(state)

    const inSelectedMap = map ? missionMap[map].includes(pk) : false

    return (
        <MissionBox
            {...hoverFunctions}
            onClick={() => toggleBookmark(mission, bookmarked)}
            flash={flash}
            containsBoughtItem={containsHoveredItem}
            // flash={false}
            // containsBoughtItem={false}
            inSelectedMap={inSelectedMap}
            state={state}
            customColors={customColors}
        >
            <Reward requiresItems={requiresItems} bookmarked={bookmarked}>
                {reward}
            </Reward>
            {missionHovered && (
                <Anchor>
                    <Tip left={order < 6}>
                        <Info>
                            <span>
                                {order} - {name}
                            </span>
                            <div dangerouslySetInnerHTML={{ __html: objectives }}></div>
                            {requiresItems && <MissionItems missionItems={missionItems} />}
                        </Info>

                        {image && <MissionHintImage src={image} show></MissionHintImage>}
                    </Tip>
                </Anchor>
            )}
        </MissionBox>
    )
}

export default Mission
