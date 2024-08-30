import {
  VariantProps,
  createBox,
  createRestyleComponent,
  createText,
  createTheme,
  createVariant,
} from '@shopify/restyle';
import {lightColorPalette} from './useColors';

export const MulishRegular = 'Mulish-Regular';
export const MulishBold = 'Mulish-Bold';
export const MulishSemiBold = 'Mulish-SemiBold';
export const MulishExtraBold = 'Mulish-ExtraBold';
export const MulishLight = 'Mulish-Light';

export const theme = createTheme({
  colors: {
    ...lightColorPalette,
  },
  spacing: {
    _xxs: -2,
    z: 0,
    xxs: 2,
    xs: 4,
    sl: 6,
    s: 8,
    _10: 10,
    sm: 12,
    m: 16,
    mx: 20,
    _m: -16,
    l: 24,
    xl: 32,
    xxl: 80,
  },
  borderRadii: {
    z: 0,
    s: 5,
    m: 10,
    sm: 12,
    xm: 15,
    l: 25,
    x: 40,
    xl: 150,
  },
  textVariants: {
    defaults: {},
    regular: {
      fontFamily: MulishRegular,
    },
    bold: {
      fontSize: 16,
      fontFamily: MulishBold,
    },
    semiBold: {
      fontSize: 16,
      fontFamily: MulishBold,
    },
    semiBoldSystem: {
      fontSize: 16,
      fontFamily: MulishSemiBold,
    },
    text10: {
      fontSize: 10,
      fontFamily: MulishRegular,
    },
    text10SemiBold: {
      fontSize: 10,
      fontFamily: MulishSemiBold,
    },
    text11: {
      fontSize: 11,
      fontFamily: MulishRegular,
    },
    text12: {
      fontSize: 12,
      fontFamily: MulishRegular,
    },
    text12SemiBold: {
      fontSize: 12,
      fontFamily: MulishSemiBold,
    },
    text12Bold: {
      fontSize: 12,
      fontFamily: MulishBold,
    },
    text13: {
      fontSize: 13,
      fontFamily: MulishRegular,
    },
    text13System: {
      fontSize: 13,
      fontFamily: MulishRegular,
    },
    text13Bold: {
      fontSize: 13,
      fontFamily: MulishBold,
    },
    text13SemiBold: {
      fontSize: 13,
      fontFamily: MulishSemiBold,
    },
    text14: {
      fontSize: 14,
      fontFamily: MulishRegular,
    },
    text14Bold: {
      fontSize: 14,
      fontFamily: MulishBold,
    },
    text14SemiBold: {
      fontSize: 14,
      fontFamily: MulishSemiBold,
    },
    text14System: {
      fontSize: 14,
      fontFamily: MulishRegular,
    },
    text14SemiBoldSystem: {
      fontSize: 14,
      fontFamily: MulishSemiBold,
    },
    text15: {
      fontSize: 15,
      fontFamily: MulishRegular,
    },
    text15System: {
      fontSize: 15,
      fontFamily: MulishRegular,
    },
    text15SemiBold: {
      fontSize: 15,
      fontFamily: MulishSemiBold,
    },
    text16S: {
      fontSize: 16,
      fontFamily: MulishSemiBold,
    },
    text16: {
      fontSize: 16,
      lineHeight: 24,
      fontFamily: MulishRegular,
    },
    text16System: {
      fontSize: 16,
      lineHeight: 24,
      fontFamily: MulishRegular,
    },
    text16Bold: {
      fontSize: 16,
      lineHeight: 24,
      fontFamily: MulishBold,
    },
    text16SemiBold: {
      fontSize: 16,
      lineHeight: 24,
      fontFamily: MulishSemiBold,
    },

    text17SemiBold: {
      fontSize: 17,
      fontFamily: MulishBold,
    },
    text18: {
      fontSize: 18,
      fontFamily: MulishRegular,
    },
    text18SemiBold: {
      fontSize: 18,
      fontFamily: MulishSemiBold,
    },
    text18Bold: {
      fontSize: 18,
      fontFamily: MulishBold,
    },
    text18BoldSystem: {
      fontSize: 18,
      fontFamily: MulishBold,
    },
    text20: {
      fontSize: 20,
      fontFamily: MulishRegular,
    },
    text20SemiBold: {
      fontSize: 20,
      fontFamily: MulishSemiBold,
    },

    text20Bold: {
      fontSize: 20,
      fontFamily: MulishBold,
    },
    text20BoldSystem: {
      fontSize: 20,
      fontFamily: MulishBold,
    },

    text22: {
      fontSize: 22,
      fontFamily: MulishBold,
    },

    text22Bold: {
      fontSize: 22,
      fontFamily: MulishBold,
    },

    text22BoldSystem: {
      fontSize: 22,
      fontFamily: MulishBold,
    },
    text22SemiBoldSystem: {
      fontSize: 22,
      fontFamily: MulishSemiBold,
    },
    text24: {
      fontSize: 24,
      fontFamily: MulishSemiBold,
    },
    text24Bold: {
      fontSize: 24,
      fontFamily: MulishBold,
    },
    text26Bold: {
      fontSize: 26,
      fontFamily: MulishBold,
    },
    text28Bold: {
      fontSize: 28,
      fontFamily: MulishBold,
    },
    text28BoldSystem: {
      fontSize: 28,
      fontFamily: MulishBold,
    },
    w600: {
      fontFamily: MulishRegular,
    },
    w600SemiBold: {
      fontFamily: MulishSemiBold,
    },
    w700: {
      color: 'textHeadlines',
      fontWeight: '700',
      fontFamily: MulishRegular,
    },
    w800: {
      color: 'textHeadlines',
      fontWeight: '800',
      fontFamily: MulishRegular,
    },
  },
  boxVariants: {
    defaults: {},
    default: {
      flexDirection: 'column',
    },
    RSB: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    Row: {
      flexDirection: 'row',
    },
    center: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    RAC: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    Container: {
      paddingHorizontal: {
        phone: 'l',
        tablet: 'xl',
      },
      paddingTop: 'm',
    },
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
    largeTablet: 900,
  },
});

export const colors = theme.colors;
export type Theme = typeof theme;
export const Box = createBox<Theme>();

export const Text = createText<Theme>();

export const CustomBox = createRestyleComponent<
  VariantProps<Theme, 'boxVariants'> & React.ComponentProps<typeof Box>,
  Theme
>([createVariant({themeKey: 'boxVariants'})], Box);

export default theme;
