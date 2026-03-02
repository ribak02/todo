import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { getTodayKey } from './src/utils/dateUtils';
import { useTheme } from './src/hooks/useTheme';
import { useDayList } from './src/hooks/useDayList';
import { useTasks } from './src/hooks/useTasks';
import { Sidebar } from './src/components/Sidebar';
import { TaskList } from './src/components/TaskList';
import { useMenuBar } from './src/hooks/useMenuBar';

function AppContent() {
  const colors = useTheme();
  const todayKey = getTodayKey();
  const [activeDayKey, setActiveDayKey] = useState(todayKey);
  const { dayKeys, ensureDay } = useDayList();
  const { tasks, addTask, toggleTask, updateTask } = useTasks(activeDayKey);

  // Today's tasks for the menu bar (shared cache keeps them in sync with above
  // when activeDayKey === todayKey)
  const { tasks: todayTasks, toggleTask: toggleTodayTask } = useTasks(todayKey);
  useMenuBar(todayTasks, toggleTodayTask);

  // Track task counts per day for sidebar display
  const [taskCountsByDay, setTaskCountsByDay] = useState<Record<string, number>>({});

  useEffect(() => {
    setTaskCountsByDay(prev => ({
      ...prev,
      [activeDayKey]: tasks.length,
    }));
  }, [tasks, activeDayKey]);

  const handleAddTask = useCallback(
    (title: string) => {
      addTask(title);
      ensureDay(activeDayKey);
    },
    [addTask, ensureDay, activeDayKey],
  );

  const handleSelectDay = useCallback((key: string) => {
    setActiveDayKey(key);
  }, []);

  return (
    <View style={[styles.root, { backgroundColor: colors.appBackground }]}>
      <Sidebar
        dayKeys={dayKeys}
        activeDayKey={activeDayKey}
        taskCountsByDay={taskCountsByDay}
        onSelectDay={handleSelectDay}
      />
      <View style={[styles.divider, { backgroundColor: colors.divider }]} />
      <TaskList
        dayKey={activeDayKey}
        tasks={tasks}
        onAdd={handleAddTask}
        onToggle={toggleTask}
        onUpdate={updateTask}
      />
    </View>
  );
}

export default function App() {
  return <AppContent />;
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'row',
  },
  divider: {
    width: StyleSheet.hairlineWidth,
  },
});
