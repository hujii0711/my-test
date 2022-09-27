import client from './client';

// 1. router.get('/comment/:articleRef', CommentController.selectListComment); //댓글 목록
// 2. router.get('/comment/:articleRef/:id', CommentController.selectComment); //댓글 상세
// 3. router.post('/comment/insert/:articleRef', CommentController.insertComment); //댓글 쓰기
// 4. router.put('/comment/update/:id', CommentController.updateComment); //댓글 수정
// 5. router.delete('/comment/delete/:id', CommentController.deleteComment); //댓글 삭제
// 6. router.patch('/comment/update/like', CommentController.updateCommentLike); //댓글 like 증가

/*
  1. Comment 글 목록 | /comment/:articleRef
*/
export async function selectListComment({
  nextOffset = 0,
  prevOffset = 0,
  articleId = 0,
}) {
  const offset = nextOffset + prevOffset;
  const articleRef = articleId;
  const response = await client.get(`/comment/${articleRef}`, {
    params: {offset},
    headers: {returnType: 'list'},
  });
  return response.data;
}

/*
  2. Comment 글 상세 : 신규 | /comment/:articleRef/:id
*/
export async function selectComment(articleRef, commentId) {
  const id = commentId;
  const response = await client.get(`/comment/${articleRef}/${id}`);
  return response.data;
}

/*
  3. Comment 글 쓰기 | /comment/insert/:articleRef
*/
export async function insertComment(params) {
  const {articleRef, message} = params;
  const response = await client.post(`/comment/insert/${articleRef}`, {
    message,
  });
  return response.data;
}

/*
  4. Comment 글 수정 | /comment/update/:id
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
  5. Comment 글 삭제 | /comment/delete/:id
*/
export async function deleteComment(params) {
  const {id} = params;
  await client.delete(`/comment/delete/${id}`);
  return null;
}

/*
  6. Comment 댓글 like 증가 | /comment/update/like
*/
export async function updateCommentLike(id) {
  const config = {headers: {returnType: 'map'}};
  await client.patch('/comment/update/like', {id}, config);
  return null;
}
