import { createContext, useContext, useState, PropsWithChildren, SetStateAction, Dispatch, useEffect } from 'react'
import { useLocalStorage } from '../hooks'
import { AmmoId, AnimalId, LocalStorageVars, MapId, bareFn } from '../types'
import { ThemeProvider } from 'styled-components'

const lightModeSet = {
    bgColor: 'FloralWhite',
    fontColor: 'black',
    profitColor: 'green',
    tooltipColor: 'lightyellow',
    buttonColor: '#e9e9ed',
    missionSetHighlight: 'gold',
    missionHighlight: 'gold',
    boughtItemHighlight: 'orange',
    bookmarkColor: 'red',

    //can be overridden by customColors
    ready: 'lightgreen',
    blocked: 'green',
    partlyLocked: 'yellow',
}
const darkModeSet = {
    bgColor: '#222222',
    fontColor: '#FFF8DC',
    profitColor: '#85FFDC',
    tooltipColor: '#123F31',
    buttonColor: '#436356',
    missionSetHighlight: '#004f39',
    missionHighlight: '#ABB0B0',
    boughtItemHighlight: '#53796A',
    bookmarkColor: '#85FFDC',

    //can be overridden by customColors
    ready: '#004F39',
    blocked: '#686E6E',
    partlyLocked: '#09716A',
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
    ammo: AmmoId[]
    toggleAmmo: (ammo: AmmoId) => void
    resetAmmo: () => void
    animal: AnimalId | null
    setAnimal: (animalId: AnimalId | null) => void
    alphaOrder: boolean
    setAlphaOrder: (alphaOrder: boolean) => void
    darkMode: boolean
    toggleDarkMode: () => void
}

const defaultSettings = {
    customColors: defaultCustomColors,
    setCustomColors: bareFn,
    map: null,
    setMap: bareFn,
    ammo: [],
    toggleAmmo: bareFn,
    resetAmmo: bareFn,
    animal: null,
    setAnimal: bareFn,
    alphaOrder: false,
    setAlphaOrder: bareFn,
    darkMode: false,
    toggleDarkMode: bareFn,
}
const SettingsContext = createContext<SettingsContext>(defaultSettings)
const WithSettingsContext = ({ children }: PropsWithChildren) => {
    const [darkMode, setDarkMode] = useLocalStorage<boolean>(LocalStorageVars.DarkMode)
    const [colors, setColors] = useState(lightModeSet)
    const [customColors, setCustomColors] = useLocalStorage<CustomColors>(LocalStorageVars.CustomColors, defaultCustomColors)
    const [map, setMap] = useLocalStorage<MapId | null>(LocalStorageVars.Reserve)
    const [ammo, setAmmo] = useLocalStorage<AmmoId[] | null>(LocalStorageVars.AmmoIds)
    const [animal, setAnimal] = useLocalStorage<AnimalId | null>(LocalStorageVars.Animal)
    const [alphaOrder, setAlphaOrder] = useLocalStorage<boolean>(LocalStorageVars.AlphaOrder, false)

    const safeAmmo = ammo ?? [] // will be null if it's user's 1st visit, or they last used the site before plural ammo replaced singular ammo
    const toggleDarkMode = () => setDarkMode(!darkMode)
    const toggleAmmo = (ammoId: AmmoId) => setAmmo(safeAmmo.includes(ammoId) ? safeAmmo.filter((a) => a !== ammoId) : [...safeAmmo, ammoId])
    const resetAmmo = () => setAmmo([])

    useEffect(() => {
        setCustomColors({ ready: colors.ready, blocked: colors.blocked, partlyLocked: colors.partlyLocked })
    }, [colors])

    useEffect(() => {
        setColors(darkMode ? darkModeSet : lightModeSet)
    }, [darkMode])

    return (
        <SettingsContext.Provider
            value={{
                customColors,
                setCustomColors,
                map,
                setMap,
                ammo: safeAmmo,
                toggleAmmo,
                resetAmmo,
                animal,
                setAnimal,
                alphaOrder,
                setAlphaOrder,
                darkMode,
                toggleDarkMode,
            }}
        >
            <ThemeProvider theme={colors}>{children}</ThemeProvider>
        </SettingsContext.Provider>
    )
}
export default WithSettingsContext
export const useSettingsContext = () => useContext(SettingsContext)
