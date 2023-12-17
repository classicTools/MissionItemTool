import styled from 'styled-components'
import { useBookmarkContext } from '../../context/BookmarkContext'
import missionsData from '../../data/MissionItem/lookups/Mission.json'
import missionSetsData from '../../data/MissionItem/lookups/MissionSet.json'
import { useRef, useState } from 'react'
import { useSettingsContext } from '../../context/SettingsContext'
import AgendaToggle from './AgendaToggle'
import { useMissionsContext } from '../../context/MissionContext'
import { MissionState } from '../../types'
import { Transition, TransitionStatus } from 'react-transition-group'
import { missionMap, missionSetMap } from '../../data/MissionItem/Data'

const AgendaContainer = styled.div`
    background-color: lightyellow;
    position: absolute;
    top: 0;
    //left:500px;
    height: 110vh;
    width: 700px;
    padding: 20px 40px;
    z-index: 100;
    overflow-y: auto;
`
const Bookmark = styled.div<{ ready: boolean }>`
    text-decoration: ${({ ready }) => (ready ? 'none' : 'line-through')};
    summary {
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
interface AgendaProps {}

const defaultStyle = {
    transition: `opacity ${200}ms ease-in-out`,
    opacity: 0,
}

const transitionStyles = {
    entering: { opacity: 1 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0 },
}

const Agenda = (props: any) => {
    const { bookmarks, bookmarkNextMission, bookmarkPrevMission, showAgenda } = useBookmarkContext()
    const { map } = useSettingsContext()
    const [showAll, setShowAll] = useState(true)
    const { missionDataState } = useMissionsContext()
    const nodeRef = useRef(null)

    // if (!showAgenda) return <AgendaToggle />

    if (!map)
        return (
            <>
                <AgendaContainer>
                    <div>Choose a map</div>
                </AgendaContainer>
                <AgendaToggle />
            </>
        )

    let missionsFilteredByMap = missionMap[map]
    let missionSetsFilteredByMap = missionSetMap[map]
    const bookmarkedMissions = missionsData.filter(
        (mi) =>
            mi.mission_set in bookmarks &&
            mi.order === bookmarks[mi.mission_set] &&
            (missionsFilteredByMap.includes(mi.pk) || missionSetsFilteredByMap.includes(mi.mission_set))
    )
    return (
        <>
            <AgendaToggle />
            <Transition nodeRef={nodeRef} in={showAgenda} timeout={200} unmountOnExit={true}>
                {(state) => (
                    <AgendaContainer
                        ref={nodeRef}
                        style={{
                            ...defaultStyle,
                            //@ts-ignore
                            ...transitionStyles[state],
                        }}
                    >
                        <div id="currentlyEarnable">
                            Total earnable from bookmarks for chosen reserve: <span id="bookmarkGlanceTotal"></span>
                            gm$
                            <button onClick={() => setShowAll(!showAll)}>{showAll ? 'Collapse All' : 'Expand All'}</button>
                        </div>

                        {bookmarkedMissions.map((m, index) => {
                            let setLength = missionsData.filter((md) => md.mission_set === m.mission_set).length
                            let onFirstMission = bookmarks[m.mission_set] === 1
                            let onLastMission = bookmarks[m.mission_set] === setLength
                            let state = missionDataState.find((mds) => mds.pk === m.pk)!.state
                            let missionReady = state === MissionState.Ready
                            return (
                                <Bookmark ready={missionReady}>
                                    <details open={showAll && missionReady}>
                                        <summary>
                                            <BookmarkHead>
                                                <span>
                                                    <b>{missionSetsData.find((s) => s.pk === m.mission_set)?.name}</b> - {m.order} - {m.name} -{' '}
                                                    <b>{m.reward}</b> gm$ {missionReady ? '' : '(BLOCKED)'}
                                                </span>
                                                <BookmarkNav>
                                                    <ArrowButton disabled={onFirstMission} onClick={() => bookmarkPrevMission(m.mission_set)}>
                                                        <Arrow back />
                                                    </ArrowButton>
                                                    <ArrowButton disabled={onLastMission} onClick={() => bookmarkNextMission(m.mission_set)}>
                                                        <Arrow back={false} />
                                                    </ArrowButton>
                                                </BookmarkNav>
                                            </BookmarkHead>
                                        </summary>
                                        <span dangerouslySetInnerHTML={{ __html: m.objectives }} />
                                    </details>
                                </Bookmark>
                            )
                        })}
                    </AgendaContainer>
                )}
            </Transition>
        </>
    )
}

export default Agenda
