import {StyleSheet} from 'react-native';
import {colors} from 'src/app/styles/theme';

export const useStyles = () => {
  const styles = StyleSheet.create({
    commentText: {
      fontSize: 14,
      flexWrap: 'wrap',
    },
    replyButton: {
      alignSelf: 'flex-end',
      borderWidth: 1,
      borderColor: colors.white,
      backgroundColor: 'transparent',
      paddingVertical: 4,
      paddingHorizontal: 8,
      borderRadius: 4,
    },
    replyButtonText: {
      fontSize: 11,
      color: colors.white,
    },
    replyList: {
      marginVertical: 5,
      marginLeft: 10,
    },
  });
  return {
    styles,
    colors,
  };
};
