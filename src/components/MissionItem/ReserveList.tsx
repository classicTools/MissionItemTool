import styled from 'styled-components'
import Maps from '../../data/MissionItem/lookups/Map.json'
import sortBy from 'sort-by'
import { useSettingsContext } from '../../context/SettingsContext'
import { useItemHoverContext } from '../../context/ItemHover'
import MissionKey from './MissionKey'
import { RelativeDiv } from './MissionKeyItem'
import { useState } from 'react'
import { useBookmarkContext } from '../../context/BookmarkContext'

const ReserveDiv = styled.div`
    position: absolute;
    bottom: 1000px;
    left: 800px;
    width: 200px;
    user-select: none;
`
const ReserveOption = styled.div`
    cursor: pointer;
    input,
    label {
        cursor: inherit;
    }
`

const SyncBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: enter;
    width: 95%;
    margin: 10px 0;
    textarea {
        border: 2px solid grey;
        box-shadow: none;
        border-radius: 8px;
    }
    button {
        //padding:0 40px;
    }
`

const Tooltip = styled.div`
    position: absolute;
    background-color: lightyellow;
    border-radius: 8px;
    font-size: 13px;
    padding: 10px;

    width: 200px;
`

const ReserveList = () => {
    const { map, setMap } = useSettingsContext()
    const { setItemHovered } = useItemHoverContext()
    const [hovered, setHovered] = useState(false)

    const [syncText, setSyncText] = useState('')
    const { syncBookmarks } = useBookmarkContext()

    const onSyncBookmarks = () => {
        let cutDownText = syncBookmarks(syncText)
        setSyncText(cutDownText)
    }
    return (
        <RelativeDiv>
            <ReserveDiv onMouseEnter={() => setItemHovered(null)}>
                <SyncBox>
                    <a href="https://www.thehunter.com/#missions" target="_blank">
                        Regular Missions Page
                    </a>

                    <textarea value={syncText} onChange={({ target: { value } }) => setSyncText(value)} placeholder="Paste mission page here"></textarea>
                    <RelativeDiv>
                        <button onClick={onSyncBookmarks} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
                            Synchronise Bookmarks
                        </button>
                        {hovered && (
                            <Tooltip>
                                Synchronise your mission progress! Go to your Regular Missions Page via launcher or browser, don't click anywhere, press ctrl+A
                                followed by ctrl+C to select & copy everything on the page, then paste it into the textbox, click the button and your mission
                                bookmarks here will be synchronised. Purchased items will be synchronised where possible. NOTE: Only works in English!
                            </Tooltip>
                        )}
                    </RelativeDiv>
                    {/* <Loader /> */}
                </SyncBox>
                Highlight packs & missions by reserve:
                <br />
                {Maps.sort(sortBy('order')).map((m) => {
                    let id = 'map' + m.pk
                    return (
                        <ReserveOption key={m.pk}>
                            <input type="radio" id={id} onClick={() => setMap(m.pk)} name="map" checked={map === m.pk} />
                            <label htmlFor={id}>{m.name}</label>
                        </ReserveOption>
                    )
                })}
                <ReserveOption key={null}>
                    <input type="radio" id="map0" onClick={() => setMap(null)} name="map" />
                    <label htmlFor="map0">None</label>
                </ReserveOption>
                <br />
                If a highlighted mission pack has no outlined missions, all missions can be done in the chosen reserve.
                <br />
                <br />
                <MissionKey />
            </ReserveDiv>
        </RelativeDiv>
    )
}

export default ReserveList
