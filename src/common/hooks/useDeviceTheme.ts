import {Appearance} from 'react-native';

export const useDeviceTheme = () => {
  const appearance = Appearance.getColorScheme();
  const isDarkMode = appearance === 'dark';
  return {isDarkMode};
};
