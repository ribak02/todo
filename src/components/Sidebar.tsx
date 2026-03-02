import React from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { fontSize, space } from '../theme/styles';
import { DayRow } from './DayRow';

interface Props {
  dayKeys: string[];
  activeDayKey: string;
  taskCountsByDay: Record<string, number>;
  onSelectDay: (dayKey: string) => void;
}

export function Sidebar({
  dayKeys,
  activeDayKey,
  taskCountsByDay,
  onSelectDay,
}: Props) {
  const colors = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.sidebarBg }]}>
      <View style={[styles.header, { borderBottomColor: colors.divider }]}>
        <Text style={[styles.title, { color: colors.primaryText }]}>
          Daily Planner
        </Text>
      </View>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.list}>
        {dayKeys.map(key => (
          <DayRow
            key={key}
            dayKey={key}
            taskCount={taskCountsByDay[key] ?? 0}
            isSelected={key === activeDayKey}
            onSelect={onSelectDay}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 220,
    flexShrink: 0,
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    paddingHorizontal: space.lg,
    paddingTop: space.xl,
    paddingBottom: space.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  title: {
    fontSize: fontSize.md,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  scroll: {
    flex: 1,
  },
  list: {
    paddingVertical: space.sm,
  },
});
