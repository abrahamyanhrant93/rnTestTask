import Button from '@ui-kit/Button';
import React from 'react';
import {FlatList} from 'react-native-gesture-handler';
import {Box, Text} from 'src/app/styles/theme';
import {TComment} from 'src/app/types';
import {useStyles} from './Comment.useStyles';

interface CommentProps {
  comment: TComment;
  onReply: (comment: TComment) => void;
}

const Comment: React.FC<CommentProps> = ({comment, onReply}) => {
  const replyComment = () => onReply(comment);
  const {styles} = useStyles();

  return (
    <Box
      p={'xxs'}
      ml={'xs'}
      gap={'z'}
      marginVertical={'m'}
      borderLeftWidth={comment?.replies?.length ? 1 : 0}
      borderRadius={'s'}
      flexDirection={'column'}
      borderLeftColor={'white'}>
      <Box
        flexDirection={'row'}
        backgroundColor={'textLightSecondary'}
        paddingVertical={'xs'}
        paddingHorizontal={'m'}
        borderTopEndRadius={'m'}
        borderTopStartRadius={'m'}>
        <Text variant={'text16Bold'} color={'border'}>
          {`${comment.commenter_username}: `}
        </Text>
      </Box>
      <Box
        overflow={'hidden'}
        paddingHorizontal={'m'}
        paddingVertical={'xxs'}
        borderTopEndRadius={'z'}
        borderTopStartRadius={'z'}
        flexDirection={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
        backgroundColor={'textLight'}>
        <Box
          flexDirection={'column'}
          paddingVertical={'m'}
          alignItems={'flex-start'}
          gap={'xxs'}>
          <Text style={styles.commentText} variant={'text14'} color={'white'}>
            {comment.text}
          </Text>
        </Box>
      </Box>
      <Button
        onPress={replyComment}
        style={styles.replyButton}
        textStyle={styles.replyButtonText}>
        REPLY
      </Button>

      {comment.replies && comment.replies.length > 0 && (
        <FlatList
          data={comment.replies}
          horizontal={false}
          keyExtractor={reply => reply.id.toString()}
          renderItem={({item}) => (
            <Comment
              comment={item}
              onReply={onReply}
              key={item.id.toString()}
            />
          )}
          style={styles.replyList}
        />
      )}
    </Box>
  );
};

export default Comment;
