import React from 'react';
import {Text, TextStyle, TouchableOpacity, ViewStyle} from 'react-native';
import {styles} from './Button.useStyles';

interface CustomButtonProps {
  children: React.ReactNode;
  onPress: (args: any) => void | Promise<void>;
  style?: ViewStyle | ViewStyle[];
  textStyle?: TextStyle;
  disabled?: boolean;
}

const Button = ({
  children,
  onPress,
  style,
  textStyle,
  disabled = false,
}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[styles.button, style]}>
      <Text style={[styles.buttonText, textStyle]}>{children}</Text>
    </TouchableOpacity>
  );
};

export default Button;
