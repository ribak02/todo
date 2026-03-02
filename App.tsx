import React, { useEffect, useCallback } from 'react';
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
  const { dayKeys, taskCountsByDay, ensureDay, updateDayCount } = useDayList();
  const { tasks, addTask, toggleTask, updateTask } = useTasks(activeDayKey);

  // Today's tasks for the menu bar (shared cache keeps them in sync with above
  // when activeDayKey === todayKey)
  const { tasks: todayTasks, toggleTask: toggleTodayTask } = useTasks(todayKey);
  useMenuBar(todayTasks, toggleTodayTask);

  // Keep sidebar count badge in sync with current day's task list
  useEffect(() => {
    updateDayCount(activeDayKey, tasks.length);
  }, [tasks, activeDayKey, updateDayCount]);

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
      <View
        style={[
          styles.sidebar,
          {
            backgroundColor: colors.sidebarBg,
            shadowColor: '#000',
          },
        ]}>
        <Sidebar
          dayKeys={dayKeys}
          activeDayKey={activeDayKey}
          taskCountsByDay={taskCountsByDay}
          onSelectDay={handleSelectDay}
        />
      </View>
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
  sidebar: {
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    zIndex: 1,
  },
});
