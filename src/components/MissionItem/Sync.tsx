import styled from 'styled-components'
import { useState } from 'react'
import { useBookmarkContext } from '../../context/BookmarkContext'
import { Anchor, Tooltip } from '../genericElements'

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
        width: 100%;
    }
`

const Tip = styled(Tooltip)`
    width: 200px;
`

const Sync = () => {
    const [hovered, setHovered] = useState(false)
    const [syncText, setSyncText] = useState('')
    const { syncBookmarks } = useBookmarkContext()

    const onSyncBookmarks = () => {
        let cutDownText = syncBookmarks(syncText)
        setSyncText(cutDownText)
    }
    return (
        <SyncBox>
            <a href="https://www.thehunter.com/#missions" target="_blank">
                Regular Missions Page
            </a>

            <textarea value={syncText} onChange={({ target: { value } }) => setSyncText(value)} placeholder="Paste mission page here"></textarea>
            <Anchor>
                <button onClick={onSyncBookmarks} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
                    Synchronise Bookmarks
                </button>
                {hovered && (
                    <Tip>
                        Synchronise your mission progress! Go to your Regular Missions Page via launcher or browser, don't click anywhere, press ctrl+A followed
                        by ctrl+C to select & copy everything on the page, then paste it into the textbox, click the button and your mission bookmarks here will
                        be synchronised. Purchased items will be synchronised where possible. NOTE: Only works in English!
                    </Tip>
                )}
            </Anchor>
            {/* <Loader /> */}
        </SyncBox>
    )
}

export default Sync