import styled from 'styled-components'
import { useBookmarkContext } from '../../context/Bookmarks'
import missionsData from '../../data/MissionItem/Mission.json'
import missionSetsData from '../../data/MissionItem/MissionSet.json'
import { useState } from 'react'
import { useSettingsContext } from '../../context/Settings'
import AgendaToggle from './AgendaToggle'

const AgendaContainer = styled.div`
    background-color: lightyellow;
    position: absolute;
    top: 0;
    //left:500px;
    height: 100vh;
    width: 700px;
    padding: 20px 40px;
    z-index: 100;
`
const Bookmark = styled.div``
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

const Agenda = (props: any) => {
    const { bookmarks, setBookmarks, bookmarkNextMission, bookmarkPrevMission, showAgenda } = useBookmarkContext()
    const { map } = useSettingsContext()
    const [showAll, setShowAll] = useState(true)

    if (!showAgenda) return <AgendaToggle />

    if (!map)
        return (
            <>
                <AgendaContainer>
                    <div>Choose a map</div>
                </AgendaContainer>
                <AgendaToggle />
            </>
        )
    const bookmarkedMissions = missionsData.filter((mi) => mi.mission_set in bookmarks && mi.order === bookmarks[mi.mission_set])
    return (
        <>
            <AgendaToggle />
            <AgendaContainer>
                <div id="currentlyEarnable">
                    Total earnable from bookmarks for chosen reserve: <span id="bookmarkGlanceTotal"></span>
                    gm$
                    <button onClick={() => setShowAll(!showAll)}>{showAll ? 'Collapse All' : 'Expand All'}</button>
                </div>

                {bookmarkedMissions.map((m, index) => {
                    let setLength = missionsData.filter((md) => md.mission_set === m.mission_set).length
                    let onFirstMission = bookmarks[m.mission_set] === 1
                    let onLastMission = bookmarks[m.mission_set] === setLength
                    return (
                        <Bookmark>
                            <details open={showAll}>
                                <summary>
                                    <BookmarkHead>
                                        <span>
                                            <b>{missionSetsData.find((s) => s.pk === m.mission_set)?.name}</b> - {m.order} - {m.name} - <b>{m.reward}</b> gm$
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
        </>
    )
}

export default Agenda
