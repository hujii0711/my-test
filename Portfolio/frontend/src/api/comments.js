import client from './client';

/*
  Comment 글 목록
*/
export async function selectListComment({
  cursor = 0,
  prevCursor = 0,
  articleId = 6,
}) {
  const offset = cursor + prevCursor;
  //console.log('selectListComment >>>>> articleId =====', articleId);
  const response = await client.get(`/articles/6/comments`, {
    params: {offset},
    headers: {returnType: 'list'},
  });
  //console.log('selectListComment >>>>> response =====', response.data);
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
  const articleRef = 6;
  const response = await client.post(`/articles/${articleRef}/comments`, {
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
