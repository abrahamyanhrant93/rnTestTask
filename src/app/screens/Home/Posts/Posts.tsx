import {FEED_BACKGROUND} from '@assets';
import {useAuth} from '@hooks';
import {Layout} from '@ui-kit';
import Button from '@ui-kit/Button';
import {usePostMutation} from '@ui-modules/posts/hooks/usePostMutation';
import {usePostsQuery} from '@ui-modules/posts/hooks/usePostsQuery';
import React, {useState} from 'react';
import {FlatList, ImageBackground, TextInput} from 'react-native';
import {Box, colors, Text} from 'src/app/styles/theme';
import Post from '../../../../ui-modules/posts/components/Post/Post';
import {useStyles} from './Posts.useStyles';

const PostsScreen = () => {
  const [showCreatePost, setShowCreatePost] = useState(false);

  const {data: posts} = usePostsQuery();
  const {mutateAsync} = usePostMutation();

  const {styles} = useStyles();

  const {onLogout} = useAuth();

  const handleCreatePost = async (content: string) => {
    mutateAsync({content});
    setShowCreatePost(false);
  };

  return (
    <ImageBackground source={FEED_BACKGROUND}>
      <Layout>
        <Box style={styles.container}>
          {posts?.length === 0 ? (
            <Box flex={1} justifyContent="center" alignItems="center">
              <Text variant={'text28BoldSystem'} color={'white'} mb={'xs'}>
                No posts yet.
              </Text>
            </Box>
          ) : (
            <FlatList
              data={posts}
              bounces={false}
              showsVerticalScrollIndicator={false}
              keyExtractor={post => post.id.toString()}
              renderItem={({item}) => <Post post={item} />}
            />
          )}
          <Box
            flexDirection={'row'}
            alignItems={'center'}
            justifyContent={'space-around'}>
            {showCreatePost ? (
              <PostCreationForm
                onCreatePost={handleCreatePost}
                showCreatePost={showCreatePost}
                hideCreatingPost={() => setShowCreatePost(false)}
              />
            ) : (
              <Button
                onPress={() => setShowCreatePost(true)}
                style={styles.makePostBtn}
                textStyle={styles.addButtonText}>
                +
              </Button>
            )}
            {!showCreatePost && <Button onPress={onLogout}>Log out</Button>}
          </Box>
        </Box>
      </Layout>
    </ImageBackground>
  );
};

// Component for creating a new post
const PostCreationForm = ({
  onCreatePost,
  showCreatePost = false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  hideCreatingPost = () => {},
}: {
  onCreatePost: (content: string) => void;
  showCreatePost?: boolean;
  hideCreatingPost?: () => void;
}) => {
  const [newPostContent, setNewPostContent] = useState('');

  const {styles} = useStyles();

  const handleSubmit = () => {
    onCreatePost(newPostContent);
    setNewPostContent('');
  };

  const createButtonStyle = {
    backgroundColor: colors.borderClear,
  };

  return (
    <Box style={styles.postCreationForm}>
      <TextInput
        value={newPostContent}
        onChangeText={setNewPostContent}
        placeholder="What's on your mind?"
        style={styles.postInput}
        placeholderTextColor={colors.white}
      />

      <Button
        disabled={!newPostContent.length}
        onPress={handleSubmit}
        style={[styles.createPostButton, createButtonStyle]}>
        Create Post
      </Button>
      {showCreatePost && (
        <Button onPress={hideCreatingPost} style={styles.createPostButton}>
          Cancel
        </Button>
      )}
    </Box>
  );
};

export default PostsScreen;
