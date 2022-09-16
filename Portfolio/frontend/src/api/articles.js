import client from './client';

/*
  Article 글 목록
*/
export async function selectListArticle({cursor = 0, prevCursor = 0}) {
  const offset = cursor + prevCursor;
  const response = await client.get('/articles', {
    params: {offset},
    headers: {returnType: 'list'},
  });
  return response.data;
}

/*
  Article 글 상세
*/
export async function selectArticle(id) {
  const response = await client.get(`/articles/${id}`, {
    headers: {returnType: 'map'},
  });
  return response.data;
}

/*
  Article 글 쓰기
*/
export async function writeArticle(params) {
  const config = {headers: {returnType: 'map'}};
  const response = await client.post('/articles', params, config);
  return response.data;
}

/*
  Article 글 수정
*/
export async function modifyArticle(params) {
  const {id, title, contents} = params;
  const config = {headers: {returnType: 'map'}};
  const response = await client.put(
    `/articles/${id}`,
    {title, contents},
    config,
  );
  return response.data;
}

/*
  Article 글 삭제
*/
export async function removeArticle(id) {
  const config = {headers: {returnType: 'map'}};
  await client.delete(`/articles/${id}`, config);
  return null;
}
