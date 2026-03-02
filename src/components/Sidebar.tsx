import React from 'react';
import { View, ScrollView, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme, useIsDark, useToggleTheme } from '../hooks/useTheme';
import { fontSize, space, radius } from '../theme/styles';
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
  const isDark = useIsDark();
  const toggle = useToggleTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.sidebarBg }]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={[styles.logoMark, { backgroundColor: colors.accent }]}>
          <Text style={styles.logoText}>✓</Text>
        </View>
        <Text style={[styles.title, { color: colors.primaryText }]}>
          Daily Planner
        </Text>
      </View>

      <Text style={[styles.sectionLabel, { color: colors.secondaryText }]}>
        RECENTS
      </Text>

      {/* Day list */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}>
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

      {/* Theme toggle icon */}
      <View style={[styles.footer, { borderTopColor: colors.divider }]}>
        <TouchableOpacity
          onPress={toggle}
          activeOpacity={0.7}
          style={[styles.themeBtn, { backgroundColor: colors.appBackground }]}>
          <Text style={[styles.themeIcon, { color: colors.secondaryText }]}>
            {isDark ? '\u2600' : '\u263D'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 240,
    flexShrink: 0,
    flexDirection: 'column',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.sm,
    paddingHorizontal: space.lg,
    paddingTop: space.xl,
    paddingBottom: space.lg,
  },
  logoMark: {
    width: 28,
    height: 28,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  title: {
    fontSize: fontSize.md,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  sectionLabel: {
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.8,
    paddingHorizontal: space.xl,
    paddingBottom: space.xs,
  },
  scroll: {
    flex: 1,
  },
  list: {
    paddingHorizontal: space.md,
    paddingBottom: space.md,
  },
  footer: {
    paddingHorizontal: space.lg,
    paddingVertical: space.md,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  themeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  themeIcon: {
    fontSize: 16,
    lineHeight: 20,
  },
});
