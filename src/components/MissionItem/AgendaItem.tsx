import styled from 'styled-components'
import { useBookmarkContext } from '../../context/BookmarkContext'
import missionSetsData from '../../data/MissionItem/lookups/MissionSet.json'
import { useMissionsContext } from '../../context/MissionContext'
import { AssetFolder, MissionData, MissionState } from '../../types'
import { HintImage } from './Mission'
import { getMissionImage, useHover, useImage } from '../../hooks'
import ImageIcon from '../ImageIcon'
import Portal, { HintImagePortal } from '../../Portal'
const BookmarkContainer = styled.div`
    details {
        display: flex;
        align-items: center;
        justify-items: center;
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
    position: absolute;
    right: 30px;
`
export const Arrow = styled.i<{ toLeft: boolean }>`
    border: solid black;
    border-width: 0 2px 2px 0;
    display: inline-block;
    padding: 3px;
    transform: rotate(${({ toLeft }) => (toLeft ? 135 : -45)}deg);
`
const ArrowButton = styled.button`
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
`
const Details = styled.details<{ open: boolean; showingImage: boolean }>`
    &:hover {
        .missionName {
            text-decoration: ${({ showingImage }) => showingImage && 'underline'};
        }
    }
`
interface BookmarkProps {
    mission: MissionData
    showAll: boolean
}
const AgendaItem = ({ mission, showAll }: BookmarkProps) => {
    const { bookmarks, bookmarkNextMission, bookmarkPrevMission } = useBookmarkContext()
    const { missionDataState } = useMissionsContext()
    const { pk, mission_set, order, name, reward, objectives } = mission

    const { hover, hoverFunctions } = useHover()
    const image = useImage(AssetFolder.Missions, getMissionImage(mission))

    let onFirstMission = bookmarks[mission_set] === 1
    let missionReady = missionDataState.find((mds) => mds.pk === pk)!.state === MissionState.Ready

    /*position: ${({ show }) => !show && 'absolute'};
     opacity: ${({ show }) => (show ? 1 : 0)};
    visibility: ${({ show }) => (show ? 'visible' : 'hidden')};
    transition: opacity 100ms, visibility 100ms, position 100ms; */
    return (
        <BookmarkContainer>
            <Details open={showAll && missionReady} showingImage={hover && image}>
                <summary>
                    <BookmarkHead>
                        <Title ready={missionReady} {...hoverFunctions}>
                            <FirstSpan>
                                <b>{missionSetsData.find((s) => s.pk === mission_set)?.name}</b>
                                <MissionName className="missionName">
                                    {order} - {name}
                                </MissionName>
                                {!missionReady && ' (BLOCKED)'}
                                {image && <ImageIcon height={15} width={18} />}
                            </FirstSpan>
                            <span>
                                <b>{reward}</b> gm${' '}
                            </span>
                        </Title>
                        <BookmarkNav>
                            <ArrowButton disabled={onFirstMission} onClick={() => bookmarkPrevMission(mission_set)}>
                                <Arrow toLeft />
                            </ArrowButton>
                            <ArrowButton onClick={() => bookmarkNextMission(mission_set)}>
                                <Arrow toLeft={false} />
                            </ArrowButton>
                        </BookmarkNav>
                    </BookmarkHead>
                </summary>
                <span dangerouslySetInnerHTML={{ __html: objectives }} />
                {hover && image && (
                    <Portal portalId={HintImagePortal}>
                        <HintImage src={image} show={hover} {...hoverFunctions}></HintImage>
                    </Portal>
                )}
            </Details>
        </BookmarkContainer>
    )
}

export default AgendaItem
