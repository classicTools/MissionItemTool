import styled from 'styled-components'
import { useBookmarkContext } from '../../context/BookmarkContext'
import missionSetsData from '../../data/MissionItem/lookups/MissionSet.json'
import { useMissionsContext } from '../../context/MissionContext'
import { MissionData, MissionState } from '../../types'
import { useEffect, useState } from 'react'
import { HintImage } from './Mission'
import { useImage } from '../../hooks'

const BookmarkContainer = styled.div<{ ready: boolean }>`
    summary {
        text-decoration: ${({ ready }) => (ready ? 'none' : 'line-through')};
        cursor: pointer;
    }
`
const BookmarkHead = styled.div`
    display: inline;
    line-height: 30px;
`
const BookmarkNav = styled.span`
    position: absolute;
    right: 30px;
`
const Arrow = styled.i<{ back: boolean }>`
    border: solid black;
    border-width: 0 2px 2px 0;
    display: inline-block;
    padding: 3px;
    transform: rotate(${({ back }) => (back ? 135 : -45)}deg);
`
const ArrowButton = styled.button`
    height: 25px;
    width: 70px;
    border-radius: 7px;
    padding: 2px 10px 2px 10px;
    font-size: 11px;
`
interface BookmarkProps {
    mission: MissionData
    showAll: boolean
}
const AgendaItem = ({ mission, showAll }: BookmarkProps) => {
    const { bookmarks, bookmarkNextMission, bookmarkPrevMission } = useBookmarkContext()
    const { missionDataState } = useMissionsContext()
    const { pk, mission_set, order, name, reward, objectives } = mission

    const image = useImage(pk)

    let onFirstMission = bookmarks[mission_set] === 1
    let missionReady = missionDataState.find((mds) => mds.pk === pk)!.state === MissionState.Ready

    return (
        <BookmarkContainer ready={missionReady}>
            <details open={showAll && missionReady}>
                <summary>
                    <BookmarkHead>
                        <span>
                            <b>{missionSetsData.find((s) => s.pk === mission_set)?.name}</b> - {order} - {name} - <b>{reward}</b> gm${' '}
                            {missionReady ? '' : '(BLOCKED)'}
                        </span>
                        <BookmarkNav>
                            <ArrowButton disabled={onFirstMission} onClick={() => bookmarkPrevMission(mission_set)}>
                                <Arrow back />
                            </ArrowButton>
                            <ArrowButton onClick={() => bookmarkNextMission(mission_set)}>
                                <Arrow back={false} />
                            </ArrowButton>
                        </BookmarkNav>
                    </BookmarkHead>
                </summary>
                <span dangerouslySetInnerHTML={{ __html: objectives }} />

                {image && <HintImage src={image}></HintImage>}
            </details>
        </BookmarkContainer>
    )
}

export default AgendaItem
