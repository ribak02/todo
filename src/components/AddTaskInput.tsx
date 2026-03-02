import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { fontSize, space, radius } from '../theme/styles';

interface Props {
  onAdd: (title: string) => void;
}

export function AddTaskInput({ onAdd }: Props) {
  const colors = useTheme();
  const [expanded, setExpanded] = useState(false);
  const [value, setValue] = useState('');
  const inputRef = useRef<TextInput>(null);

  const expand = () => {
    setExpanded(true);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const confirm = () => {
    if (value.trim()) {
      onAdd(value.trim());
      setValue('');
      // keep expanded for rapid entry
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  };

  const cancel = () => {
    setValue('');
    setExpanded(false);
  };

  if (!expanded) {
    return (
      <TouchableOpacity
        style={[styles.button, { borderColor: colors.divider }]}
        onPress={expand}
        activeOpacity={0.7}>
        <Text style={[styles.buttonText, { color: colors.todayBadge }]}>
          + New Task
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <View
      style={[
        styles.inputRow,
        { backgroundColor: colors.contentBg, borderColor: colors.divider },
      ]}>
      <TextInput
        ref={inputRef}
        style={[styles.input, { color: colors.primaryText }]}
        placeholder="Task title…"
        placeholderTextColor={colors.secondaryText}
        value={value}
        onChangeText={setValue}
        onSubmitEditing={confirm}
        returnKeyType="done"
        blurOnSubmit={false}
        autoFocus
      />
      <TouchableOpacity onPress={confirm} style={styles.action}>
        <Text style={[styles.actionText, { color: colors.todayBadge }]}>
          Add
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={cancel} style={styles.action}>
        <Text style={[styles.actionText, { color: colors.secondaryText }]}>
          Cancel
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    margin: space.lg,
    paddingVertical: space.sm,
    paddingHorizontal: space.md,
    borderRadius: radius.md,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  buttonText: {
    fontSize: fontSize.sm,
    fontWeight: '500',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: space.lg,
    borderRadius: radius.md,
    borderWidth: 1,
    paddingHorizontal: space.md,
    paddingVertical: space.xs,
  },
  input: {
    flex: 1,
    fontSize: fontSize.md,
    paddingVertical: space.sm,
    outlineStyle: 'none',
  } as any,
  action: {
    paddingHorizontal: space.sm,
    paddingVertical: space.sm,
  },
  actionText: {
    fontSize: fontSize.sm,
    fontWeight: '500',
  },
});
