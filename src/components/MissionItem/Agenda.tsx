import styled from 'styled-components'
import { useBookmarkContext } from '../../context/BookmarkContext'
import missionsData from '../../data/MissionItem/lookups/Mission.json'
import { useState } from 'react'
import { useSettingsContext } from '../../context/SettingsContext'
import AgendaToggle from './AgendaToggle'
import { MissionData } from '../../types'
import { missionMap, missionSetMap } from '../../data/MissionItem/Data'
import AgendaItem from './AgendaItem'
import mapsData from '../../data/MissionItem/lookups/Map.json'

const AgendaContainer = styled.div<{ show: boolean }>`
    background-color: lightyellow;
    position: fixed;
    top: 0;
    height: 100vh;

    left: 350px;
    width: 800px;

    padding: 0 40px;
    z-index: 20;
    overflow-y: auto;
    opacity: ${({ show }) => (show ? 1 : 0)};
    visibility: ${({ show }) => (show ? 'visible' : 'hidden')};
    transition: opacity 200ms, visibility 200ms;
`

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    height: 50px;
    align-items: center;
`

const Agenda = () => {
    const { bookmarks, showAgenda } = useBookmarkContext()
    const { map } = useSettingsContext()
    const [showAll, setShowAll] = useState(true)

    let missionsByMap = map ? missionMap[map] : []
    let missionSetsByMap = map ? missionSetMap[map] : []
    const bookmarkedMissions: MissionData[] = missionsData.filter(
        ({ mission_set, order, pk }) =>
            mission_set in bookmarks && order === bookmarks[mission_set] && (missionsByMap.includes(pk) || missionSetsByMap.includes(mission_set))
    )

    return (
        <>
            <AgendaToggle />
            <AgendaContainer show={showAgenda}>
                {map ? (
                    <>
                        <Header>
                            <h2>{mapsData.find((m) => m.pk === map)?.name}</h2>
                            <button onClick={() => setShowAll(!showAll)}>{showAll ? 'Collapse All' : 'Expand All'}</button>
                        </Header>

                        {bookmarkedMissions.map((m: MissionData) => {
                            return <AgendaItem mission={m} showAll={showAll} key={m.pk} />
                        })}
                    </>
                ) : (
                    <div>Please choose a reserve to see its agenda</div>
                )}
            </AgendaContainer>
        </>
    )
}

export default Agenda
