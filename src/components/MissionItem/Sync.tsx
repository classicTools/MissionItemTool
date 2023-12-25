import styled from 'styled-components'
import { useState } from 'react'
import { useBookmarkContext } from '../../context/BookmarkContext'
import { Anchor, Button, Tooltip } from '../genericElements'
import { useHover } from '../../hooks'

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
        width: 100%;
    }
`

const Tip = styled(Tooltip)`
    width: 200px;
    top: 32px;
    left: 10px;
    text-align: left;
`

const Sync = () => {
    const { hover: syncButtonHovered, hoverFunctions } = useHover()
    const [syncText, setSyncText] = useState('')
    const { syncBookmarks } = useBookmarkContext()

    const onSyncBookmarks = () => {
        syncBookmarks(syncText)
        setSyncText(syncText)
    }
    return (
        <SyncBox>
            <textarea value={syncText} onChange={({ target: { value } }) => setSyncText(value)} placeholder="Paste mission page here"></textarea>
            <Anchor>
                <Button onClick={onSyncBookmarks} {...hoverFunctions}>
                    Synchronise Bookmarks
                    {syncButtonHovered && (
                        <Tip>
                            Synchronise your mission progress! Go to your{' '}
                            <a href="https://www.thehunter.com/#missions" target="_blank">
                                Regular Missions Page
                            </a>{' '}
                            via launcher or browser, don't click anywhere, press ctrl+A followed by ctrl+C to select & copy everything on the page, then paste
                            it into the textbox, click the button and your mission bookmarks here will be synchronised. Purchased items will be synchronised
                            where possible. NOTE: Only works in English!
                        </Tip>
                    )}
                </Button>
            </Anchor>
            {/* <Loader /> */}
        </SyncBox>
    )
}

export default Sync
