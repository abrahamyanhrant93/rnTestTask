import {StyleSheet} from 'react-native';
import {colors} from 'src/app/styles/theme';

export const useStyles = () => {
  const styles = StyleSheet.create({
    imageBackground: {
      flex: 1,
    },
    layout: {
      height: '100%',
      justifyContent: 'center',
    },
    input: {
      fontFamily: 'Mulish-Regular',
      fontSize: 15,
    },
    button: {
      bottom: 40,
      width: '85%',
      position: 'absolute',
      alignSelf: 'center',
    },
    inputLabel: {color: colors.borderLine, fontSize: 15},
  });
  return {
    styles,
    colors,
  };
};
