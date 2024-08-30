import {useDeviceTheme} from '@hooks';

export interface Colors {
  primaryAccent: string;
  secondaryAccent: string;
  accentPrimaryStrongest: string;
  primaryAccentSecondary: string;
  whiteBlured: string;
  textLightSecondary: string;
  textLight: string;
  accentPrimaryStronger: string;
  borderLine: string;
  red: string;
  green: string;
  primaryBackground: string;
  accentSecondaryStrong: string;
  secondaryBackground: string;
  textHeadlines: string;
  text: string;
  textDim: string;
  border: string;
  icon: string;
  black: string;
  white: string;
  shadow: string;
  transparent: string;
  borderClear: string;
  borderWeak: string;
  link: string;
}

export const lightColorPalette: Colors = {
  primaryAccent: '#00b4d9',
  accentPrimaryStrongest: '#A16500',
  whiteBlured: 'rgba(255,255,255,0.4)',
  accentPrimaryStronger: '#CA8400',
  accentSecondaryStrong: '#5D3705',
  primaryAccentSecondary: '#8ecae6',
  secondaryAccent: '#7F4C00',
  borderLine: '#E1E8EA',
  textLightSecondary: '#303D43',
  red: '#E53E34',
  green: '#34B075',
  primaryBackground: '#FFFFFF',
  secondaryBackground: '#F1F3F4',
  textHeadlines: '#171A1C',
  text: '#35434A',
  textDim: '#809098',
  textLight: '#66747C',
  border: '#E3E6E7',
  icon: '#809098',
  black: '#000000',
  white: '#FFFFFF',
  shadow: '#000000',
  transparent: 'transparent',
  borderClear: '#31616f26',
  borderWeak: '#EFF5F6',
  link: '#4286f4',
};

export const darkColorPalette: Colors = {
  primaryAccent: '#0077b6',
  accentPrimaryStrongest: '#FEEFBB',
  whiteBlured: 'rgba(255,255,255,0.4)',
  accentPrimaryStronger: '#FDDF83',
  primaryAccentSecondary: '#8ecae6',
  accentSecondaryStrong: '#FDCD51',
  secondaryAccent: '#FABC2C',
  borderLine: '#303D43',
  textLightSecondary: '#E1E8EA',
  textLight: '#98A4AA',
  red: '#F4453A',
  green: '#3ABC7E',
  primaryBackground: '#000000',
  secondaryBackground: '#171A1C',
  textHeadlines: '#F1F3F4',
  text: '#D5DADC',
  textDim: '#AFBAC0',
  border: '#35434A',
  icon: '#AFBAC0',
  shadow: '#FFFFFF',
  black: '#000000',
  white: '#ffffff',
  transparent: 'transparent',
  borderClear: '#9fcfdd26',
  borderWeak: '#1E292E',
  link: '#4286f4',
};

export const useColors = (onlyLight?: boolean) => {
  const {isDarkMode} = useDeviceTheme();

  return onlyLight
    ? lightColorPalette
    : isDarkMode
    ? darkColorPalette
    : lightColorPalette;
};
