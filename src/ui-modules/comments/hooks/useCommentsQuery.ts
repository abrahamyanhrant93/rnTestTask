import {
  useInfiniteQuery,
  type UseInfiniteQueryOptions,
} from '@tanstack/react-query';
import DatabaseManager from 'src/app/services/implementations/SQL/sqlStorageService';
import {TComment, TPost} from 'src/app/types';

const db = new DatabaseManager();

export const useCommentsQuery = (
  postId: TPost['id'],
  options?: UseInfiniteQueryOptions<TComment[], Error>,
) => {
  return useInfiniteQuery<TComment[], Error>(
    ['comments', postId],
    async ({pageParam = 0}) => {
      return await db.getNestedCommentsByPost(postId, pageParam);
    },
    {
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length ? allPages.length : undefined;
      },
      enabled: !!postId,
      ...options,
    },
  );
};
