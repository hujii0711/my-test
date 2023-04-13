//import client from './client';
/*
  1. 조회 페이징: selectArticlePagingList | /article/selectArticlePagingList | get
  2. 조회 상세: selectArticle | /article/selectArticle | get
  3. 등록: insertArticle | /article/insertArticle | post
  4. 수정: updateArticle | /article/updateArticle | patch
  5. 삭제: deleteArticle | /article/deleteArticle | delete
  6. 조회수 up: updateArticleLookUpCnt | /article/updateArticleLookUpCnt | patch
  7. 좋아요 up: updateArticleLikeCnt | /article/updateArticleLikeCnt | patch
  8. 싫어요 up: updateArticleUnLikeCnt | /article/updateArticleUnLikeCnt | patch
  9. 댓글 등록: insertArticleComment | /article/insertArticleComment | patch
  10. 댓글 수정: updateArticleComment | /article/updateArticleComment | patch
  11. 댓글 삭제: deleteArticleComment | /article/deleteArticleComment | patch
  12. 댓글 좋아요 up: updateArticleCommentLikeCnt | /article/updateArticleCommentLikeCnt | patch
  13. 댓글 싫어요 up: updateArticleCommentUnLikeCnt | /article/updateArticleCommentUnLikeCnt | patch
*/

import axios from 'axios';

const baseURL =
  'https://ies21c23jl.execute-api.ap-northeast-2.amazonaws.com/dev';
const client = axios.create({
  baseURL,
  timeout: 30 * 1000,
});

/*
  1. 조회 페이징: selectArticlePagingList | /article/selectArticlePagingList | get
*/
export async function selectArticlePagingList({
  nextCreatedDt = '1',
  prevCreatedDt = '1',
}) {
  const createdDt = nextCreatedDt;
  const response = await client.get('/article/selectArticlePagingList', {
    params: {createdDt},
  });
  return response.data.Items;
}

/*
  2. 조회 상세: selectArticle | /article/selectArticle | get
*/
export async function selectArticle(id) {
  const response = await client.get('/article/selectArticle', {
    params: {id},
  });
  return response.data.Items[0];
}

/*
  3. 등록: insertArticle | /article/insertArticle | post
*/
export async function insertArticle(params) {
  const {title, contents} = params;
  const response = await client.post('/article/insertArticle', {
    title,
    contents,
  });
  return response.data;
}

/*
  4. 수정: updateArticle | /article/updateArticle | patch
*/
export async function updateArticle(params) {
  const {createdDt, title, contents} = params;
  const response = await client.patch('/article/updateArticle/', {
    createdDt,
    title,
    contents,
  });
  console.log('updateArticle >>>>>> response=========', response);
  return response.data;
}

/*
  5. 삭제: deleteArticle | /article/deleteArticle | delete
*/
export async function deleteArticle(createdDt) {
  // query, path 방식으로 보낼 때
  //await client.delete(`/article/deleteArticle/${aaa}`, {
  //  params: {createdDt},
  //});
  // body로 보낼 때
  await client.delete('/article/deleteArticle', {
    data: {createdDt},
  });
  return null;
}

/*
  6. 조회수 up: updateArticleLookUpCnt | /article/updateArticleLookUpCnt | patch
*/
export async function updateArticleLookUpCnt(createdDt) {
  await client.patch('/article/updateArticleLookUpCnt', {createdDt});
  return null;
}

/*
  7. 좋아요 싫어요 up, down: updateArticleLikeUpDown | /article/updateArticleLikeUpDown | patch // 좋아요 싫어요 하나로 묶은거 같음
*/
export async function updateArticleLikeUpDown(createdDt, type) {
  await client.patch('/article/updateArticleLikeUpDown', {createdDt, type});
  return null;
}

/*
  8. 댓글 등록: insertArticleComment | /article/insertArticleComment | patch
*/
export async function insertArticleComment(params) {
  const {articleCreatedDt, commentBody} = params;
  await client.patch('/article/insertArticleComment', {
    articleCreatedDt,
    commentBody,
  });
  return null;
}

/*
  9. 댓글 수정: updateArticleComment | /article/updateArticleComment | patch
*/
export async function updateArticleComment(params) {
  const {articleCreatedDt, commentBody} = params;
  await client.patch('/article/updateArticleComment', {
    articleCreatedDt,
    commentBody,
  });
  return null;
}

/*
  10. 댓글 삭제: deleteArticleComment | /article/deleteArticleComment | patch
*/
export async function deleteArticleComment(params) {
  const {articleCreatedDt, commentBody} = params;
  await client.patch('/article/deleteArticleComment', {
    articleCreatedDt,
    commentBody,
  });
  return null;
}

/*
  11. 댓글 좋아요 싫어요 up, down: updateArticleCommentLikeUpDown | /article/updateArticleCommentLikeUpDown | patch
*/
export async function updateArticleCommentLikeUpDown(params) {
  const {articleCreatedDt, commentBody} = params;
  await client.patch('/article/updateArticleCommentLikeUpDown', {
    articleCreatedDt,
    commentBody,
  });
  return null;
}
