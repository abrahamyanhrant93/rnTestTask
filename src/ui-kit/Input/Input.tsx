import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  StyleProp,
  TextInput,
  TextInputProps,
  TextStyle,
  ViewStyle,
} from 'react-native';
import {Box} from 'src/app/styles/theme';
import {styles} from './Input.useStyles';

interface AnimatableInputProps extends TextInputProps {
  label?: string;
  containerStyle?: ViewStyle;
  labelStyle?: TextStyle;
  inputStyle?: StyleProp<TextStyle>;
  focusBorderColor?: string;
  blurBorderColor?: string;
  animationDuration?: number;
}

const AnimatableInput: React.FC<AnimatableInputProps> = ({
  label = '',
  labelStyle,
  inputStyle,
  containerStyle,
  animationDuration = 200,
  focusBorderColor = '#6200ee',
  blurBorderColor = '#d3d3d3',
  ...textInputProps
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const animatedLabelPosition = useRef(
    new Animated.Value(textInputProps.value ? 1 : 0),
  ).current;
  const animatedBorderColor = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedLabelPosition, {
      toValue: isFocused || textInputProps.value ? 1 : 0,
      duration: animationDuration,
      useNativeDriver: true,
    }).start();

    Animated.timing(animatedBorderColor, {
      toValue: isFocused ? 1 : 0,
      duration: animationDuration,
      useNativeDriver: false,
    }).start();
  }, [isFocused, textInputProps.value, animationDuration]);

  const borderColorInterpolation = animatedBorderColor.interpolate({
    inputRange: [0, 1],
    outputRange: [blurBorderColor, focusBorderColor],
  });

  const labelStyleAnimation = {
    transform: [
      {
        translateY: animatedLabelPosition.interpolate({
          inputRange: [0, 1],
          outputRange: [13, -10],
        }),
      },
      {
        scale: animatedLabelPosition.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 0.8],
        }),
      },
    ],
  };

  return (
    <Box marginVertical={'xs'} style={containerStyle}>
      <Animated.Text style={[styles.label, labelStyleAnimation, labelStyle]}>
        {label}
      </Animated.Text>
      <Animated.View
        style={[
          styles.inputContainer,
          {borderBottomColor: borderColorInterpolation},
        ]}>
        <TextInput
          {...textInputProps}
          style={[styles.input, inputStyle]}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            if (!textInputProps.value) {
              setIsFocused(false);
            }
          }}
          blurOnSubmit
        />
      </Animated.View>
    </Box>
  );
};

export default AnimatableInput;
