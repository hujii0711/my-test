import client from './client';

export async function getArticles({cursor = 0, prevCursor = 0}) {
  const offset = cursor + prevCursor;
  const response = await client.get('/articles', {
    params: {offset},
    headers: {returnType: 'list'},
  });
  return response.data;
}

export async function getArticle(id) {
  const response = await client.get(`/articles/${id}`, {
    headers: {returnType: 'map'},
  });
  return response.data;
}

export async function writeArticle(params) {
  const config = {headers: {returnType: 'map'}};
  const response = await client.post('/articles', params, config);
  return response.data;
}

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

export async function deleteArticle(id) {
  const config = {headers: {returnType: 'map'}};
  await client.delete(`/articles/${id}`, config);
  return null;
}
