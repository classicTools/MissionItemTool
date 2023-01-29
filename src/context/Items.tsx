import { createContext, useContext, useState, PropsWithChildren, SetStateAction, Dispatch, useEffect } from 'react'
import { ItemData, ItemId } from '../types'
interface ItemsContext {
    itemHovered: ItemId | null
    setItemHovered: Dispatch<SetStateAction<ItemId | null>>
    itemsBought: ItemId[]
    setItemsBought: Dispatch<SetStateAction<ItemId[]>>
}

const defaultItems = {
    itemHovered: null,
    setItemHovered: () => {},
    itemsBought: [],
    setItemsBought: () => {},
}
const ItemsContext = createContext<ItemsContext>(defaultItems)
const WithItemsContext = ({ children }: PropsWithChildren) => {
    const [itemHovered, setItemHovered] = useState<ItemId | null>(null)
    const [itemsBought, setItemsBought] = useState<ItemId[]>([])

    const [itemDataPlus, setItemDataPlus] = useState<ItemData[]>([])

    return (
        <ItemsContext.Provider
            value={{
                itemHovered,
                setItemHovered,
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
