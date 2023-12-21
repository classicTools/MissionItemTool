import { useEffect, useState } from 'react'
import { MissionId } from './types'

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

export const useImage = (pk: MissionId) => {
    const [image, setImage] = useState<any>(null)

    useEffect(() => {
        async function loadData() {
            const data = await import(`./assets/missions/${pk}.webp`)
            data && setImage(data.default)
        }

        loadData()
    }, [])

    return image
}
