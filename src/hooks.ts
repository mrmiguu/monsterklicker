import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState } from 'react'
import { error, generateUUID, keys, parse, stringify } from './utils'

function useMyUUID() {
  const myUUID = useMemo(() => {
    let myUUID = localStorage.getItem('myUUID')
    if (!myUUID) {
      myUUID = generateUUID()
      localStorage.setItem('myUUID', myUUID)
    }
    return myUUID
  }, [])

  return myUUID
}

function useElementSize(elementRef: React.RefObject<HTMLDivElement>) {
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    const current = elementRef.current
    if (current) {
      const handleResize = (entries: ResizeObserverEntry[]) => {
        const entry = entries[0]!
        setWidth(entry.contentRect.width)
        setHeight(entry.contentRect.height)
      }
      const observer = new ResizeObserver(handleResize)
      observer.observe(current)
      return () => {
        observer.disconnect()
      }
    }
  }, [elementRef])

  return { width, height }
}

// https://usehooks.com/useLocalStorage/
function useStateWithLocalStorage<T>(initialKeyValue: { [key: string]: T }): [T, Dispatch<SetStateAction<T>>] {
  const key = keys(initialKeyValue)[0]!
  const initialValue = initialKeyValue[key] as T

  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue
    }

    try {
      const item = window.localStorage.getItem(key)
      return item !== null ? parse(item) : initialValue
    } catch (e) {
      error(e)
      return initialValue
    }
  })

  const setValue = useCallback<Dispatch<SetStateAction<T>>>(
    value => {
      try {
        const valueToStore = value instanceof Function ? value(storedValue) : value
        setStoredValue(valueToStore)

        if (typeof window !== 'undefined') {
          window.localStorage.setItem(key, stringify(valueToStore))
        }
      } catch (e) {
        error(e)
      }
    },
    [storedValue],
  )

  return [storedValue, setValue]
}

export { useMyUUID, useElementSize, useStateWithLocalStorage }
