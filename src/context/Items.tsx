import { createContext, useContext, useState, PropsWithChildren, SetStateAction, Dispatch, useEffect } from 'react'
import { ItemData, ItemId, MissionItemData, MissionDataPlus, MS, MissionData } from '../types'
import { MissionItemDataName } from '../components/MissionItem/MissionItems'
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
    const [itemsBought, setItemsBought] = useState<ItemId[]>([])
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
