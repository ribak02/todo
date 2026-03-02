import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { fontSize, space, radius } from '../theme/styles';
import { formatSidebarDate } from '../utils/dateUtils';
import { getTodayKey } from '../utils/dateUtils';

interface Props {
  dayKey: string;
  taskCount: number;
  isSelected: boolean;
  onSelect: (dayKey: string) => void;
}

export function DayRow({ dayKey, taskCount, isSelected, onSelect }: Props) {
  const colors = useTheme();
  const isToday = dayKey === getTodayKey();

  return (
    <TouchableOpacity
      style={[
        styles.container,
        isSelected && { backgroundColor: colors.todayBadge + '22' },
      ]}
      onPress={() => onSelect(dayKey)}
      activeOpacity={0.7}>
      <View style={styles.content}>
        <View style={styles.labelRow}>
          <Text
            style={[
              styles.dateText,
              {
                color: isSelected ? colors.todayBadge : colors.primaryText,
                fontWeight: isSelected ? '600' : '400',
              },
            ]}
            numberOfLines={1}>
            {formatSidebarDate(dayKey)}
          </Text>
          {isToday && (
            <View style={[styles.badge, { backgroundColor: colors.todayBadge }]}>
              <Text style={styles.badgeText}>Today</Text>
            </View>
          )}
        </View>
        {taskCount > 0 && (
          <Text style={[styles.count, { color: colors.secondaryText }]}>
            {taskCount} task{taskCount !== 1 ? 's' : ''}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: space.md,
    paddingVertical: space.sm + 2,
    borderRadius: radius.sm,
    marginHorizontal: space.sm,
    marginVertical: 1,
  },
  content: {
    flex: 1,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.sm,
  },
  dateText: {
    fontSize: fontSize.sm,
    flex: 1,
  },
  badge: {
    borderRadius: radius.sm,
    paddingHorizontal: space.sm,
    paddingVertical: 2,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: fontSize.xs,
    fontWeight: '600',
  },
  count: {
    fontSize: fontSize.xs,
    marginTop: 2,
  },
});
