import { useEffect, useState } from 'react';

/**
 * Debounces a value and returns the debounced value.
 *
 * @param {string} value - The value to debounce.
 * @param {number} delay - The delay in milliseconds.
 * @returns {string} The debounced value.
 */
export const useDebounce = (value: string, delay: number): string => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [delay, value]);

  return debouncedValue;
};
