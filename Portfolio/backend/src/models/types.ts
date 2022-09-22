export interface UsersAttributes {
  id?: number;
  user_id?: string;
  user_name?: string;
  email?: string;
  password?: string;
  jwt?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface CommentsAttributes {
  id?: number;
  message: string;
  user_id?: string;
  article_ref?: number;
  liked?: number;
  unliked?: number;
  created_at?: Date;
  updated_at?: Date;
}

export interface ArticlesAttributes {
  id?: number;
  title?: string;
  contents?: string;
  user_id?: string;
  user_name?: string;
  lookup?: number;
  liked?: number;
  unliked?: number;
  comment_cnt?: number;
  created_at?: Date;
  updated_at?: Date;
}

export interface TestsAttributes {
  id?: number | null;
  username: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface ChatRoomAttributes {
  id?: string;
  title?: string;
  maxRoom: number;
  password?: string;
  owner_id?: string;
  created_at?: Date;
}

export interface ChatMessageAttributes {
  id?: number | null;
  room_id?: string;
  user_id?: string;
  file_name: string;
  created_at?: Date;
}
