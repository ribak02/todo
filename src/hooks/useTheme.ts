import { useState, useEffect, useCallback } from 'react';
import { useColorScheme } from 'react-native';
import { LightColors, DarkColors, ColorPalette } from '../theme/colors';

// Module-level override — null means follow the system setting
let overrideMode: 'light' | 'dark' | null = null;
const listeners = new Set<() => void>();

function notify() {
  listeners.forEach(l => l());
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => { listeners.delete(cb); };
}

function effectiveIsDark(scheme: string | null | undefined): boolean {
  return overrideMode !== null ? overrideMode === 'dark' : scheme === 'dark';
}

export function useTheme(): ColorPalette {
  const scheme = useColorScheme();
  const [, setTick] = useState(0);

  useEffect(() => subscribe(() => setTick(t => t + 1)), []);

  return effectiveIsDark(scheme) ? DarkColors : LightColors;
}

export function useIsDark(): boolean {
  const scheme = useColorScheme();
  const [, setTick] = useState(0);

  useEffect(() => subscribe(() => setTick(t => t + 1)), []);

  return effectiveIsDark(scheme);
}

export function useToggleTheme(): () => void {
  const scheme = useColorScheme();

  return useCallback(() => {
    const current = overrideMode ?? (scheme === 'dark' ? 'dark' : 'light');
    overrideMode = current === 'dark' ? 'light' : 'dark';
    notify();
  }, [scheme]);
}
