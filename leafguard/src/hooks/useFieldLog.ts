import { useState, useCallback } from 'react';
import type { ScanResult } from '../types';

const STORAGE_KEY = 'leafguard_log';

function loadLog(): ScanResult[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
  } catch {
    return [];
  }
}

function saveLog(log: ScanResult[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(log));
}

export function useFieldLog() {
  const [log, setLog] = useState<ScanResult[]>(loadLog);

  const addEntry = useCallback((entry: ScanResult) => {
    setLog((prev) => {
      const next = [entry, ...prev];
      saveLog(next);
      return next;
    });
  }, []);

  const removeEntry = useCallback((id: string) => {
    setLog((prev) => {
      const next = prev.filter((e) => e.id !== id);
      saveLog(next);
      return next;
    });
  }, []);

  return { log, addEntry, removeEntry };
}
