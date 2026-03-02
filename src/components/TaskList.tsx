import React from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { Task } from '../types';
import { useTheme } from '../hooks/useTheme';
import { fontSize, space } from '../theme/styles';
import { TaskItem } from './TaskItem';
import { EmptyState } from './EmptyState';
import { AddTaskInput } from './AddTaskInput';
import { formatDisplayDate } from '../utils/dateUtils';

interface Props {
  dayKey: string;
  tasks: Task[];
  onAdd: (title: string) => void;
  onToggle: (id: string) => void;
  onUpdate: (id: string, changes: Partial<Pick<Task, 'title' | 'description'>>) => void;
}

export function TaskList({ dayKey, tasks, onAdd, onToggle, onUpdate }: Props) {
  const colors = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.contentBg }]}>
      <View style={[styles.header, { borderBottomColor: colors.divider }]}>
        <Text style={[styles.heading, { color: colors.primaryText }]}>
          {formatDisplayDate(dayKey)}
        </Text>
        <Text style={[styles.count, { color: colors.secondaryText }]}>
          {tasks.filter(t => !t.completed).length} remaining
        </Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={tasks.length === 0 ? styles.emptyContainer : undefined}>
        {tasks.length === 0 ? (
          <EmptyState />
        ) : (
          tasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={onToggle}
              onUpdate={onUpdate}
            />
          ))
        )}
      </ScrollView>

      <AddTaskInput onAdd={onAdd} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    paddingHorizontal: space.xl,
    paddingTop: space.xl,
    paddingBottom: space.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  heading: {
    fontSize: fontSize.xl,
    fontWeight: '600',
    marginBottom: space.xs,
  },
  count: {
    fontSize: fontSize.sm,
  },
  scroll: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
  },
});
