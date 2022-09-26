import client from './client';

/*
  Comment 글 목록
  /comment/:articleRef
*/
export async function selectListComment({
  cursor = 0,
  prevCursor = 0,
  articleId = 0,
}) {
  const offset = cursor + prevCursor;
  const articleRef = articleId;
  const response = await client.get(`/comment/${articleRef}`, {
    params: {offset},
    headers: {returnType: 'list'},
  });
  return response.data;
}

/*
  Comment 글 상세 : 신규
  /comment/:articleRef/:id
*/
export async function selectComment(articleRef, commentId) {
  const id = commentId;
  const response = await client.get(`/comment/${articleRef}/${id}`);
  return response.data;
}

/*
  Comment 글 쓰기
  /comment/insert/:articleRef
*/
export async function insertComment(params) {
  const {articleRef, message} = params;
  const response = await client.post(`/comment/insert/${articleRef}`, {
    message,
  });
  return response.data;
}

/*
  Comment 글 수정
  /comment/update/:id
*/
export async function updateComment(params) {
  const {message, id} = params;
  await client.put(`/comment/update/${id}`, {id, message});

  const result = {
    id,
    message,
  };

  return result;
}

/*
  Comment 글 삭제
  /comment/delete/:id
*/
export async function deleteComment(params) {
  const {id} = params;
  await client.delete(`/comment/delete/${id}`);
  return null;
}

/*
  Comment 댓글 like 증가
  /comment/update/like
*/
export async function updateCommentLike(id) {
  const config = {headers: {returnType: 'map'}};
  await client.patch('/comment/update/like', {id}, config);
  return null;
}
