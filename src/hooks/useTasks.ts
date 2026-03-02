import { useState, useEffect, useCallback } from 'react';
import { Task, DayKey } from '../types';
import { loadDayTasks, saveDayTasks } from '../storage/taskStorage';
import { generateId } from '../utils/idUtils';

export function useTasks(dayKey: DayKey) {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    loadDayTasks(dayKey).then(setTasks);
  }, [dayKey]);

  const persist = useCallback(
    (updated: Task[]) => {
      setTasks(updated);
      saveDayTasks(dayKey, updated);
    },
    [dayKey],
  );

  const addTask = useCallback(
    (title: string) => {
      if (!title.trim()) return;
      const task: Task = {
        id: generateId(),
        dayKey,
        title: title.trim(),
        description: '',
        completed: false,
        order: tasks.length,
        createdAt: new Date().toISOString(),
      };
      persist([...tasks, task]);
    },
    [tasks, dayKey, persist],
  );

  const toggleTask = useCallback(
    (id: string) => {
      persist(
        tasks.map(t => (t.id === id ? { ...t, completed: !t.completed } : t)),
      );
    },
    [tasks, persist],
  );

  const updateTask = useCallback(
    (id: string, changes: Partial<Pick<Task, 'title' | 'description'>>) => {
      persist(tasks.map(t => (t.id === id ? { ...t, ...changes } : t)));
    },
    [tasks, persist],
  );

  const deleteTask = useCallback(
    (id: string) => {
      persist(tasks.filter(t => t.id !== id));
    },
    [tasks, persist],
  );

  return { tasks, addTask, toggleTask, updateTask, deleteTask };
}
