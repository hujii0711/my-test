import client from './client';

/*
  Article 글 목록
  /article
*/
export async function selectListArticle({cursor = 0, prevCursor = 0}) {
  const offset = cursor + prevCursor;
  const response = await client.get('/article', {
    params: {offset},
    headers: {returnType: 'list'},
  });
  return response.data;
}

/*
  Article 글 상세
  /article/:id
*/
export async function selectArticle(id) {
  const response = await client.get(`/article/${id}`, {
    headers: {returnType: 'map'},
  });
  return response.data;
}

/*
  Article 글 쓰기
  /article/insert
*/
export async function insertArticle(params) {
  const config = {headers: {returnType: 'map'}};
  const response = await client.post('/article/insert', params, config);
  return response.data;
}

/*
  Article 글 수정
  /article/update/:id
*/
export async function updateArticle(params) {
  const {id, title, contents} = params;
  const config = {headers: {returnType: 'map'}};
  const response = await client.put(
    `/article/update/${id}`,
    {title, contents},
    config,
  );
  return response.data;
}

/*
  Article 글 삭제
  /article/delete/:id
*/
export async function deleteArticle(id) {
  const config = {headers: {returnType: 'map'}};
  await client.delete(`/article/delete/${id}`, config);
  return null;
}

/*
  Article 글 상세 조회수 증가
  /article/update/lookup
*/
export async function updateArticleLookup(id) {
  const config = {headers: {returnType: 'map'}};
  await client.patch('/article/update/lookup', {id}, config);
  return null;
}

/*
  Article 글 상세 like 증가
  /article/update/like
*/
export async function updateArticleLike(id) {
  const config = {headers: {returnType: 'map'}};
  await client.patch('/article/update/like', {id}, config);
  return null;
}
