import { createContext, useContext, useState, PropsWithChildren, SetStateAction, Dispatch, useEffect } from 'react'
import { ItemData, ItemId, MissionItemData, MissionDataPlus, MissionState, MissionData, MissionId, LocalStorageVars, MissionSetId, zeroFn } from '../types'
import { useLocalStorage } from '../hooks'
type Bookmarks = { [index: MissionSetId]: MissionId | null }
interface BookmarkContext {
    bookmarks: Bookmarks
    setBookmarks: Dispatch<SetStateAction<Bookmarks>>
    toggleBookmark: (mission: MissionDataPlus) => void
    showAgenda: boolean
    toggleAgenda: () => void
    bookmarkNextMission: (missionSetId: number) => void
    bookmarkPrevMission: (missionSetId: number) => void
}

const defaultBookmark = {
    bookmarks: [],
    setBookmarks: zeroFn,
    toggleBookmark: zeroFn,
    showAgenda: false,
    toggleAgenda: zeroFn,
    bookmarkNextMission: zeroFn,
    bookmarkPrevMission: zeroFn,
}
const BookmarkContext = createContext<BookmarkContext>(defaultBookmark)

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
    return (
        <BookmarkContext.Provider value={{ bookmarks, setBookmarks, toggleBookmark, showAgenda, toggleAgenda, bookmarkNextMission, bookmarkPrevMission }}>
            {children}
        </BookmarkContext.Provider>
    )
}
export default WithBookmarkContext
export const useBookmarkContext = () => useContext(BookmarkContext)
