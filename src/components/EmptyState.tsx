import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { fontSize, space } from '../theme/styles';

export function EmptyState() {
  const colors = useTheme();
  return (
    <View style={styles.container}>
      <View style={[styles.iconCircle, { backgroundColor: colors.accent + '18' }]}>
        <Text style={[styles.icon, { color: colors.accent }]}>✓</Text>
      </View>
      <Text style={[styles.text, { color: colors.primaryText }]}>
        All clear
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
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: space.lg,
  },
  icon: {
    fontSize: 28,
    fontWeight: '700',
  },
  text: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    marginBottom: space.xs,
  },
  sub: {
    fontSize: fontSize.sm,
  },
});
