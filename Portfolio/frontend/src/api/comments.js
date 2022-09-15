import client from './client';

export async function getComments(articleId) {
  const response = await client.get(`/articles/${articleId}/comments`);
  return response.data;
}

export async function writeComment(params) {
  const {articleId, message} = params;
  const response = await client.post(`/articles/${articleId}/comments`, {
    message,
  });
  return response.data;
}

export async function modifyComment(params) {
  const {articleId, message, id} = params;
  (await client.put) <
    Comment >
    (`/articles/${articleId}/comments/${id}`, {message});

  const result = {
    id,
    articleId,
    message,
  };
  return result;
}

export async function deleteComment(params) {
  const {articleId, id} = params;
  await client.delete(`/articles/${articleId}/comments/${id}`);
  return null;
}
