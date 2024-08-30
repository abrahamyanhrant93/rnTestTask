import {AVATAR} from '@assets';
import Button from '@ui-kit/Button';
import Input from '@ui-kit/Input';
import {useAddCommentMutation} from '@ui-modules/comments/hooks/useCommentsMutation';
import {useCommentsQuery} from '@ui-modules/comments/hooks/useCommentsQuery';
import React, {useCallback, useState} from 'react';
import {ActivityIndicator, Image} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import SecureStorageService from 'src/app/services/implementations/SecureStorage/secureStorageService';
import {Box, Text} from 'src/app/styles/theme';
import {TComment, TPost} from 'src/app/types';
import Comment from '../../../../app/screens/Home/Comments/Comment';
import {useStyles} from './Post.useStyles';

interface PostProps {
  post: TPost;
}

const RNSecureStorageService = new SecureStorageService();

const Post: React.FC<PostProps> = ({post}) => {
  const [newComment, setNewComment] = useState('');
  const [selectedComment, setSelectedComment] = useState<TComment | null>(null);
  const [addingComment, setAddingComment] = useState<boolean>(false);
  const {styles, colors} = useStyles();

  const {data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage} =
    useCommentsQuery(post.id);

  const comments = data?.pages.flat() || [];

  const {mutateAsync} = useAddCommentMutation({
    onSuccess: () => {
      setNewComment('');
      setSelectedComment(null);
      setAddingComment(false);
    },
  });

  const handleAddComment = async () => {
    if (newComment.trim()) {
      const currentUser = await RNSecureStorageService.getItem('user');
      const user = JSON.parse(currentUser || '');
      mutateAsync({
        postId: post.id,
        comment: {
          id: Date.now(),
          text: newComment,
          user_id: user.id,
          created_at: new Date().toISOString(),
          parent_comment_id: selectedComment ? selectedComment.id : 0,
          replies: [],
          commenter_username: user.username,
        },
        username: user.username,
      });
    }
  };

  const handleSelectComment = useCallback((comment: TComment) => {
    setAddingComment(true);
    setSelectedComment(comment);
  }, []);

  const cancelReply = useCallback(() => {
    setSelectedComment(null);
    setAddingComment(false);
  }, []);

  const loadMoreComments = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  return (
    <Box
      flex={1}
      borderWidth={2}
      borderRadius={'sm'}
      marginVertical={'xs'}
      paddingVertical={'xxs'}
      paddingHorizontal={'m'}
      style={styles.mainContainer}
      borderColor={'borderLine'}>
      <Box
        marginVertical={'xs'}
        backgroundColor={'link'}
        borderRadius={'xl'}
        width={'100%'}>
        <Box
          flexDirection={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}
          width={'95%'}>
          <Box flexDirection={'row'} gap={'m'} alignItems={'center'}>
            <Image source={AVATAR} style={styles.avatarImage} />
            <Text variant={'text16Bold'} mb={'xs'} color={'black'}>
              {`${post.poster}`}
            </Text>
          </Box>
          <Text variant={'text16'} mb={'xs'}>{`${new Date(
            post.created_at,
          ).toLocaleTimeString()}`}</Text>
        </Box>
      </Box>
      <Box>
        <Text variant={'text16Bold'} color={'white'} marginVertical={'xs'}>
          {post.content}
        </Text>
      </Box>
      {!isLoading ? (
        <FlatList
          data={comments as TComment[]}
          nestedScrollEnabled
          horizontal={false}
          showsVerticalScrollIndicator={false}
          keyExtractor={comment => comment.id.toString()}
          renderItem={({item}) => (
            <Comment comment={item} onReply={handleSelectComment} />
          )}
          ListFooterComponent={
            hasNextPage ? (
              <Button onPress={loadMoreComments} disabled={isFetchingNextPage}>
                {isFetchingNextPage ? 'Loading...' : 'Load More Comments'}
              </Button>
            ) : null
          }
        />
      ) : (
        <ActivityIndicator size={'large'} />
      )}
      {!addingComment && (
        <Button
          style={styles.leaveCommentButton}
          textStyle={styles.leaveCommentLabel}
          onPress={() => {
            setAddingComment(true);
          }}>
          Leave Comment
        </Button>
      )}
      {selectedComment && (
        <Box flexDirection={'row'}>
          <Text
            mt={'m'}
            color={'white'}
            variant={'text14Bold'}
            fontStyle={'italic'}>
            Replying to
          </Text>
          <Text
            mt={'m'}
            variant={'text14Bold'}
            color={'white'}
            fontStyle={'italic'}>
            {' '}
            {selectedComment.commenter_username}
          </Text>
        </Box>
      )}
      {addingComment && (
        <Box
          flexDirection={'column'}
          justifyContent={'space-between'}
          alignItems={'center'}>
          <Input
            value={newComment}
            onChangeText={setNewComment}
            placeholder="Write a comment..."
            placeholderTextColor={colors.white}
            containerStyle={styles.commentInput}
          />
          <Box flexDirection={'row'} width={'100%'} justifyContent={'flex-end'}>
            <Button
              textStyle={styles.addCommentBtnText}
              onPress={handleAddComment}>
              {selectedComment ? 'Reply' : 'Add Comment'}
            </Button>
            <Button textStyle={styles.addCommentBtnText} onPress={cancelReply}>
              Cancel
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Post;
