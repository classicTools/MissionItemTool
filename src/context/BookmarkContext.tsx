import { createContext, useContext, useState, PropsWithChildren, SetStateAction, Dispatch, useEffect } from 'react'
import { MissionDataPlus, LocalStorageVars, MissionSetId, bareFn, MissionOrder } from '../types'
import { useLocalStorage } from '../hooks'
import missionSetsData from '../data/MissionItem/lookups/MissionSet.json'
type Bookmarks = { [index: MissionSetId]: MissionOrder | null }
interface BookmarkContext {
    bookmarks: Bookmarks
    toggleBookmark: (mission: MissionDataPlus) => void
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

const getBookmarkFromText = (pk: number, name: string, missionText: string) => {
    let start = missionText.includes(name) ? missionText.indexOf(name) : missionText.indexOf(missionSetExceptions[name as NameHere])
    if (start == -1) {
        throw new Error('Mission pack not found in mission text')
    }

    let setEnd = missionText.indexOf('\n', start)
    let bookmarks: Bookmarks = {}

    let { missionNumber, totalMissions } = getMissionNumbers(missionText.slice(start, setEnd))
    if (missionNumber < totalMissions) {
        bookmarks[pk] = missionNumber + 1
    } else if (missionNumber > totalMissions) {
        throw new Error('Mission number is greater than total missions')
    } else {
        delete bookmarks[pk]
    }

    bookmarks[pk] = 1 //use this to test which mission packs don't match

    return bookmarks
}

const WithBookmarkContext = ({ children }: PropsWithChildren) => {
    const [bookmarks, setBookmarks] = useLocalStorage<Bookmarks>(LocalStorageVars.Bookmarks, {})
    const [showAgenda, setShowAgenda] = useState(false)

    const toggleBookmark = ({ mission_set: ms, order }: MissionDataPlus) => {
        let current = { ...bookmarks }
        if (current) {
            if (ms in current) {
                if (current[ms] !== order) current[ms] = order
                else if (current[ms] === order) current[ms] = null
            } else current[ms] = order
        } else current = { [ms]: order }
        setBookmarks(current)
    }
    const toggleAgenda = () => setShowAgenda(!showAgenda)

    const bookmarkNextMission = (missionSetId: number) => {
        const currentMission = bookmarks[missionSetId]!
        setBookmarks({ ...bookmarks, [missionSetId]: currentMission + 1 })
    }

    const bookmarkPrevMission = (missionSetId: number) => {
        const currentMission = bookmarks[missionSetId]!
        setBookmarks({ ...bookmarks, [missionSetId]: currentMission - 1 })
    }

    const syncBookmarks = (text: string) => {
        let start = text.indexOf(missionTextStart)
        let end = text.indexOf(missionTextEnd)
        let missionText = text.slice(start, end).replaceAll(' (Single Player)\n', '').replaceAll(' Missions\n', '').replaceAll('Progress:', ':')
        if (start != -1 && missionText.length > 20) {
            let newBookmarks = missionSetsData.reduce((acc: Bookmarks, { pk, name }) => {
                return { ...acc, ...getBookmarkFromText(pk, name, missionText) }
            }, {})
            setBookmarks(newBookmarks)
        }
        return missionText
    }
    const resetBookmarks = () => setBookmarks({})

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