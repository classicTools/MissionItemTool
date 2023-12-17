import { createContext, useContext, useState, PropsWithChildren, SetStateAction, Dispatch, useEffect } from 'react'
import { ItemData, ItemId, MissionItemData, MissionDataPlus, MissionState, MissionData, LocalStorageVars } from '../types'
import { MissionItemDataName } from '../components/MissionItem/MissionItems'
import { useLocalStorage } from '../hooks'
interface ItemsContext {
    itemsBought: ItemId[]
    setItemsBought: Dispatch<SetStateAction<ItemId[]>>
}
const defaultItems = {
    itemsBought: [],
    setItemsBought: () => {},
}
const ItemsContext = createContext<ItemsContext>(defaultItems)

const WithItemsContext = ({ children }: PropsWithChildren) => {
    //const [itemsBought, setItemsBought] = useState<ItemId[]>(localStorageGet('items')??[])
    const [itemsBought, setItemsBought] = useLocalStorage<ItemId[]>(LocalStorageVars.Items, [])
    return (
        <ItemsContext.Provider
            value={{
                itemsBought,
                setItemsBought,
            }}
        >
            {children}
        </ItemsContext.Provider>
    )
}
export default WithItemsContext
export const useItemsContext = () => useContext(ItemsContext)
