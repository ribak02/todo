export interface ColorPalette {
  appBackground: string;
  sidebarBg: string;
  contentBg: string;
  primaryText: string;
  secondaryText: string;
  completedText: string;
  todayBadge: string;
  checkboxFill: string;
  divider: string;
}

export const LightColors: ColorPalette = {
  appBackground: '#F5F5F5',
  sidebarBg: '#EBEBEB',
  contentBg: '#FFFFFF',
  primaryText: '#1A1A1A',
  secondaryText: '#6E6E6E',
  completedText: '#ADADAD',
  todayBadge: '#007AFF',
  checkboxFill: '#007AFF',
  divider: '#E4E4E4',
};

export const DarkColors: ColorPalette = {
  appBackground: '#1E1E1E',
  sidebarBg: '#252525',
  contentBg: '#2C2C2C',
  primaryText: '#F0F0F0',
  secondaryText: '#9A9A9A',
  completedText: '#555555',
  todayBadge: '#0A84FF',
  checkboxFill: '#0A84FF',
  divider: '#383838',
};
