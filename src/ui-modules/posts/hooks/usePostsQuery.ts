import {useQuery, type UseQueryOptions} from '@tanstack/react-query';
import DatabaseManager from 'src/app/services/implementations/SQL/sqlStorageService';
import {TPost} from 'src/app/types';

const db = new DatabaseManager();

export const usePostsQuery = (
  options?: UseQueryOptions<TPost[], Error, TPost[]>,
) => {
  return useQuery<TPost[], Error, TPost[]>(
    ['posts'],
    async () => await db.getAllPosts(),
    {
      ...options,
    },
  );
};
