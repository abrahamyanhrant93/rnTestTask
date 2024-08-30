import SQLite from 'react-native-sqlite-storage';
import {TComment, TPost, UserDTO} from 'src/app/types';
import {IDatabaseManager} from '../../interfaces';

SQLite.enablePromise(true);

class DatabaseManager implements IDatabaseManager {
  private db: SQLite.SQLiteDatabase | null = null;
  private initialized = false;

  constructor() {
    this.initializeDB();
  }

  public async dropTables(): Promise<void> {
    if (!this.db) {
      console.error('Database not initialized');
      return;
    }

    const queries = [
      'DROP TABLE IF EXISTS users',
      'DROP TABLE IF EXISTS posts',
      'DROP TABLE IF EXISTS comments',
    ];

    try {
      for (const query of queries) {
        await this.db.executeSql(query);
      }
    } catch (error) {
      console.error('Error dropping tables:', error);
    }
  }

  public async createTables(): Promise<void> {
    const createUsersTable = `CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      email TEXT UNIQUE NOT NULL
    )`;

    const createPostsTable = `CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      poster TEXT,
      content TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )`;

    const createCommentsTable = `CREATE TABLE IF NOT EXISTS comments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      commenter_username TEXT,
      post_id INTEGER,
      parent_comment_id INTEGER,
      user_id INTEGER,
      text TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (post_id) REFERENCES posts(id),
      FOREIGN KEY (parent_comment_id) REFERENCES comments(id),
      FOREIGN KEY (user_id) REFERENCES users(id)
      FOREIGN KEY (commenter_username) REFERENCES users(username)
    )`;

    try {
      await this.db?.executeSql(createUsersTable);
      await this.db?.executeSql(createPostsTable);
      await this.db?.executeSql(createCommentsTable);
    } catch (error) {
      console.error('Error creating tables:', error);
    }
  }

  public async getNestedCommentsByPost(
    postId: number,
    page = 0,
  ): Promise<TComment[]> {
    const limit = 25;
    const offset = page * limit;

    const query = `SELECT * FROM comments WHERE post_id = ? ORDER BY created_at ASC LIMIT ? OFFSET ?`;
    const [results] = (await this.db?.executeSql(query, [
      postId,
      limit,
      offset,
    ])) ?? [null];
    if (!results) return [];

    const commentsArray = results.rows.raw() as TComment[];

    const commentsMap = new Map<number, TComment>();
    commentsArray.forEach(comment => commentsMap.set(comment.id, comment));

    const nestedComments: TComment[] = [];
    commentsArray.forEach(comment => {
      if (comment.parent_comment_id && comment.parent_comment_id !== postId) {
        const parent = commentsMap.get(comment.parent_comment_id);
        if (parent) {
          if (!parent.replies) {
            parent.replies = [];
          }
          parent.replies.push(comment);
        }
      } else {
        nestedComments.push(comment);
      }
    });

    return nestedComments;
  }

  public async addPost(post: TPost): Promise<void> {
    if (!this.db) {
      console.error('Database not initialized in addPost method');
      return;
    }

    const query =
      'INSERT INTO posts (id, user_id, poster, content, created_at) VALUES (?, ?, ?, ?, ?)';

    try {
      await this.db.executeSql(query, [
        post.id,
        post.user_id,
        post.poster,
        post.content,
        post.created_at,
      ]);
    } catch (error) {
      console.error('Error adding post:', error);
    }
  }

  public async addCommentToPost(
    postId: number | string,
    comment: TComment,
    commenterUsername: string,
  ): Promise<void> {
    if (!this.db) {
      console.error('Database not initialized in addCommentToPost method');
      return;
    }

    try {
      await this.db.transaction(async tx => {
        await tx.executeSql(
          'INSERT INTO comments (post_id, commenter_username, parent_comment_id, user_id, text) VALUES (?, ?, ?, ?, ?)',
          [
            postId,
            commenterUsername,
            comment.parent_comment_id,
            comment.user_id,
            comment.text,
          ],
        );
      });
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  }

  public async replyToComment(
    postId: number | string,
    commenter_username: string,
    parentCommentId: number | string,
    reply: TComment,
  ): Promise<void> {
    if (!this.db) {
      console.error('Database not initialized in replyToComment method');
      return;
    }

    try {
      await this.db.transaction(async tx => {
        // Insert the reply into the comments table with a reference to the parent comment
        await tx.executeSql(
          'INSERT INTO comments (post_id, commenter_username, parent_comment_id, user_id, text) VALUES (?, ?, ?, ?, ?)',
          [
            postId,
            commenter_username,
            parentCommentId,
            reply.user_id,
            reply.text,
          ],
        );
      });
    } catch (error) {
      console.error('Error adding reply:', error);
    }
  }

  public async initializeDB(): Promise<void> {
    if (this.initialized) return;

    try {
      this.db = await SQLite.openDatabase(
        {
          name: 'app.db',
          location: 'default',
        },
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        () => {},
        error => {
          console.error('Database connection error:', error);
        },
      );
      this.initialized = true;
    } catch (error) {
      console.error('Error initializing database:', error);
    }
  }

  public async registerUser(username: string, email: string): Promise<void> {
    if (!this.db) {
      console.error('Database not initialized in registerUser method');
      return;
    }

    const query = `INSERT INTO users (username, email) VALUES (?, ?)`;

    try {
      await this.db.executeSql(query, [username, email]);
    } catch (error) {
      console.error('Error registering user:', error);
    }
  }

  public async getAllUsers(): Promise<UserDTO[]> {
    if (!this.db) {
      console.error('Database not initialized in getAllUsers method');
      return [];
    }

    const query = 'SELECT * FROM users';
    return new Promise<UserDTO[]>((resolve, reject) => {
      this.db?.transaction(txn => {
        txn.executeSql(
          query,
          [],
          (_, results) => {
            const users: UserDTO[] = [];
            for (let i = 0; i < results.rows.length; i++) {
              users.push(results.rows.item(i));
            }
            resolve(users);
          },
          (_, error) => {
            console.error('Error fetching users:', error);
            reject(error);
          },
        );
      });
    });
  }

  public async getAllPosts(): Promise<TPost[]> {
    if (!this.db) {
      console.error('Database not initialized in getAllPosts method');
      return [];
    }

    const query = 'SELECT * FROM posts';
    return new Promise<TPost[]>((resolve, reject) => {
      this.db?.transaction(txn => {
        txn.executeSql(
          query,
          [],
          (_, results) => {
            const posts: TPost[] = [];
            for (let i = 0; i < results.rows.length; i++) {
              posts.push(results.rows.item(i));
            }
            resolve(posts);
          },
          (_, error) => {
            console.error('Error fetching users:', error);
            reject(error);
          },
        );
      });
    });
  }

  public async addPostToUser(
    username: string,
    postContent: string,
  ): Promise<void> {
    if (!this.db) {
      console.error('Database not initialized in addPostToUser method');
      throw new Error('Database not initialized');
    }

    try {
      // Start a transaction to ensure atomicity
      await this.db.transaction(async tx => {
        // Retrieve the user ID based on the username
        const userIdQuery = 'SELECT id FROM users WHERE username = ?';
        const [_, userIdResult] = await tx.executeSql(userIdQuery, [username]);

        if (userIdResult.rows.length === 0) {
          throw new Error('User not found');
        }

        const userId = userIdResult.rows.item(0).id;

        // Insert the new post
        const insertPostQuery =
          'INSERT INTO posts (username, content) VALUES (?, ?)';
        await tx.executeSql(insertPostQuery, [userId, postContent]);
      });
    } catch (error) {
      console.error('Error adding post to user:', error);
      throw error;
    }
  }

  public async clearAllData(): Promise<void> {
    const query = 'DELETE FROM users';
    try {
      await this.db?.executeSql(query);
    } catch (error) {
      console.error('Error clearing data:', error);
    }
  }

  public async findUser(username: string, email: string): Promise<boolean> {
    if (!this.db) {
      console.error('Database not initialized in findUser method');
      return false;
    }

    const query = 'SELECT * FROM users WHERE username = ? AND email = ?';
    return new Promise<boolean>((resolve, reject) => {
      this.db?.transaction(txn => {
        txn.executeSql(
          query,
          [username, email],
          (_, results) => {
            const userExists: boolean = results.rows.length > 0;

            resolve(userExists);
          },
          (_, error) => {
            console.error('Error finding user:', error);
            reject(error);
          },
        );
      });
    });
  }

  public isDBInitialized(): boolean {
    return this.initialized;
  }
}

export default DatabaseManager;
