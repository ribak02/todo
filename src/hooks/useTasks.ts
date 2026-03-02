import { useState, useEffect, useCallback } from 'react';
import { Task, DayKey } from '../types';
import { loadDayTasks, saveDayTasks } from '../storage/taskStorage';
import { generateId } from '../utils/idUtils';

// Shared cache so multiple useTasks(sameKey) instances stay in sync
const taskCache = new Map<DayKey, Task[]>();
const taskSubscribers = new Map<DayKey, Set<(t: Task[]) => void>>();

function subscribe(key: DayKey, cb: (t: Task[]) => void) {
  if (!taskSubscribers.has(key)) taskSubscribers.set(key, new Set());
  taskSubscribers.get(key)!.add(cb);
  return () => { taskSubscribers.get(key)?.delete(cb); };
}

function broadcast(key: DayKey, tasks: Task[]) {
  taskCache.set(key, tasks);
  taskSubscribers.get(key)?.forEach(cb => cb(tasks));
}

export function useTasks(dayKey: DayKey) {
  const [tasks, setTasks] = useState<Task[]>(() => taskCache.get(dayKey) ?? []);

  useEffect(() => {
    const unsub = subscribe(dayKey, setTasks);
    if (!taskCache.has(dayKey)) {
      loadDayTasks(dayKey).then(t => broadcast(dayKey, t));
    } else {
      setTasks(taskCache.get(dayKey)!);
    }
    return unsub;
  }, [dayKey]);

  const persist = useCallback(
    (updated: Task[]) => {
      broadcast(dayKey, updated);
      saveDayTasks(dayKey, updated);
    },
    [dayKey],
  );

  const addTask = useCallback(
    (title: string) => {
      if (!title.trim()) return;
      const current = taskCache.get(dayKey) ?? [];
      const task: Task = {
        id: generateId(),
        dayKey,
        title: title.trim(),
        description: '',
        completed: false,
        order: current.length,
        createdAt: new Date().toISOString(),
      };
      persist([...current, task]);
    },
    [dayKey, persist],
  );

  const toggleTask = useCallback(
    (id: string) => {
      const current = taskCache.get(dayKey) ?? [];
      persist(current.map(t => (t.id === id ? { ...t, completed: !t.completed } : t)));
    },
    [dayKey, persist],
  );

  const updateTask = useCallback(
    (id: string, changes: Partial<Pick<Task, 'title' | 'description'>>) => {
      const current = taskCache.get(dayKey) ?? [];
      persist(current.map(t => (t.id === id ? { ...t, ...changes } : t)));
    },
    [dayKey, persist],
  );

  const deleteTask = useCallback(
    (id: string) => {
      const current = taskCache.get(dayKey) ?? [];
      persist(current.filter(t => t.id !== id));
    },
    [dayKey, persist],
  );

  return { tasks, addTask, toggleTask, updateTask, deleteTask };
}
