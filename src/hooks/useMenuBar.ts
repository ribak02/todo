import { useEffect } from 'react';
import { NativeModules, NativeEventEmitter, Platform } from 'react-native';
import { Task } from '../types';

const MenuBarModule =
  Platform.OS === 'macos' ? NativeModules.MenuBarModule : null;

export function useMenuBar(
  tasks: Task[],
  onToggle: (id: string) => void,
) {
  useEffect(() => {
    if (!MenuBarModule) return;
    const done = tasks.filter(t => t.completed).length;
    MenuBarModule.setTodayTasks(tasks, done, tasks.length);
  }, [tasks]);

  useEffect(() => {
    if (!MenuBarModule) return;
    const emitter = new NativeEventEmitter(MenuBarModule);
    const sub = emitter.addListener('onTaskToggled', ({id}: {id: string}) => {
      onToggle(id);
    });
    return () => sub.remove();
  }, [onToggle]);
}
