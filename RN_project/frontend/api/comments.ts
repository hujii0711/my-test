import client from './client';
import {Comment} from './types';

export async function getComments(articleId: number) {
  const response = await client.get<Comment[]>(`/articles/${articleId}/comments`);
  return response.data;
  // const data = response.data.resp;
  // const result = data.reduce((acc, cur) => {
  //   const obj = {
  //     id: cur.id,
  //     message: cur.message,
  //     articles_ref: cur.articles_ref,
  //     created_at: cur.created_at,
  //     updated_at: cur.updated_at,
  //     user: {
  //       user_name: cur.user_name,
  //       user_id: cur.user_id,
  //     },
  //   };
  //   acc.push(obj);
  //   return acc;
  // }, []);
}

export async function writeComment(params: {articleId: number; message: string}) {
  const {articleId, message} = params;
  const response = await client.post<Comment>(`/articles/${articleId}/comments`, {message});
  return response.data;
  // const data = response.data.resp;

  // const result = {
  //   id: data.id,
  //   message: data.message,
  //   created_at: data.created_at,
  //   user: {
  //     user_id: data.user_id,
  //   },
  // };
}

export async function modifyComment(params: {articleId: number; message: string; id: number}) {
  const {articleId, message, id} = params;
  await client.put<Comment>(`/articles/${articleId}/comments/${id}`, {message});

  const result = {
    id,
    articleId,
    message,
  };
  return result;
}

export async function deleteComment(params: {articleId: number; id: number}) {
  const {articleId, id} = params;
  await client.delete(`/articles/${articleId}/comments/${id}`);
  return null;
}
