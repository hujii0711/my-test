import {AxiosError} from 'axios';

export interface User {
  id: number;
  user_id: string;
  user_name: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: null | boolean;
  role: number;
  created_at: string;
  updated_at: string;
}

export interface Article {
  id: number;
  user_id: string;
  user_name: string;
  title: string;
  contents: string;
  published_at: string;
  created_at: string;
  updated_at: string;
}

export interface Comment {
  id: number;
  user_id?: string;
  user_name?: string;
  message?: string;
  published_at?: string;
  created_at?: string;
  updated_at?: string;
  articleId?: number;
}

export interface AuthResult {
  jwt: string;
  user: User;
}

type AuthErrorData = {
  messages: {
    id: string;
    message: string;
  }[];
}[];

export type AuthError = AxiosError<{
  statusCode: number;
  error: string;
  message: AuthErrorData;
  data: AuthErrorData;
}>;
