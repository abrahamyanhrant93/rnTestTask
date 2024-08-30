import {StyleSheet} from 'react-native';
import {colors} from 'src/app/styles/theme';

export const styles = StyleSheet.create({
  label: {
    position: 'absolute',
    color: '#666',
    left: 0,
  },
  inputContainer: {
    borderBottomWidth: 2,
  },
  input: {
    height: 40,
    fontSize: 16,
    color: colors.primaryBackground,
    paddingVertical: 5,
  },
});
