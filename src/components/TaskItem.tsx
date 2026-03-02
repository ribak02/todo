import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import { Task } from '../types';
import { useTheme } from '../hooks/useTheme';
import { fontSize, space, radius } from '../theme/styles';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface Props {
  task: Task;
  onToggle: (id: string) => void;
  onUpdate: (id: string, changes: Partial<Pick<Task, 'title' | 'description'>>) => void;
}

export function TaskItem({ task, onToggle, onUpdate }: Props) {
  const colors = useTheme();
  const [descExpanded, setDescExpanded] = useState(false);
  const [descValue, setDescValue] = useState(task.description);

  const toggleDesc = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setDescExpanded(v => !v);
  };

  const handleDescBlur = () => {
    if (!descValue.trim()) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setDescExpanded(false);
    }
    onUpdate(task.id, { description: descValue });
  };

  return (
    <View
      style={[
        styles.container,
        { borderBottomColor: colors.divider },
      ]}>
      <View style={styles.row}>
        <TouchableOpacity
          onPress={() => onToggle(task.id)}
          style={[
            styles.checkbox,
            {
              borderColor: task.completed ? colors.checkboxFill : colors.secondaryText,
              backgroundColor: task.completed ? colors.checkboxFill : 'transparent',
            },
          ]}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          {task.completed && (
            <Text style={styles.checkmark}>✓</Text>
          )}
        </TouchableOpacity>

        <View style={styles.titleContainer}>
          <TextInput
            style={[
              styles.title,
              {
                color: task.completed ? colors.completedText : colors.primaryText,
                textDecorationLine: task.completed ? 'line-through' : 'none',
                outlineStyle: 'none',
              } as any,
            ]}
            value={task.title}
            onChangeText={text => onUpdate(task.id, { title: text })}
            multiline={false}
            returnKeyType="done"
            blurOnSubmit
          />
          <TouchableOpacity onPress={toggleDesc} hitSlop={{ top: 4, bottom: 4, left: 4, right: 4 }}>
            <Text style={[styles.descToggle, { color: colors.secondaryText }]}>
              {descExpanded
                ? '▲ Hide note'
                : task.description
                ? '▼ ' + task.description.slice(0, 40) + (task.description.length > 40 ? '…' : '')
                : '▼ Add note'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {descExpanded && (
        <TextInput
          style={[
            styles.description,
            {
              color: colors.primaryText,
              borderColor: colors.divider,
              backgroundColor: colors.appBackground,
              outlineStyle: 'none',
            } as any,
          ]}
          value={descValue}
          onChangeText={setDescValue}
          onBlur={handleDescBlur}
          multiline
          placeholder="Add a note…"
          placeholderTextColor={colors.secondaryText}
          autoFocus
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: space.lg,
    paddingTop: space.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingBottom: space.md,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    marginTop: 1,
    marginRight: space.md,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
    lineHeight: 14,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: fontSize.md,
    fontWeight: '400',
    paddingVertical: 0,
    marginBottom: space.xs,
  },
  descToggle: {
    fontSize: fontSize.xs,
    marginBottom: space.xs,
  },
  description: {
    fontSize: fontSize.sm,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: radius.sm,
    padding: space.sm,
    marginBottom: space.md,
    minHeight: 72,
    textAlignVertical: 'top',
  },
});
