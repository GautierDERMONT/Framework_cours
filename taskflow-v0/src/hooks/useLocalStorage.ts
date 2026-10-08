import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  // 1. Lecture : une seule fois, au premier rendu
  const [value, setValue] = useState<T>(() => {
    const saved = localStorage.getItem(key);
    if (saved === null) return initialValue;
    try {
      return JSON.parse(saved) as T;
    } catch {
      return initialValue; // contenu illisible
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // quota dépassé ou storage indisponible — on ignore
    }
  }, [key, value]);

  return [value, setValue] as const;
}