import styled, { ThemeContext } from 'styled-components'
import { useBookmarkContext } from '../../context/BookmarkContext'
import missionSetsData from '../../data/MissionItem/lookups/MissionSet.json'
import { useMissionsContext } from '../../context/MissionContext'
import { AssetFolder, MissionState } from '../../types'
import { getMissionImage, useHover, useImage } from '../../hooks'
import ImageIcon from '../ImageIcon'
import Portal, { HintImagePortal } from '../../Portal'
import { Anchor, Button, Tooltip } from '../genericElements'
import { useContext } from 'react'

import { AgendaMissionData } from './Agenda'
import MissionInfo, { HintImage } from './MissionInfo'

const noSelect = `    
-webkit-touch-callout: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    ::selection {
        background: transparent;
        color: inherit;
    }
    ::-moz-selection {
        background: transparent;
        color: inherit;
    }

    img, svg {
        -webkit-user-drag: none;
        user-drag: none;
    }`

const BookmarkContainer = styled.div`
    details {
        display: block;
        width: 100%;
    }
    summary {
        cursor: pointer;
    }
`
const BookmarkHead = styled.div`
    display: inline;
    line-height: 30px;
`
const Title = styled.span<{ ready: boolean }>`
    display: inline-flex;
    width: calc(100% - 155px);
    justify-content: space-between;
    text-decoration: ${({ ready }) => (ready ? 'none' : 'line-through')};
`

const BookmarkNav = styled.span`
    right: 30px;
`
export const Arrow = styled.i<{ toLeft: boolean }>`
    border: solid ${({ theme }) => theme.fontColor};
    border-width: 0 2px 2px 0;
    display: inline-block;
    padding: 3px;
    transform: rotate(${({ toLeft }) => (toLeft ? 135 : -45)}deg);
`
const ArrowButton = styled(Button)`
    height: 25px;
    width: 70px;
    border-radius: 7px;
    padding: 2px 10px 2px 10px;
    font-size: 11px;
`
const FirstSpan = styled.span`
    display: flex;
    align-items: center;
`
const MissionName = styled.span`
    margin: 0 5px;
    ${noSelect}
`
const Details = styled.details<{ open: boolean; showingImage: boolean }>`
    &:hover {
        .missionName {
            text-decoration: ${({ showingImage }) => showingImage && 'underline'};
        }
    }
`
const Reward = styled.span`
    position: relative;
    right: 10px;
`
const Summary = styled.summary``
const Objectives = styled.div``
const SetName = styled.b`
    ${noSelect}
`
const Tip = styled(Tooltip)`
    text-align: left;
    top: -2px;
    right: 0px;
    line-height: 16px;
`

interface BookmarkProps {
    mission: AgendaMissionData
    showAll: boolean
}
const AgendaItem = ({ mission, showAll }: BookmarkProps) => {
    const { bookmarks, bookmarkNextMission, bookmarkPrevMission } = useBookmarkContext()
    const { missionDataState } = useMissionsContext()
    const { hover: hoverTitle, hoverFunctions: hoverFunctionsTitle } = useHover()
    const { hover: peekNextMission, hoverFunctions: peekNextMissonFns } = useHover()
    const { pk, mission_set, order, name, reward, objectives, next_mission } = mission

    const image = useImage(AssetFolder.Missions, getMissionImage(mission))

    let onFirstMission = bookmarks[mission_set] === 1
    let missionReady = missionDataState.find((mds) => mds.pk === pk)!.state === MissionState.Ready

    let theme = useContext(ThemeContext)
    return (
        <BookmarkContainer>
            <Details open={showAll && missionReady} showingImage={hoverTitle && image}>
                <Summary>
                    <BookmarkHead>
                        <Title ready={missionReady} {...hoverFunctionsTitle}>
                            <FirstSpan>
                                <SetName>{missionSetsData.find((s) => s.pk === mission_set)?.name}</SetName>
                                <MissionName className="missionName">
                                    {order} - {name}
                                </MissionName>
                                {!missionReady && ' (BLOCKED)'}
                                {image && <ImageIcon height={15} width={18} fill={theme.fontColor} />}
                            </FirstSpan>
                            <Reward>
                                <b>{reward}</b> gm${' '}
                            </Reward>
                        </Title>
                        <BookmarkNav>
                            <ArrowButton disabled={onFirstMission} onClick={() => bookmarkPrevMission(mission_set)}>
                                <Arrow toLeft />
                            </ArrowButton>
                            <ArrowButton onClick={() => bookmarkNextMission(mission_set)} {...peekNextMissonFns}>
                                <Arrow toLeft={false} />
                            </ArrowButton>
                            {peekNextMission && next_mission && (
                                <Anchor>
                                    <Tip {...peekNextMissonFns}>
                                        <MissionInfo mission={next_mission} />
                                    </Tip>
                                </Anchor>
                            )}
                        </BookmarkNav>
                    </BookmarkHead>
                </Summary>
                <Objectives dangerouslySetInnerHTML={{ __html: objectives }} />
                {hoverTitle && image && (
                    <Portal portalId={HintImagePortal}>
                        <HintImage src={image} show={hoverTitle} {...hoverFunctionsTitle}></HintImage>
                    </Portal>
                )}
            </Details>
        </BookmarkContainer>
    )
}

export default AgendaItem
