import styled from 'styled-components'
import { useBookmarkContext } from '../../context/BookmarkContext'
import missionsData from '../../data/MissionItem/lookups/Mission.json'
import { useState } from 'react'
import { useSettingsContext } from '../../context/SettingsContext'
import AgendaToggle from './AgendaToggle'
import { Bookmarks, MapId, MissionData } from '../../types'
import { missionMap, missionSetMap, missionSetMissions, missionSetObject } from '../../data/MissionItem/Data'
import AgendaItem, { Arrow } from './AgendaItem'
import mapsData from '../../data/MissionItem/lookups/Map.json'
import sortBy from 'sort-by'

const AgendaContainer = styled.div<{ show: boolean }>`
    background-color: lightyellow;
    position: fixed;
    top: 0;
    height: 100vh;

    left: 350px;
    width: 800px;

    @media (max-width: 1250px) {
        left: 0;
        width: 92vw;
    }

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
const Spacer = styled.div`
    height: 50px;
`
const Please = styled.div`
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    gap: 5px;
`
interface AgendaMissionData extends MissionData {
    set_name: string
    set_order: number
}

const getBookmarkedMissionsByMap =
    (map: MapId | null, bookmarks: Bookmarks) =>
    ({ mission_set, order, pk }: MissionData) => {
        let missionsByMap = map ? missionMap[map] : []
        let setsByMap = map ? missionSetMap[map] : []

        return (
            mission_set in bookmarks &&
            order === bookmarks[mission_set] &&
            (missionsByMap.includes(pk) || (setsByMap.includes(mission_set) && !missionSetMissions[mission_set].some((msm) => missionsByMap.includes(msm))))
        )
    }
const Agenda = () => {
    const { bookmarks, showAgenda } = useBookmarkContext()
    const { map, alphaOrder } = useSettingsContext()
    const [showAll, setShowAll] = useState(true)

    const agendaMissions: AgendaMissionData[] = missionsData
        .filter(getBookmarkedMissionsByMap(map, bookmarks))
        .map((m) => ({
            ...m,
            set_name: missionSetObject[m.mission_set].name,
            set_order: missionSetObject[m.mission_set].order,
        }))
        .sort(sortBy(alphaOrder ? 'set_name' : 'set_order'))

    return (
        <>
            <AgendaToggle />
            <AgendaContainer show={showAgenda}>
                {map && agendaMissions.length > 0 ? (
                    <>
                        <Header>
                            <h2>{mapsData.find((m) => m.pk === map)?.name}</h2>
                            <button onClick={() => setShowAll(!showAll)}>{showAll ? 'Collapse All' : 'Expand All'}</button>
                        </Header>

                        {agendaMissions.map((m: MissionData) => (
                            <AgendaItem mission={m} showAll={showAll} key={m.pk} />
                        ))}
                        <Spacer />
                    </>
                ) : (
                    <Please>
                        <span>Please bookmark some missions & choose a reserve to see its agenda </span>
                        <Arrow toLeft={false} />
                        <Arrow toLeft={false} />
                        <Arrow toLeft={false} />{' '}
                    </Please>
                )}
            </AgendaContainer>
        </>
    )
}

export default Agenda
