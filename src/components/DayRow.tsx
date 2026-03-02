import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { fontSize, space, radius } from '../theme/styles';
import { formatSidebarDate, getTodayKey } from '../utils/dateUtils';

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
        isSelected
          ? { backgroundColor: colors.accent + '18' }
          : { backgroundColor: 'transparent' },
      ]}
      onPress={() => onSelect(dayKey)}
      activeOpacity={0.7}>
      <View style={styles.left}>
        <View
          style={[
            styles.dot,
            { backgroundColor: isSelected ? colors.accent : colors.divider },
          ]}
        />
        <Text
          style={[
            styles.dateText,
            {
              color: isSelected ? colors.accent : colors.primaryText,
              fontWeight: isSelected ? '600' : '400',
            },
          ]}
          numberOfLines={1}>
          {isToday ? 'Today' : formatSidebarDate(dayKey)}
        </Text>
      </View>
      {taskCount > 0 && (
        <View
          style={[
            styles.badge,
            {
              backgroundColor: isSelected
                ? colors.accent
                : colors.secondaryText + '22',
            },
          ]}>
          <Text
            style={[
              styles.badgeText,
              { color: isSelected ? '#FFFFFF' : colors.secondaryText },
            ]}>
            {taskCount}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: space.md,
    paddingVertical: space.sm + 2,
    borderRadius: radius.md,
    marginVertical: 2,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.sm,
    flex: 1,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
  },
  dateText: {
    fontSize: fontSize.sm,
    flex: 1,
  },
  badge: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  badgeText: {
    fontSize: fontSize.xs,
    fontWeight: '600',
  },
});
