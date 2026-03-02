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
        style={[styles.addButton, { backgroundColor: colors.accent }]}
        onPress={expand}
        activeOpacity={0.85}>
        <Text style={styles.addButtonText}>+ New Task</Text>
      </TouchableOpacity>
    );
  }

  return (
    <View
      style={[
        styles.inputCard,
        {
          backgroundColor: colors.cardBg,
          shadowColor: '#000',
        },
      ]}>
      <TextInput
        ref={inputRef}
        style={[
          styles.input,
          { color: colors.primaryText, outlineStyle: 'none' } as any,
        ]}
        placeholder="What needs to be done?"
        placeholderTextColor={colors.secondaryText}
        value={value}
        onChangeText={setValue}
        onSubmitEditing={confirm}
        returnKeyType="done"
        blurOnSubmit={false}
        autoFocus
      />
      <View style={styles.actions}>
        <TouchableOpacity
          onPress={confirm}
          style={[styles.confirmBtn, { backgroundColor: colors.accent }]}
          activeOpacity={0.85}>
          <Text style={styles.confirmText}>Add</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={cancel} style={styles.cancelBtn}>
          <Text style={[styles.cancelText, { color: colors.secondaryText }]}>
            Cancel
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  addButton: {
    margin: space.xl,
    marginTop: space.md,
    paddingVertical: space.md,
    borderRadius: radius.lg,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: fontSize.sm,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  inputCard: {
    margin: space.xl,
    marginTop: space.md,
    borderRadius: radius.lg,
    padding: space.lg,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  input: {
    fontSize: fontSize.md,
    paddingVertical: space.xs,
    marginBottom: space.md,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.sm,
  },
  confirmBtn: {
    paddingHorizontal: space.lg,
    paddingVertical: space.sm,
    borderRadius: radius.md,
  },
  confirmText: {
    color: '#FFFFFF',
    fontSize: fontSize.sm,
    fontWeight: '600',
  },
  cancelBtn: {
    paddingHorizontal: space.sm,
    paddingVertical: space.sm,
  },
  cancelText: {
    fontSize: fontSize.sm,
    fontWeight: '500',
  },
});
