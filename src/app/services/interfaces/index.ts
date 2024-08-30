import {TComment, UserDTO} from 'src/app/types';

interface IDatabaseManager {
  initializeDB(): Promise<void>;
  createTables(): Promise<void>;
  registerUser(username: string, email: string): Promise<void>;
  isDBInitialized(): boolean;
  clearAllData(): Promise<void>;
  getNestedCommentsByPost(postId: number, page: number): Promise<TComment[]>;
  getAllUsers(): Promise<UserDTO[]>;
  addPostToUser(username: string, postContent: string): Promise<void>;
  addCommentToPost(
    postId: number | string,
    comment: TComment,
    commenterUsername: string,
  ): Promise<void>;
  replyToComment(
    postId: number | string,
    commenter_username: string,
    parentCommentId: number | string,
    reply: TComment,
  ): Promise<void>;
  findUser(username: string, email: string): Promise<boolean>;
}

interface ISecureStorageService {
  setItem(key: string, value: string): Promise<void>;
  getItem(key: string): Promise<string | null>;
  removeItem(key: string): Promise<void>;
  resetStorage(): Promise<void>;
  containsItem(key: string): Promise<boolean | null>;
}

export type {IDatabaseManager, ISecureStorageService};
