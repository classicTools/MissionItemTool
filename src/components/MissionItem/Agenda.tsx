import styled from 'styled-components'
import { useBookmarkContext } from '../../context/BookmarkContext'
import missionsData from '../../data/MissionItem/lookups/Mission.json'
import { useRef, useState } from 'react'
import { useSettingsContext } from '../../context/SettingsContext'
import AgendaToggle from './AgendaToggle'
import { MissionData, MissionState } from '../../types'
import { Transition, TransitionStatus } from 'react-transition-group'
import { missionMap, missionSetMap } from '../../data/MissionItem/Data'
import AgendaItem from './AgendaItem'

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

const Agenda = () => {
    const { bookmarks, showAgenda } = useBookmarkContext()
    const { map } = useSettingsContext()
    const [showAll, setShowAll] = useState(true)
    const nodeRef = useRef(null)

    let missionsByMap = map ? missionMap[map] : []
    let missionSetsByMap = map ? missionSetMap[map] : []
    const bookmarkedMissions: MissionData[] = missionsData.filter(
        ({ mission_set, order, pk }) =>
            mission_set in bookmarks && order === bookmarks[mission_set] && (missionsByMap.includes(pk) || missionSetsByMap.includes(mission_set))
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
                        {map ? (
                            <>
                                <div id="currentlyEarnable">
                                    Total earnable from bookmarks for chosen reserve: <span id="bookmarkGlanceTotal"></span>
                                    gm$
                                    <button onClick={() => setShowAll(!showAll)}>{showAll ? 'Collapse All' : 'Expand All'}</button>
                                </div>

                                {bookmarkedMissions.map((m: MissionData) => {
                                    return <AgendaItem mission={m} showAll={showAll} />
                                })}
                            </>
                        ) : (
                            <div>Choose a map</div>
                        )}
                    </AgendaContainer>
                )}
            </Transition>
        </>
    )
}

export default Agenda
