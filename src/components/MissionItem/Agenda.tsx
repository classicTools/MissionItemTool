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
import mapsData from '../../data/MissionItem/lookups/Map.json'

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
const Header = styled.div`
    display: flex;
    justify-content: space-between;
    height: 50px;
    align-items: center;
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
                                <Header>
                                    <h2>{mapsData.find((m) => m.pk === map)?.name}</h2>
                                    <button onClick={() => setShowAll(!showAll)}>{showAll ? 'Collapse All' : 'Expand All'}</button>
                                </Header>

                                {bookmarkedMissions.map((m: MissionData) => {
                                    return <AgendaItem mission={m} showAll={showAll} />
                                })}
                            </>
                        ) : (
                            <div>Please choose a reserve to see its agenda</div>
                        )}
                    </AgendaContainer>
                )}
            </Transition>
        </>
    )
}

export default Agenda
