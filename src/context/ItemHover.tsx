import { createContext, useContext, useState, PropsWithChildren, SetStateAction, Dispatch } from 'react'
import { ItemId, bareFn } from '../types'
interface ItemHoverContext {
    itemHovered: ItemId | null
    setItemHovered: Dispatch<SetStateAction<ItemId | null>>
}
const defaultItemHover = {
    itemHovered: null,
    setItemHovered: bareFn,
}
const ItemHoverContext = createContext<ItemHoverContext>(defaultItemHover)

const WithItemHoverContext = ({ children }: PropsWithChildren) => {
    const [itemHovered, setItemHovered] = useState<ItemId | null>(null)

    return <ItemHoverContext.Provider value={{ itemHovered, setItemHovered }}>{children}</ItemHoverContext.Provider>
}
export default WithItemHoverContext
export const useItemHoverContext = () => useContext(ItemHoverContext)
