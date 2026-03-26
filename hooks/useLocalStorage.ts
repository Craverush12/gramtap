"use client";

import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";

type UseLocalStorageReturn<T> = readonly [T, Dispatch<SetStateAction<T>>];

export function useLocalStorage<T>(key: string, defaultValue: T): UseLocalStorageReturn<T> {
  const [storedValue, setStoredValue] = useState<T>(defaultValue);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    try {
      const item = window.localStorage.getItem(key);

      if (item === null) {
        setStoredValue(defaultValue);
        return;
      }

      setStoredValue(JSON.parse(item) as T);
    } catch {
      setStoredValue(defaultValue);
    }
  }, [defaultValue, key]);

  const setValue = useCallback<Dispatch<SetStateAction<T>>>(
    (value) => {
      setStoredValue((currentValue) => {
        const nextValue =
          value instanceof Function ? value(currentValue) : value;

        if (typeof window !== "undefined") {
          try {
            window.localStorage.setItem(key, JSON.stringify(nextValue));
          } catch {
            // Ignore storage failures and keep the in-memory state usable.
          }
        }

        return nextValue;
      });
    },
    [key]
  );

  return [storedValue, setValue] as const;
}
