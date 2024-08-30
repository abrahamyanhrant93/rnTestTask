import {
  MutateOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import DatabaseManager from 'src/app/services/implementations/SQL/sqlStorageService';
import {TComment} from 'src/app/types';

const db = new DatabaseManager();

interface IAddCommentVariables {
  postId: number;
  comment: TComment;
  username: string;
}

const addCommentToPost = async ({
  postId,
  comment,
  username,
}: IAddCommentVariables) => {
  if (comment.parent_comment_id) {
    await db.replyToComment(
      postId,
      username,
      comment.parent_comment_id,
      comment,
    );
  } else {
    await db.addCommentToPost(postId, comment, username);
  }
};

export const useAddCommentMutation = (
  options?: MutateOptions<TComment, Error, IAddCommentVariables>,
) => {
  const queryClient = useQueryClient();

  return useMutation(
    async (variables: IAddCommentVariables) => addCommentToPost(variables),
    {
      onSuccess: async (data, variables, context) => {
        options?.onSuccess?.(data as unknown as TComment, variables, context);
        await queryClient.invalidateQueries(['comments', variables.postId]);
      },
      onError: error => {
        console.error('Error adding comment:', error);
      },
    },
  );
};
