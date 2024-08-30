// Represents a user stored in the SQLite database.
export interface UserDTO {
  id: number;
  username: string;
  email: string;

  posts?: TPost[];
}

// Represents a post stored in the SQLite database.
export interface TPost {
  id: number;
  user_id: number;
  content: string;
  created_at: string;
  poster: string;

  comments?: TComment[];
}

// Represents a comment stored in the SQLite database.
export type TComment = {
  replies: TComment[];
  id: number;
  text: string;
  user_id: number;
  created_at: string;
  parent_comment_id?: number;
  commenter_username: string;
};
