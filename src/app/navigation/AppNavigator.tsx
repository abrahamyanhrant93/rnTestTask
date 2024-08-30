import React from 'react';

import {useAuth} from '@hooks';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';

import {HomeScreen, SignInScreen, SignUpScreen} from '../screens/index';

const _SCREEN_OPTIONS: NativeStackNavigationOptions = {
  headerShown: false,
  animation: 'fade',
};

const NativeStack = createNativeStackNavigator();

const AppNavigator = () => {
  const {status} = useAuth();

  return (
    <NativeStack.Navigator>
      {status === 'unauthorized' ? (
        <NativeStack.Group>
          <NativeStack.Screen
            name="SignUp"
            component={SignUpScreen}
            options={_SCREEN_OPTIONS}
          />
          <NativeStack.Screen
            name="Login"
            component={SignInScreen}
            options={_SCREEN_OPTIONS}
          />
        </NativeStack.Group>
      ) : (
        <NativeStack.Group>
          <NativeStack.Screen
            name="Home"
            component={HomeScreen}
            options={_SCREEN_OPTIONS}
          />
        </NativeStack.Group>
      )}
    </NativeStack.Navigator>
  );
};

export default AppNavigator;
