import { useState, useEffect } from 'react';
import { DayKey } from '../types';
import { loadAllDayKeys } from '../storage/taskStorage';
import { getTodayKey } from '../utils/dateUtils';

export function useDayList() {
  const todayKey = getTodayKey();
  const [dayKeys, setDayKeys] = useState<DayKey[]>([todayKey]);

  useEffect(() => {
    loadAllDayKeys().then(stored => {
      const all = Array.from(new Set([todayKey, ...stored]));
      all.sort((a, b) => b.localeCompare(a)); // newest first
      setDayKeys(all);
    });
  }, [todayKey]);

  const ensureDay = (key: DayKey) => {
    setDayKeys(prev => {
      if (prev.includes(key)) return prev;
      const next = [key, ...prev].sort((a, b) => b.localeCompare(a));
      return next;
    });
  };

  return { dayKeys, todayKey, ensureDay };
}
