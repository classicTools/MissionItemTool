import { createContext, useContext, useState, PropsWithChildren } from 'react'
import { MissionDataPlus, LocalStorageVars, bareFn, Bookmarks } from '../types'
import { useLocalStorage } from '../hooks'
import missionSetsData from '../data/MissionItem/lookups/MissionSet.json'
import { missionSetMissions } from '../data/MissionItem/Data'
import { useItemsContext } from './ItemContext'

interface BookmarkContext {
    bookmarks: Bookmarks
    toggleBookmark: (mission: MissionDataPlus, alreadyBookmarked: boolean) => void
    showAgenda: boolean
    toggleAgenda: () => void
    bookmarkNextMission: (missionSetId: number) => void
    bookmarkPrevMission: (missionSetId: number) => void
    syncBookmarks: (value: string) => string
    resetBookmarks: () => void
}

const defaultBookmark = {
    bookmarks: [],
    toggleBookmark: bareFn,
    showAgenda: false,
    toggleAgenda: bareFn,
    bookmarkNextMission: bareFn,
    bookmarkPrevMission: bareFn,
    syncBookmarks: () => '',
    resetBookmarks: bareFn,
}
const BookmarkContext = createContext<BookmarkContext>(defaultBookmark)

const getMissionNumbers = (text: string) => {
    let start = text.indexOf(':')
    let slash = text.indexOf('/')
    let numString = text.slice(start).replace(':', '').replace('/', '')
    let missionNumber = parseInt(numString)
    let totalMissions = parseInt(text.slice(slash + 1))
    if (isNaN(missionNumber) || isNaN(totalMissions)) {
        throw new Error('Mission number or total missions is NaN')
    }
    return { missionNumber, totalMissions }
}

type NameEW = 'Duck' | 'Whitehart Travel' | 'The Boone And Crockett Club'
type NameHere = 'All Ducks' | 'Whitehart' | 'B&C Club'
type MissionNameExceptions = { [K in NameHere]: NameEW }
const missionSetExceptions: MissionNameExceptions =
    // mission name in my database vs on Regular Missions Page
    { 'All Ducks': 'Duck', Whitehart: 'Whitehart Travel', 'B&C Club': 'The Boone And Crockett Club' }

const missionTextStart = 'Mission Packs'
const missionTextEnd = 'DEVELOPED BY'

const getBookmarkFromText = (pk: number, missionSetName: string, text: string) => {
    let start = text.includes(missionSetName) ? text.indexOf(missionSetName) : text.indexOf(missionSetExceptions[missionSetName as NameHere])
    if (start === -1) {
        throw new Error(`Mission pack not found in mission text: {pk: ${pk}, name: ${missionSetName}}`)
    }

    let setEnd = text.indexOf('\n', start)
    let bookmarks: Bookmarks = {}

    let { missionNumber, totalMissions } = getMissionNumbers(text.slice(start, setEnd))
    if (missionNumber < totalMissions) {
        bookmarks[pk] = missionNumber + 1
    } else if (missionNumber > totalMissions) {
        throw new Error('Mission number is greater than total missions')
    } else {
        delete bookmarks[pk]
    }

    //bookmarks[pk] = 1 //use this to test which mission packs don't match

    return bookmarks
}

const WithBookmarkContext = ({ children }: PropsWithChildren) => {
    const [bookmarks, setBookmarks] = useLocalStorage<Bookmarks>(LocalStorageVars.Bookmarks, {})
    const [showAgenda, setShowAgenda] = useState(false)
    const { syncItems } = useItemsContext()

    const toggleBookmark = ({ mission_set: ms, order }: MissionDataPlus, alreadyBookmarked: boolean) => {
        let current = { ...bookmarks }
        if (alreadyBookmarked) {
            delete current[ms]
        } else {
            current[ms] = order
        }
        setBookmarks(current)
    }
    const toggleAgenda = () => setShowAgenda(!showAgenda)

    const bookmarkNextMission = (missionSetId: number) => {
        const currentMission = bookmarks[missionSetId]!
        let newBookmarks = { ...bookmarks }
        let onLastMission = currentMission === missionSetMissions[missionSetId].length
        if (onLastMission) {
            delete newBookmarks[missionSetId] // "complete" the mission set
        } else {
            newBookmarks[missionSetId] = currentMission + 1
        }
        setBookmarks(newBookmarks)
    }

    const bookmarkPrevMission = (missionSetId: number) => {
        const currentMission = bookmarks[missionSetId]!
        setBookmarks({ ...bookmarks, [missionSetId]: currentMission - 1 })
    }

    const syncBookmarks = (text: string) => {
        let start = text.indexOf(missionTextStart)
        let end = text.indexOf(missionTextEnd)
        let missionText = text.slice(start, end).replaceAll(' (Single Player)\n', '').replaceAll(' Missions\n', '').replaceAll('Progress:', ':')
        if (start !== -1 && missionText.length > 20) {
            let newBookmarks = missionSetsData.reduce((acc: Bookmarks, { pk, name }) => ({ ...acc, ...getBookmarkFromText(pk, name, missionText) }), {})
            setBookmarks(newBookmarks)
            syncItems(newBookmarks)
        }
        return missionText
    }
    const resetBookmarks = () => {
        if (Object.keys(bookmarks).length === 0) {
            setBookmarks(missionSetsData.reduce((acc: Bookmarks, { pk }) => ({ ...acc, [pk]: 1 }), {}))
        } else {
            setBookmarks({})
        }
    }

    return (
        <BookmarkContext.Provider
            value={{
                bookmarks,
                toggleBookmark,
                showAgenda,
                toggleAgenda,
                bookmarkNextMission,
                bookmarkPrevMission,
                syncBookmarks,
                resetBookmarks,
            }}
        >
            {children}
        </BookmarkContext.Provider>
    )
}
export default WithBookmarkContext
export const useBookmarkContext = () => useContext(BookmarkContext)
