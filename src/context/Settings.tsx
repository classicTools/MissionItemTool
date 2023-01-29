import { createContext, useContext, useState, PropsWithChildren, SetStateAction, Dispatch, useEffect } from 'react'

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
    map: number | null
    setMap: Dispatch<SetStateAction<number | null>>
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
    const [map, setMap] = useState<number | null>(null)

    // const [mapSets, setMapSets] = useState<any[]>([])

    // useEffect(() => {
    //     console.log(itemsBought)
    //     return () => {}
    // }, [itemsBought])

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
