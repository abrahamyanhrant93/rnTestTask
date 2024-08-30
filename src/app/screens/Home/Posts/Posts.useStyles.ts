import {StyleSheet} from 'react-native';
import {colors} from 'src/app/styles/theme';

export const useStyles = () => {
  const styles = StyleSheet.create({
    imageBackground: {
      flex: 1,
    },
    flatlistContainer: {
      height: '100%',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    container: {
      padding: 10,
      height: '100%',
    },
    addButtonText: {
      color: colors.black,
      fontSize: 20,
    },
    createPostButton: {
      width: '100%',
      alignSelf: 'center',
    },

    postCreationForm: {
      width: '100%',
      padding: 10,
    },
    postInput: {
      borderColor: colors.border,
      borderWidth: 1,
      borderRadius: 10,
      backgroundColor: colors.icon,
      padding: 10,
      color: colors.white,
      marginBottom: 10,
    },
    makePostBtn: {
      width: 50,
      height: 50,
      backgroundColor: colors.icon,
      borderRadius: 25,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  return {
    styles,
    colors,
  };
};
