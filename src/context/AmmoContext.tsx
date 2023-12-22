import { createContext, useContext, useState, PropsWithChildren, SetStateAction, Dispatch, useEffect } from 'react'
import { ItemData, ItemId, MissionItemData, MissionDataPlus, MissionState, MissionData, bareFn } from '../types'
interface AmmoContext {
    hoverId: number | null
    hoverType: HoverType | null
    updateHover: (id: number | null, type: HoverType | null) => void
}
const defaultAmmo = {
    hoverId: null,
    hoverType: null,
    updateHover: bareFn,
}
const AmmoContext = createContext<AmmoContext>(defaultAmmo)

type HoverType = 'animal' | 'ammo' | 'map'

const WithAmmoContext = ({ children }: PropsWithChildren) => {
    const [hoverId, setHoverId] = useState<number | null>(null)
    const [hoverType, setHoverType] = useState<HoverType | null>(null)

    const updateHover = (id: number | null, type: HoverType | null) => {
        setHoverId(id)
        setHoverType(type)
    }
    return <AmmoContext.Provider value={{ hoverId, hoverType, updateHover }}>{children}</AmmoContext.Provider>
}
export default WithAmmoContext
export const useAmmoContext = () => useContext(AmmoContext)
