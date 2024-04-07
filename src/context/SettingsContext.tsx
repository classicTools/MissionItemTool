import { createContext, useContext, useState, PropsWithChildren, SetStateAction, Dispatch, useEffect } from 'react'
import { useLocalStorage } from '../hooks'
import { AmmoId, AnimalId, LocalStorageVars, MapId, bareFn } from '../types'
import { ThemeProvider } from 'styled-components'

const defaultCustomColors: CustomColors = {
    ready: 'lightgreen',
    blocked: 'green',
    partlyLocked: 'yellow',
    bookmarkColor: 'red',
}
const defaultDarkCustomColors: CustomColors = {
    ready: '#004F39',
    blocked: '#686E6E',
    partlyLocked: '#09716A',
    bookmarkColor: '#85FFDC',
}
const lightModeSet = {
    bgColor: 'FloralWhite',
    fontColor: 'black',
    profitColor: 'green',
    tooltipColor: 'lightyellow',
    buttonColor: '#e9e9ed',
    missionSetHighlight: 'gold',
    missionHighlight: 'gold',
    boughtItemHighlight: 'orange',

    //can be overridden by customColors
    ...defaultCustomColors,
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

    //can be overridden by customColors
    ...defaultDarkCustomColors,
}

export interface CustomColors {
    ready: string
    blocked: string
    partlyLocked: string
    bookmarkColor: string
}

interface SettingsContext {
    customColors: CustomColors
    setCustomColors: Dispatch<SetStateAction<CustomColors>>
    resetCustomColors: () => void
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
    resetCustomColors: bareFn,
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

const defaultsReady = [defaultDarkCustomColors.ready, defaultCustomColors.ready]
const defaultsBlocked = [defaultDarkCustomColors.blocked, defaultCustomColors.blocked]
const defaultsPartlyLocked = [defaultDarkCustomColors.partlyLocked, defaultCustomColors.partlyLocked]
const defaultsBookmarkColor = [defaultDarkCustomColors.bookmarkColor, defaultCustomColors.bookmarkColor]

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
        setColors(darkMode ? darkModeSet : lightModeSet)

        const { ready, blocked, partlyLocked, bookmarkColor } = darkMode ? defaultDarkCustomColors : defaultCustomColors
        const { ready: customReady, blocked: customBlocked, partlyLocked: customPartlyLocked, bookmarkColor: customBookmarkColor } = customColors
        setCustomColors({
            ready: defaultsReady.includes(customReady) ? ready : customReady,
            blocked: defaultsBlocked.includes(customBlocked) ? blocked : customBlocked,
            partlyLocked: defaultsPartlyLocked.includes(customPartlyLocked) ? partlyLocked : customPartlyLocked,
            bookmarkColor: defaultsBookmarkColor.includes(customBookmarkColor) ? bookmarkColor : customBookmarkColor,
        })
    }, [darkMode])

    const resetCustomColors = () => setCustomColors(darkMode ? defaultDarkCustomColors : defaultCustomColors)

    return (
        <SettingsContext.Provider
            value={{
                customColors,
                setCustomColors,
                resetCustomColors,
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
