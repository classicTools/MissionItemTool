import { createContext, useContext, useState, PropsWithChildren, SetStateAction, Dispatch, useEffect } from 'react'
import { useLocalStorage } from '../hooks'
import { AmmoId, AnimalId, LocalStorageVars, MapId, bareFn } from '../types'

export const lightMode = {
    bgColor: 'FloralWhite',
    fontColor: 'black',
    dotColor: 'black',
    profit: 'green',
    bgColorGlance: '#lightyellow',
}
export const darkMode = {
    bgColor: '#444444',
    fontColor: '#FFF8DC',
    dotColor: 'grey',
    profit: 'springgreen',
    bgColorGlance: '#333333',
}

export interface CustomColors {
    ready: string
    blocked: string
    partlyLocked: string
}
const defaultCustomColors: CustomColors = {
    ready: 'lightgreen',
    blocked: 'green',
    partlyLocked: 'yellow',
}

interface SettingsContext {
    customColors: CustomColors
    setCustomColors: Dispatch<SetStateAction<CustomColors>>
    map: MapId | null
    setMap: (mapId: MapId | null) => void
    ammo: AmmoId | null
    setAmmo: (ammoId: AmmoId | null) => void
    animal: AnimalId | null
    setAnimal: (animalId: AnimalId | null) => void
    alphaOrder: boolean
    setAlphaOrder: (alphaOrder: boolean) => void
}

const defaultSettings = {
    customColors: defaultCustomColors,
    setCustomColors: bareFn,
    map: null,
    setMap: bareFn,
    ammo: null,
    setAmmo: bareFn,
    animal: null,
    setAnimal: bareFn,
    alphaOrder: false,
    setAlphaOrder: bareFn,
}
const SettingsContext = createContext<SettingsContext>(defaultSettings)
const WithSettingsContext = ({ children }: PropsWithChildren) => {
    const [colors, setColors] = useState(lightMode)
    const [customColors, setCustomColors] = useLocalStorage<CustomColors>(LocalStorageVars.CustomColors, defaultCustomColors)
    const [map, setMap] = useLocalStorage<MapId | null>(LocalStorageVars.Reserve)
    const [ammo, setAmmo] = useLocalStorage<AmmoId | null>(LocalStorageVars.Ammo)
    const [animal, setAnimal] = useLocalStorage<AnimalId | null>(LocalStorageVars.Animal)
    const [alphaOrder, setAlphaOrder] = useLocalStorage<boolean>(LocalStorageVars.AlphaOrder, false)

    return (
        <SettingsContext.Provider value={{ customColors, setCustomColors, map, setMap, ammo, setAmmo, animal, setAnimal, alphaOrder, setAlphaOrder }}>
            {children}
        </SettingsContext.Provider>
    )
}
export default WithSettingsContext
export const useSettingsContext = () => useContext(SettingsContext)
