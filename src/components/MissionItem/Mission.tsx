import missionItemData from '../../data/MissionItem/mappings/MissionItem.json'
import { MissionState, MissionItemData, MissionDataPlus } from '../../types'
import styled, { css } from 'styled-components'
import { useEffect, useState } from 'react'
import MissionItems from './MissionItems'
import { useSettingsContext } from '../../context/SettingsContext'
import { missionMap, simpleMissionItems } from '../../data/MissionItem/Data'
import { useItemHoverContext } from '../../context/ItemHover'
import { useBookmarkContext } from '../../context/BookmarkContext'

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
    ${(props) => props.bookmarked && 'color: red; font-weight: bold;'}
`

const TooltipAnchor = styled.div`
    position: relative;
    display: inline-block;
    min-width: 38px;
`

const Tooltip = styled.div<{ left: boolean }>`
    width: fit-content;
    background-color: lightyellow;
    color: black;
    text-align: left;
    border-radius: 6px;
    padding: 10px 10px 0 10px;

    /* Position the tooltip */
    position: absolute;
    z-index: 20;
    display: flex;
    flex-direction: row;
    left: -185px;
    /* ${({ left }) =>
        left
            ? css`
                  left: 15px;
              `
            : css`
                  right: 15px;
              `} */
`
const Info = styled.div`
    min-width: 400px;
`
const HintImage = styled.img`
    max-width: 500px;
    margin: 10px;
`

interface MissionProps {
    mission: MissionDataPlus
}

const Mission = ({ mission }: MissionProps) => {
    const [image, setImage] = useState<any>(null)
    const { map } = useSettingsContext()
    const { itemHovered } = useItemHoverContext()
    const [missionHovered, setMissionHovered] = useState<boolean>(false)
    const { bookmarks, toggleBookmark } = useBookmarkContext()
    const { pk, objectives, state, reward, order, name, mission_set } = mission
    const missionItems: MissionItemData[] = missionItemData.filter((mi) => mi.mission === pk)

    const bookmarked = bookmarks[mission_set] === order

    const requiresItems = missionItems.length > 0
    const containsHoveredItem = itemHovered !== null && simpleMissionItems[pk]?.includes(itemHovered)
    const flash = containsHoveredItem && !missionHovered && [MissionState.Locked, MissionState.PartlyLocked].includes(state)

    const inSelectedMap = map ? missionMap[map].includes(pk) : false

    useEffect(() => {
        async function loadData() {
            const data = await import(`../../assets/missions/${pk}.webp`)
            data && setImage(data.default)
        }

        loadData()
    }, [])

    return (
        <MissionBox
            onMouseEnter={() => setMissionHovered(true)}
            onMouseLeave={() => setMissionHovered(false)}
            onClick={() => toggleBookmark(mission, bookmarked)}
            flash={flash}
            containsBoughtItem={containsHoveredItem}
            inSelectedMap={inSelectedMap}
            state={state}
        >
            <Reward requiresItems={requiresItems} bookmarked={bookmarked}>
                {reward}
            </Reward>
            {missionHovered && (
                <TooltipAnchor>
                    <Tooltip left={true}>
                        <Info>
                            <span>
                                {order} - {name}
                            </span>
                            <div dangerouslySetInnerHTML={{ __html: objectives }}></div>
                            {requiresItems && <MissionItems missionItems={missionItems} />}
                        </Info>

                        {image && <HintImage src={image}></HintImage>}
                    </Tooltip>
                </TooltipAnchor>
            )}
        </MissionBox>
    )
}

export default Mission
