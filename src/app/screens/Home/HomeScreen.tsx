import React from 'react';
import {Box} from 'src/app/styles/theme';
import PostsScreen from './Posts/Posts';

const HomeScreen = () => {
  return (
    <Box flex={1} backgroundColor={'borderLine'}>
      <PostsScreen />
    </Box>
  );
};

export default HomeScreen;
