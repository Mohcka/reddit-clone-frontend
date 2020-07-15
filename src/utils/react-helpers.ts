import { useRef, useEffect } from 'react'

/**
 * Proivdes the means to retreive the previous state in a function component
 * @param value TODO write this ine
 */
export const usePrevious= <T extends {} | undefined>(value: T): T | undefined => {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value
  })

  return ref.current;
}