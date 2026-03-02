import AsyncStorage from '@react-native-async-storage/async-storage';
import { Task, DayKey } from '../types';

const DAY_INDEX_KEY = 'day_index';

// Notify useDayList whenever the stored day index changes
const dayIndexListeners = new Set<(keys: DayKey[]) => void>();
export function subscribeDayIndex(cb: (keys: DayKey[]) => void): () => void {
  dayIndexListeners.add(cb);
  return () => { dayIndexListeners.delete(cb); };
}

function dayKey(key: DayKey): string {
  return `tasks_${key}`;
}

export async function loadDayTasks(key: DayKey): Promise<Task[]> {
  try {
    const raw = await AsyncStorage.getItem(dayKey(key));
    if (!raw) return [];
    return JSON.parse(raw) as Task[];
  } catch {
    return [];
  }
}

export async function saveDayTasks(key: DayKey, tasks: Task[]): Promise<void> {
  await AsyncStorage.setItem(dayKey(key), JSON.stringify(tasks));
  await addDayToIndex(key);
}

export async function loadAllDayKeys(): Promise<DayKey[]> {
  try {
    const raw = await AsyncStorage.getItem(DAY_INDEX_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as DayKey[];
  } catch {
    return [];
  }
}

async function addDayToIndex(key: DayKey): Promise<void> {
  const existing = await loadAllDayKeys();
  if (!existing.includes(key)) {
    const updated = [...existing, key];
    await AsyncStorage.setItem(DAY_INDEX_KEY, JSON.stringify(updated));
    dayIndexListeners.forEach(cb => cb(updated));
  }
}
