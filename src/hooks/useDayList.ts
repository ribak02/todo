import { useState, useEffect, useCallback } from 'react';
import { DayKey } from '../types';
import { loadAllDayKeys, loadDayTasks, subscribeDayIndex } from '../storage/taskStorage';
import { getTodayKey } from '../utils/dateUtils';

function sorted(keys: DayKey[]): DayKey[] {
  return [...keys].sort((a, b) => b.localeCompare(a));
}

export function useDayList() {
  const todayKey = getTodayKey();
  const [dayKeys, setDayKeys] = useState<DayKey[]>([todayKey]);
  const [taskCountsByDay, setTaskCountsByDay] = useState<Record<string, number>>({});

  // Load task count for a single day (or batch of days)
  const loadCounts = useCallback((keys: DayKey[]) => {
    keys.forEach(key => {
      loadDayTasks(key).then(tasks => {
        setTaskCountsByDay(prev => ({ ...prev, [key]: tasks.length }));
      });
    });
  }, []);

  useEffect(() => {
    // Initial load from storage
    loadAllDayKeys().then(stored => {
      const all = sorted(Array.from(new Set([todayKey, ...stored])));
      setDayKeys(all);
      loadCounts(all);
    });

    // Re-sync whenever a new day is written to storage
    return subscribeDayIndex(stored => {
      setDayKeys(prev => {
        const all = sorted(Array.from(new Set([todayKey, ...stored])));
        const newOnes = all.filter(k => !prev.includes(k));
        if (newOnes.length) loadCounts(newOnes);
        return all;
      });
    });
  }, [todayKey, loadCounts]);

  // Called when a task is added so the day appears immediately (before storage round-trip)
  const ensureDay = useCallback((key: DayKey) => {
    setDayKeys(prev => {
      if (prev.includes(key)) return prev;
      return sorted([key, ...prev]);
    });
  }, []);

  // Keep sidebar counts fresh when tasks change in the current session
  const updateDayCount = useCallback((key: DayKey, count: number) => {
    setTaskCountsByDay(prev => ({ ...prev, [key]: count }));
  }, []);

  return { dayKeys, taskCountsByDay, ensureDay, updateDayCount };
}
