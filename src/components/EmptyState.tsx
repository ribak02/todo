import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { fontSize, space } from '../theme/styles';

export function EmptyState() {
  const colors = useTheme();
  return (
    <View style={styles.container}>
      <Text style={[styles.icon, { color: colors.divider }]}>☑</Text>
      <Text style={[styles.text, { color: colors.secondaryText }]}>
        No tasks yet
      </Text>
      <Text style={[styles.sub, { color: colors.secondaryText }]}>
        Add a task below to get started
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: space.xxl,
  },
  icon: {
    fontSize: 48,
    marginBottom: space.md,
  },
  text: {
    fontSize: fontSize.lg,
    fontWeight: '500',
    marginBottom: space.xs,
  },
  sub: {
    fontSize: fontSize.sm,
  },
});
