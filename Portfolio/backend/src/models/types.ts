export interface UsersAttributes {
  id?: number;
  user_id?: string;
  user_name?: string;
  email?: string;
  password?: string;
  provider?: string;
  confirmed?: boolean;
  blocked?: string;
  jwt?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface CommentsAttributes {
  id?: number;
  message: string;
  user_id?: string;
  articles_ref?: number;
  created_at?: Date;
  updated_at?: Date;
}

export interface ArticlesAttributes {
  id?: number;
  title?: string;
  contents?: string;
  user_id?: string;
  user_name?: string;
  published_at?: Date;
  created_at?: Date;
  updated_at?: Date;
}

export interface TestsAttributes {
  id?: number | null;
  username: string;
  created_at?: Date;
  updated_at?: Date;
}
