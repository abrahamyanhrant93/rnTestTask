import React from 'react';
import {ViewStyle} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Box} from 'src/app/styles/theme';

interface ILayout {
  children: React.ReactNode;
  style?: ViewStyle;
}

const Layout = ({children, style}: ILayout) => {
  const backgroundColor = 'transparent';
  return (
    <SafeAreaView style={{backgroundColor}}>
      <Box style={style}>{children}</Box>
    </SafeAreaView>
  );
};

export default Layout;
