import {SIGN_IN_BACKGROUND} from '@assets';
import {useAuth} from '@hooks';
import {useNavigation} from '@react-navigation/native';
import {Layout} from '@ui-kit';
import Button from '@ui-kit/Button';
import Input from '@ui-kit/Input';
import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {ImageBackground, KeyboardAvoidingView} from 'react-native';
import {Box, Text} from 'src/app/styles/theme';
import {controllerEmailOptions, controllerUserNameOptions} from '../constants';
import {useStyles} from './SignIn.useStyles';

type TFormData = {
  username: string;
  email: string;
  id: number;
};

const SignInScreen = () => {
  const {styles} = useStyles();
  const navigation = useNavigation();

  const {onLogin, errorMessage} = useAuth();

  const {
    control,
    reset,
    handleSubmit,
    formState: {errors},
  } = useForm<TFormData>({
    defaultValues: {
      username: '',
      email: '',
    },
  });

  const onSubmit = async (data: TFormData) => {
    onLogin(data);
    reset();
  };

  return (
    <ImageBackground
      style={styles.imageBackground}
      source={SIGN_IN_BACKGROUND}
      resizeMode="cover">
      <KeyboardAvoidingView style={{flex: 1}} behavior="height">
        <Layout style={styles.layout}>
          <Box
            px={'l'}
            py={'xl'}
            gap={'m'}
            m={'l'}
            borderWidth={1}
            borderRadius={'sm'}
            borderColor={'primaryBackground'}
            backgroundColor={'whiteBlured'}>
            <Text
              textAlign={'center'}
              variant={'text22BoldSystem'}
              color={'primaryBackground'}>
              SIGN IN
            </Text>
            <Box>
              <Controller
                control={control}
                rules={controllerUserNameOptions}
                render={({field: {onChange, onBlur, value}}) => (
                  <Input
                    label="Username"
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    animationDuration={100}
                    inputStyle={styles.input}
                    labelStyle={styles.inputLabel}
                  />
                )}
                name="username"
              />
              {errors.username && (
                <Text variant={'text14SemiBold'} color={'red'} pb={'xs'}>
                  {errors.username.message}
                </Text>
              )}
            </Box>
            <Box>
              <Controller
                control={control}
                rules={controllerEmailOptions}
                render={({field: {onChange, onBlur, value}}) => (
                  <Input
                    label="Email"
                    value={value}
                    onBlur={onBlur}
                    autoCapitalize="none"
                    onChangeText={onChange}
                    animationDuration={100}
                    inputStyle={styles.input}
                    keyboardType="email-address"
                    returnKeyType="join"
                    labelStyle={styles.inputLabel}
                  />
                )}
                name="email"
              />
              {errors.email && (
                <Text variant={'text14SemiBold'} color={'red'} pb={'xs'}>
                  {errors.email.message}
                </Text>
              )}
            </Box>
            {errorMessage && (
              <Text variant={'text14SemiBold'} color={'red'} pb={'xs'}>
                {errorMessage}
              </Text>
            )}
            <Text
              variant={'text14SemiBold'}
              textAlign={'center'}
              color={'primaryBackground'}
              pb={'xs'}>
              Don&apos;t have an account?{' '}
              <Text
                onPress={() =>
                  navigation.navigate(
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    //@ts-ignore
                    'SignUp',
                  )
                }
                color={'primaryAccent'}>
                Sign Up
              </Text>
            </Text>
          </Box>
        </Layout>
        <Button onPress={handleSubmit(onSubmit)} style={styles.button}>
          Sign In
        </Button>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default SignInScreen;
