import { createContext, useContext, useState, PropsWithChildren } from 'react'
import { bareFn } from '../types'
interface AmmoContext {
    hoverMap: number | null
    hoverAnimal: number | null
    hoverAmmo: number | null
    setHoverMap: (id: number | null) => void
    setHoverAnimal: (id: number | null) => void
    setHoverAmmo: (id: number | null) => void
}
const defaultAmmo = {
    hoverMap: null,
    hoverAnimal: null,
    hoverAmmo: null,
    setHoverMap: bareFn,
    setHoverAnimal: bareFn,
    setHoverAmmo: bareFn,
}
const AmmoContext = createContext<AmmoContext>(defaultAmmo)

const WithAmmoContext = ({ children }: PropsWithChildren) => {
    const [hoverMap, setHoverMap] = useState<number | null>(null)
    const [hoverAnimal, setHoverAnimal] = useState<number | null>(null)
    const [hoverAmmo, setHoverAmmo] = useState<number | null>(null)

    return <AmmoContext.Provider value={{ hoverMap, hoverAnimal, hoverAmmo, setHoverMap, setHoverAnimal, setHoverAmmo }}>{children}</AmmoContext.Provider>
}
export default WithAmmoContext
export const useAmmoContext = () => useContext(AmmoContext)
