import { createContext, useContext, useState, PropsWithChildren, SetStateAction, Dispatch, useEffect } from 'react'
import { useLocalStorage } from '../hooks'
import { LocalStorageVars, MapId } from '../types'

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

interface CustomColors {
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
}

const defaultSettings = {
    customColors: defaultCustomColors,
    setCustomColors: () => {},
    map: null,
    setMap: () => {},
}
const SettingsContext = createContext<SettingsContext>(defaultSettings)
const WithSettingsContext = ({ children }: PropsWithChildren) => {
    const [colors, setColors] = useState(lightMode)
    const [customColors, setCustomColors] = useState<CustomColors>(defaultCustomColors)
    const [map, setMap] = useLocalStorage<MapId | null>(LocalStorageVars.Reserve)

    return (
        <SettingsContext.Provider
            value={{
                customColors,
                setCustomColors,
                map,
                setMap,
            }}
        >
            {children}
        </SettingsContext.Provider>
    )
}
export default WithSettingsContext
export const useSettingsContext = () => useContext(SettingsContext)
