import client from './client';
import {Article} from './types';

interface articlesParam {
  cursor?: number;
  prevCursor?: number;
}

export async function getArticles({cursor = 0, prevCursor = 0}: articlesParam) {
  console.log('api > getArticles() > cursor======', cursor);
  console.log('api > getArticles() > prevCursor======', prevCursor);

  const offset = cursor + prevCursor;
  const response = await client.get<Article[]>('/articles', {
    params: {offset},
    headers: {returnType: 'list'},
  });
  return response.data;

  //try {
  //} catch (err) {
  //  console.log('interceptor.response를 통해 요청 응답코드가 200이 아니면 catch문을 타게됨!!!');
  //  return [];
  //return errorCallbackList(err);
  //}

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
  const response = await client.get<Article>(`/articles/${id}`, {
    headers: {returnType: 'map'},
  });
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
  const config = {headers: {returnType: 'map'}};
  const response = await client.post<Article>('/articles', params, config);
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
  const config = {headers: {returnType: 'map'}};
  const response = await client.put<Article>(`/articles/${id}`, {title, contents}, config);
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
  const config = {headers: {returnType: 'map'}};
  await client.delete<Article>(`/articles/${id}`, config);
  return null; // 응답 결과가 없기 때문에 null 반환
}
