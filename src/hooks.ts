import { useEffect, useState } from 'react'
import { AssetFolder, MissionData, MissionId, MissionSetId } from './types'
import { missionSetObject } from './data/MissionItem/Data'

export function useDebounce(value: any, delay: number) {
    // State and setters for debounced value
    const [debouncedValue, setDebouncedValue] = useState(value)

    useEffect(
        () => {
            // Update debounced value after delay
            const handler = setTimeout(() => {
                setDebouncedValue(value)
            }, delay)

            // Cancel the timeout if value changes (also on delay change or unmount)
            // This is how we prevent debounced value from updating if value is changed ...
            // .. within the delay period. Timeout gets cleared and restarted.
            return () => {
                clearTimeout(handler)
            }
        },
        [value, delay] // Only re-call effect if value or delay changes
    )

    return debouncedValue
}

const localStorageSet = (varName: string, value: any) => {
    localStorage.setItem(varName, JSON.stringify(value))
}
const localStorageGet = (varName: string) => {
    const value = localStorage.getItem(varName)
    return value ? JSON.parse(value) : null
}

/**
 * useState but with localStorage syncing
 * @param name
 * @param defaultValue
 * @returns
 */
export const useLocalStorage = <T>(name: string, defaultValue: any = null): [T, React.Dispatch<React.SetStateAction<T>>] => {
    const [value, setValue] = useState<T>(localStorageGet(name) ?? defaultValue)

    useEffect(() => {
        localStorageSet(name, value)
    }, [value])

    return [value, setValue]
}

export const getMissionImage = ({ mission_set, order }: MissionData) => {
    //return `https://raw.githubusercontent.com/andrewsosa/starlink-tracker/master/src/assets/mission-set/${missionSetId}/${order}.webp`
    return `${missionSetObject[mission_set].name.toLowerCase().replaceAll(' ', '_')}_${order}`
}
export const useImage = (folder: AssetFolder, pk: MissionId | string): any => {
    const [image, setImage] = useState(null)

    useEffect(() => {
        async function loadData() {
            try {
                const data = await import(`./assets/${folder}/${pk}.webp`)
                data && setImage(data.default)
            } catch (e) {
                setImage(null)
            }
        }
        loadData()
    }, [])

    return image
}

export const useHover = () => {
    const [hover, setHover] = useState(false)
    let hoverFunctions = { onMouseEnter: () => setHover(true), onMouseLeave: () => setHover(false) }
    return { hoverFunctions, hover }
}
