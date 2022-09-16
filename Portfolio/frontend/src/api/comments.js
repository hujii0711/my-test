import client from './client';

/*
  Comment 글 목록
*/
export async function selectListComment(articleId) {
  const response = await client.get(`/articles/${articleId}/comments`);
  return response.data;
}

/*
  Comment 글 상세 : 신규
*/
export async function selectComment(articleId, commentId) {
  const response = await client.get(
    `/articles/${articleId}/comments/${commentId}`,
  );
  return response.data;
}

/*
  Comment 글 쓰기
*/
export async function writeComment(params) {
  const {articleId, message} = params;
  const response = await client.post(`/articles/${articleId}/comments`, {
    message,
  });
  return response.data;
}

/*
  Comment 글 수정
*/
export async function modifyComment(params) {
  const {articleId, message, id} = params;

  await client.put(`/articles/${articleId}/comments/${id}`, {message});

  const result = {
    id,
    articleId,
    message,
  };
  return result;
}

/*
  Comment 글 삭제
*/
export async function removeComment(params) {
  const {articleId, id} = params;
  await client.delete(`/articles/${articleId}/comments/${id}`);
  return null;
}
