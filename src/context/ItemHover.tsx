import { createContext, useContext, useState, PropsWithChildren, SetStateAction, Dispatch, useEffect } from 'react'
import { ItemData, ItemId, MissionItemData, MissionDataPlus, MissionState, MissionData } from '../types'
interface ItemHoverContext {
    itemHovered: ItemId | null
    setItemHovered: Dispatch<SetStateAction<ItemId | null>>
}
const defaultItemHover = {
    itemHovered: null,
    setItemHovered: () => {},
}
const ItemHoverContext = createContext<ItemHoverContext>(defaultItemHover)

const WithItemHoverContext = ({ children }: PropsWithChildren) => {
    const [itemHovered, setItemHovered] = useState<ItemId | null>(null)

    return <ItemHoverContext.Provider value={{ itemHovered, setItemHovered }}>{children}</ItemHoverContext.Provider>
}
export default WithItemHoverContext
export const useItemHoverContext = () => useContext(ItemHoverContext)
