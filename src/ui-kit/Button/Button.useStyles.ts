import {StyleSheet} from 'react-native';
import {colors} from 'src/app/styles/theme';

export const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primaryAccent,
    padding: 10,
    borderRadius: 5,
    margin: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
});
