// import { useState } from 'react';

// export function useLocalStorage<T>(
//   key: string,
//   initialValue: T
// ): [T, (value: T | ((prev: T) => T)) => void] {
//   const [storedValue, setStoredValue] = useState<T>(() => {
//     try {
//       const item = window.localStorage.getItem(key);
//       if (item === null || item === undefined || item === 'undefined') {
//         return initialValue;
//       }
//       return JSON.parse(item);
//     } catch (error) {
//       console.error(`Error reading localStorage key "${key}":`, error);
//       return initialValue;
//     }
//   });

//   const setValue = (value: T | ((prev: T) => T)) => {
//     try {
//       const valueToStore = value instanceof Function ? value(storedValue) : value;
//       setStoredValue(valueToStore);
//       window.localStorage.setItem(key, JSON.stringify(valueToStore));
//     } catch (error) {
//       console.error(`Error setting localStorage key "${key}":`, error);
//     }
//   };

//   return [storedValue, setValue];
// }
import { useState, useEffect } from 'react';

// Helper function to detect ISO date strings
const isIsoDateString = (value: string): boolean => {
  return /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|[+-]\d{2}:\d{2})?$/.test(value);
};

// Custom JSON parser that revives Date objects
const customJsonParser = ( _: string, value: any): any => {
  if (typeof value === 'string' && isIsoDateString(value)) {
    return new Date(value);
  }
  return value;
};

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  options?: {
    syncAcrossTabs?: boolean; // Enable cross-tab synchronization
  }
): [T, (value: T | ((prev: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      if (typeof window === 'undefined') {
        return initialValue;
      }
      const item = window.localStorage.getItem(key);
      if (item === null || item === 'undefined') {
        return initialValue;
      }
      return JSON.parse(item, customJsonParser);
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((prev: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // Stringify with Date handling
      const stringifyValue = (val: any): string => {
        return JSON.stringify(val, (_, value) => {
          return value instanceof Date ? value.toISOString() : value;
        });
      };
      
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, stringifyValue(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  // Optional: Sync across browser tabs
  useEffect(() => {
    if (!options?.syncAcrossTabs || typeof window === 'undefined') {
      return;
    }

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === key && event.newValue !== null) {
        try {
          const newValue = JSON.parse(event.newValue, customJsonParser);
          setStoredValue(newValue);
        } catch (error) {
          console.error(`Error parsing storage event for key "${key}":`, error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key, options?.syncAcrossTabs]);

  return [storedValue, setValue];
}