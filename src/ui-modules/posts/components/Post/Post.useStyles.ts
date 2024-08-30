import {StyleSheet} from 'react-native';
import {SCREEN_WIDTH} from 'src/app/helpers/screenDimensions';
import {colors} from 'src/app/styles/theme';

export const useStyles = () => {
  const styles = StyleSheet.create({
    userAvatar: {
      width: 30,
      height: 30,
      borderRadius: 15,
    },
    input: {
      fontFamily: 'Mulish-Regular',
      fontSize: 15,
      color: colors.black,
      padding: 10,
    },
    inputContainer: {
      width: '90%',
      alignSelf: 'center',
      borderRadius: 5,
      backgroundColor: colors.whiteBlured,
    },
    inputLabel: {
      display: 'none',
    },
    avatarImage: {
      width: 40,
      height: 40,
      borderRadius: 20,
    },
    mainContainer: {
      backgroundColor: 'rgba(0,0,0,0.7)',
    },
    addCommentBtnText: {
      fontSize: 12,
    },
    leaveCommentButton: {
      width: SCREEN_WIDTH / 3,
      alignSelf: 'flex-end',
    },
    leaveCommentLabel: {
      color: colors.white,
      fontSize: 14,
    },
    commentInput: {
      width: '100%',
      paddingVertical: 5,
      marginVertical: 10,
    },
  });

  return {
    colors,
    styles,
  };
};
