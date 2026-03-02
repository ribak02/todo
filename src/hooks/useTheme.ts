import { useColorScheme } from 'react-native';
import { LightColors, DarkColors, ColorPalette } from '../theme/colors';

export function useTheme(): ColorPalette {
  const scheme = useColorScheme();
  return scheme === 'dark' ? DarkColors : LightColors;
}
