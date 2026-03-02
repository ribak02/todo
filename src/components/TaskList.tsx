import React from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { Task } from '../types';
import { useTheme } from '../hooks/useTheme';
import { fontSize, space, radius } from '../theme/styles';
import { TaskItem } from './TaskItem';
import { EmptyState } from './EmptyState';
import { AddTaskInput } from './AddTaskInput';
import { formatDisplayDate, getTodayKey } from '../utils/dateUtils';

interface Props {
  dayKey: string;
  tasks: Task[];
  onAdd: (title: string) => void;
  onToggle: (id: string) => void;
  onUpdate: (id: string, changes: Partial<Pick<Task, 'title' | 'description'>>) => void;
}

export function TaskList({ dayKey, tasks, onAdd, onToggle, onUpdate }: Props) {
  const colors = useTheme();
  const isToday = dayKey === getTodayKey();
  const done = tasks.filter(t => t.completed).length;
  const total = tasks.length;

  return (
    <View style={[styles.container, { backgroundColor: colors.contentBg }]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={[styles.heading, { color: colors.primaryText }]}>
              {isToday ? 'Today' : formatDisplayDate(dayKey)}
            </Text>
            <Text style={[styles.subheading, { color: colors.secondaryText }]}>
              {total === 0
                ? 'No tasks'
                : `${done} of ${total} completed`}
            </Text>
          </View>
          {total > 0 && (
            <View style={[styles.progressPill, { backgroundColor: colors.cardBg }]}>
              <View
                style={[
                  styles.progressFill,
                  {
                    backgroundColor: colors.accent,
                    width: `${Math.round((done / total) * 100)}%` as any,
                  },
                ]}
              />
              <Text style={[styles.progressText, { color: colors.primaryText }]}>
                {Math.round((done / total) * 100)}%
              </Text>
            </View>
          )}
        </View>
      </View>

      {/* Task cards */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.scrollContent,
          tasks.length === 0 && styles.emptyContainer,
        ]}
        showsVerticalScrollIndicator={false}>
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
    flexDirection: 'column',
  },
  header: {
    paddingHorizontal: space.xl,
    paddingTop: space.xl,
    paddingBottom: space.lg,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  heading: {
    fontSize: fontSize.xxl,
    fontWeight: '700',
    letterSpacing: -0.5,
    marginBottom: 2,
  },
  subheading: {
    fontSize: fontSize.sm,
    fontWeight: '400',
  },
  progressPill: {
    width: 100,
    height: 28,
    borderRadius: 14,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  progressFill: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    borderRadius: 14,
    opacity: 0.25,
  },
  progressText: {
    textAlign: 'center',
    fontSize: fontSize.xs,
    fontWeight: '600',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: space.xl,
    paddingBottom: space.md,
    gap: space.sm,
  },
  emptyContainer: {
    flex: 1,
  },
});
