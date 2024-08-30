import {
  MutateOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import SecureStorageService from 'src/app/services/implementations/SecureStorage/secureStorageService';
import DatabaseManager from 'src/app/services/implementations/SQL/sqlStorageService';
import {TPost} from 'src/app/types';

interface ICreatePostVariables {
  content: string;
}

const db = new DatabaseManager();
const RNSecureStorageService = new SecureStorageService();

const createPost = async (content: string) => {
  const currentUser = await RNSecureStorageService.getItem('user');
  const user = JSON.parse(currentUser || '');

  await db.addPost({
    id: Date.now(),
    user_id: user.id,
    poster: user.username,
    content,
    created_at: new Date().toISOString(),
  });

  return {content};
};

export const usePostMutation = (
  options?: MutateOptions<TPost, Error, ICreatePostVariables>,
) => {
  const queryClient = useQueryClient();

  return useMutation(
    async (variables: ICreatePostVariables) => createPost(variables.content),
    {
      onSuccess: async (data, variables, context) => {
        await queryClient.invalidateQueries(['posts']);
        options?.onSuccess?.(data as unknown as TPost, variables, context);
      },
      onError: error => {
        console.error('Error creating post:', error);
      },
    },
  );
};
