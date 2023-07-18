import client from './client';
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

/********************************** 
  1. 조회 페이징: selectArticlePagingList | /article/selectArticlePagingList | get
  export async function selectArticlePagingList({nextCreatedDt = '1',prevCreatedDt = '1',}) {}
**********************************/
export const selectArticlePagingList = async ({
  nextCreatedDt = '1',
  prevCreatedDt = '1',
}) => {
  const createdDt = nextCreatedDt;
  const response = await client.get('/article/selectArticlePagingList', {
    params: {createdDt},
  });
  return response?.data?.Items;
};

/********************************** 
  2. 조회 상세: selectArticle | /article/selectArticle | get
**********************************/
export const selectArticle = async id => {
  const response = await client.get('/article/selectArticle', {
    params: {id},
  });
  console.log(
    'selectArticle >>>> response.data.Items[0]=====',
    typeof response.data.Items[0],
  );
  return response?.data?.Items[0];
};

/**********************************
  3. 등록: insertArticle | /article/insertArticle | post
**********************************/
export const insertArticle = async params => {
  const {title, contents} = params;
  const response = await client.post('/article/insertArticle', {
    title,
    contents,
  });
  return response?.data;
};

/**********************************
  4. 수정: updateArticle | /article/updateArticle | patch
**********************************/
export const updateArticle = async params => {
  const {createdDt, title, contents} = params;
  const response = await client.patch('/article/updateArticle/', {
    createdDt,
    title,
    contents,
  });
  return response?.data;
};

/**********************************
  5. 삭제: deleteArticle | /article/deleteArticle | delete
**********************************/
export const deleteArticle = async createdDt => {
  // query, path 방식으로 보낼 때
  //await client.delete(`/article/deleteArticle/${aaa}`, {
  //  params: {createdDt},
  //});
  // body로 보낼 때
  const response = await client.delete('/article/deleteArticle', {
    data: {createdDt},
  });
  return response;
};

/**********************************
  6. 조회수 up: updateArticleLookUpCnt | /article/updateArticleLookUpCnt | patch
**********************************/
export const updateArticleLookUpCnt = async createdDt => {
  const response = await client.patch('/article/updateArticleLookUpCnt', {
    createdDt,
  });
  return response;
};

/**********************************
  7. 좋아요 싫어요 up, down: updateArticleLikeUpDown | /article/updateArticleLikeUpDown | patch // 좋아요 싫어요 하나로 묶은거 같음
**********************************/
export const updateArticleLikeUpDown = async (createdDt, type) => {
  const response = await client.patch('/article/updateArticleLikeUpDown', {
    createdDt,
    type,
  });
  return response;
};

/**********************************
  8. 댓글 등록: insertArticleComment | /article/insertArticleComment | patch
**********************************/
export const insertArticleComment = async params => {
  const {articleCreatedDt, commentBody} = params;
  const response = await client.patch('/article/insertArticleComment', {
    articleCreatedDt,
    commentBody,
  });
  console.log('insertArticleComment >>>>> response========', response);
  return response?.data;
};

/**********************************
  9. 댓글 수정: updateArticleComment | /article/updateArticleComment | patch
**********************************/
export const updateArticleComment = async params => {
  const {articleCreatedDt, commentBody} = params;
  const response = await client.patch('/article/updateArticleComment', {
    articleCreatedDt,
    commentBody,
  });
  console.log('updateArticleComment >>>>> response========', response);
  return response?.data;
};

/**********************************
  10. 댓글 삭제: deleteArticleComment | /article/deleteArticleComment | patch
**********************************/
export const deleteArticleComment = async params => {
  const {articleCreatedDt, commentBody} = params;
  const response = await client.patch('/article/deleteArticleComment', {
    articleCreatedDt,
    commentBody,
  });
  console.log('deleteArticleComment >>>>> response========', response);
  return response?.data;
};

/**********************************
  11. 댓글 좋아요 싫어요 up, down: updateArticleCommentLikeUpDown | /article/updateArticleCommentLikeUpDown | patch
**********************************/
export const updateArticleCommentLikeUpDown = async params => {
  const {articleCreatedDt, commentBody} = params;
  const response = await client.patch(
    '/article/updateArticleCommentLikeUpDown',
    {
      articleCreatedDt,
      commentBody,
    },
  );
  return response;
};
