import client from './client';

/*
  Comment 글 목록
*/
export async function selectListComment({
  cursor = 0,
  prevCursor = 0,
  articleId = 0,
}) {
  const offset = cursor + prevCursor;
  const response = await client.get(`/articles/${articleId}/comments`, {
    params: {offset},
    headers: {returnType: 'list'},
  });
  return response.data;
}

/*
  Comment 글 상세 : 신규
*/
export async function selectComment(articleRef, commentId) {
  const response = await client.get(
    `/articles/${articleRef}/comments/${commentId}`,
  );
  return response.data;
}

/*
  Comment 글 쓰기
*/
export async function writeComment(params) {
  const {articleRef, message} = params;
  const response = await client.post(`/articles/${articleRef}/comments`, {
    message,
  });
  return response.data;
}

/*
  Comment 글 수정
*/
export async function modifyComment(params) {
  const {message, id} = params;
  await client.put(`/articles/comments/${id}`, {id, message});

  const result = {
    id,
    message,
  };

  return result;
}

/*
  Comment 글 삭제
*/
export async function removeComment(params) {
  const {id} = params;
  await client.delete(`/articles/comments/${id}`);
  return null;
}
