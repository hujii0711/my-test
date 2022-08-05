import client from './client';
import {Article} from './types';

interface articlesParam {
  limit?: number;
  cursor?: number;
  prevCursor?: number;
}

export async function getArticles({limit = 10, cursor, prevCursor}: articlesParam) {
  //limit = 10, cursor, prevCursor 초기값 undefined
  //console.log('limit======', limit);
  //console.log('cursor======', cursor);
  //console.log('prevCursor======', prevCursor);

  const response = await client.get<Article[]>('/articles', {
    params: {_limit: limit, id_lt: cursor, id_gt: prevCursor},
  });
  return response.data;
  //const data = response.data.resp;

  // const result = data.reduce((acc, cur) => {
  //   const sub = {
  //     id: cur.id,
  //     title: cur.title,
  //     contents: cur.contents,
  //     published_at: cur.published_at,
  //     user: {
  //       user_name: cur.user_name,
  //       user_id: cur.user_id,
  //     },
  //   };
  //   acc.push(sub);
  //   return acc;
  // }, []);
}

export async function getArticle(id: number) {
  const response = await client.get<Article>(`/articles/${id}`);
  return response.data;
  // const data = response.data.resp;
  // const result = {
  //   id: data[0].id,
  //   title: data[0].title,
  //   contents: data[0].contents,
  //   published_at: data[0].published_at,
  //   user: {
  //     user_name: data[0].user_name,
  //     user_id: data[0].user_id,
  //   },
  // };
}

export async function writeArticle(params: {title: string; contents: string}) {
  const response = await client.post<Article>('/articles', params);
  return response.data;
  // const data = response.data.resp;
  // const result = {
  //   id: data.id,
  //   title: data.title,
  //   contents: data.contents,
  //   published_at: data.published_at,
  //   user: {
  //     user_name: data.user_name,
  //     user_id: data.user_id,
  //   },
  // };
}

export async function modifyArticle(params: {id: number; title: string; contents: string}) {
  const {id, title, contents} = params;
  const response = await client.put<Article>(`/articles/${id}`, {title, contents});
  return response.data;
  // const data = response.data;
  // const result = {
  //   id,
  //   title,
  //   contents: body,
  //   user: {
  //     user_name: data.user_name,
  //     user_id: data.user_id,
  //   },
  // };
}

export async function deleteArticle(id: number) {
  await client.delete<Article>(`/articles/${id}`);
  return null; // 응답 결과가 없기 때문에 null 반환
}
