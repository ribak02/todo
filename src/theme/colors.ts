export interface ColorPalette {
  appBackground: string;
  sidebarBg: string;
  contentBg: string;
  cardBg: string;
  primaryText: string;
  secondaryText: string;
  completedText: string;
  accent: string;
  divider: string;
}

export const LightColors: ColorPalette = {
  appBackground: '#ECEDEF',
  sidebarBg: '#FFFFFF',
  contentBg: '#ECEDEF',
  cardBg: '#FFFFFF',
  primaryText: '#111111',
  secondaryText: '#9A9A9A',
  completedText: '#C8C8C8',
  accent: '#34C759',
  divider: '#EBEBEB',
};

export const DarkColors: ColorPalette = {
  appBackground: '#161618',
  sidebarBg: '#1E1E20',
  contentBg: '#161618',
  cardBg: '#262628',
  primaryText: '#F2F2F2',
  secondaryText: '#7A7A7A',
  completedText: '#4A4A4A',
  accent: '#30D158',
  divider: '#2E2E30',
};
