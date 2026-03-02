import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
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

  const handleDescBlur = () => {
    if (!descValue.trim()) setDescExpanded(false);
    onUpdate(task.id, { description: descValue });
  };

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.cardBg,
          shadowColor: '#000',
        },
      ]}>
      <View style={styles.row}>
        {/* Checkbox */}
        <TouchableOpacity
          onPress={() => onToggle(task.id)}
          style={[
            styles.checkbox,
            {
              borderColor: task.completed ? colors.accent : colors.divider,
              backgroundColor: task.completed ? colors.accent : 'transparent',
            },
          ]}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          {task.completed && <Text style={styles.checkmark}>✓</Text>}
        </TouchableOpacity>

        {/* Title + note toggle */}
        <View style={styles.body}>
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
          <TouchableOpacity
            onPress={() => setDescExpanded(v => !v)}
            hitSlop={{ top: 4, bottom: 4, left: 4, right: 4 }}>
            <Text style={[styles.noteToggle, { color: colors.secondaryText }]}>
              {descExpanded
                ? '↑ Hide note'
                : task.description
                ? task.description.slice(0, 50) + (task.description.length > 50 ? '…' : '')
                : '+ Add note'}
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
              backgroundColor: colors.contentBg,
              borderColor: colors.divider,
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
  card: {
    borderRadius: radius.lg,
    paddingHorizontal: space.lg,
    paddingTop: space.md,
    paddingBottom: space.sm,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingBottom: space.sm,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 11,
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
  body: {
    flex: 1,
  },
  title: {
    fontSize: fontSize.md,
    fontWeight: '500',
    paddingVertical: 0,
    marginBottom: 3,
  },
  noteToggle: {
    fontSize: fontSize.xs,
    marginBottom: 2,
  },
  description: {
    fontSize: fontSize.sm,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: radius.sm,
    padding: space.sm,
    marginBottom: space.sm,
    minHeight: 72,
    textAlignVertical: 'top',
  },
});
