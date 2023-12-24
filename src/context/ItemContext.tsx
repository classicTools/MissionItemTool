import { createContext, useContext, PropsWithChildren, SetStateAction, Dispatch } from 'react'
import { Bookmarks, ItemId, LocalStorageVars, bareFn, MissionId } from '../types'
import { useLocalStorage } from '../hooks'
import missionData from '../data/MissionItem/lookups/Mission.json'
import missionItemData from '../data/MissionItem/mappings/MissionItem.json'

interface ItemsContext {
    itemsBought: ItemId[]
    setItemsBought: Dispatch<SetStateAction<ItemId[]>>
    syncItems: (bookmarks: Bookmarks) => void
    toggleItemBought: (itemId: ItemId) => void
}
const defaultItems = {
    itemsBought: [],
    setItemsBought: bareFn,
    syncItems: bareFn,
    toggleItemBought: bareFn,
}
const ItemsContext = createContext<ItemsContext>(defaultItems)

const WithItemsContext = ({ children }: PropsWithChildren) => {
    const [itemsBought, setItemsBought] = useLocalStorage<ItemId[]>(LocalStorageVars.Items, [])
    const syncItems = (bookmarks: Bookmarks) => {
        let missionIds = Object.entries(bookmarks).reduce((acc: MissionId[], [missionSetId, missionNumber]) => {
            missionData.filter(({ mission_set, order }) => mission_set === parseInt(missionSetId) && order < missionNumber).map(({ pk }) => acc.push(pk))
            return acc
        }, [])
        // include unbooked i.e. completed mission sets
        missionIds.push(...missionData.filter(({ mission_set }) => !Object.keys(bookmarks).includes(`${mission_set}`)).map(({ pk }) => pk))

        let newItemsBought = missionItemData.filter(({ mission, any }) => missionIds.includes(mission) && !any).map(({ item }) => item)
        setItemsBought([...new Set([...itemsBought, ...newItemsBought])])
    }
    const toggleItemBought = (itemId: ItemId) => {
        setItemsBought((items) => (items.includes(itemId) ? items.filter((item) => item !== itemId) : [...items, itemId]))
    }
    return (
        <ItemsContext.Provider
            value={{
                itemsBought,
                setItemsBought,
                syncItems,
                toggleItemBought,
            }}
        >
            {children}
        </ItemsContext.Provider>
    )
}
export default WithItemsContext
export const useItemsContext = () => useContext(ItemsContext)
