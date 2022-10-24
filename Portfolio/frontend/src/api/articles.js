import client from './client';
// 1. router.get('/article', ArticleController.selectListArticle); //글 목록
// 2. router.get('/article/:id', ArticleController.selectArticle); //글 상세
// 3. router.post('/article/insert', ArticleController.insertArticle); //글 쓰기
// 4. router.put('/article/update/:id', verifyToken, ArticleController.updateArticle); //글 수정
// 5. router.delete('/article/delete/:id', verifyToken, ArticleController.deleteArticle); //글 삭제
// 6. router.patch('/article/update/lookup', verifyToken, ArticleController.updateArticleLookup); //조회수 증가
// 7. router.patch('/article/update/like', verifyToken, ArticleController.updateArticleLike); //like 증가
// 8. router.get('/article/commentCnt/', verifyToken, ArticleController.selectCommentCount); //댓글 개수 조회
// router.post('/upload', upload.single('image'), ArticleController.fileUpload);
// router.post('/sendEmail', ArticleController.sendEmail);

/*
  1. Article 글 목록 | /article
*/
export async function selectListArticle({nextOffset = 0, prevOffset = 0}) {
  const offset = nextOffset + prevOffset;
  const response = await client.get('/article', {
    params: {offset},
    headers: {returnType: 'list'},
  });
  return response.data;
}

/*
  2. Article 글 상세 | /article/:id
*/
export async function selectArticle(id) {
  const response = await client.get(`/article/${id}`, {
    headers: {returnType: 'map'},
  });
  return response.data;
}

/*
  3. Article 글 쓰기 | /article/insert
*/
export async function insertArticle(params) {
  const config = {headers: {returnType: 'map'}};
  const response = await client.post('/article/insert', params, config);
  return response.data;
}

/*
  4. Article 글 수정 | /article/update/:id
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
  5. Article 글 삭제 | /article/delete/:id
*/
export async function deleteArticle(id) {
  const config = {headers: {returnType: 'map'}};
  await client.delete(`/article/delete/${id}`, config);
  return null;
}

/*
  6. Article 글 상세 조회수 증가 | /article/update/lookup
*/
export async function updateArticleLookup(id) {
  const config = {headers: {returnType: 'map'}};
  await client.patch('/article/update/lookup', {id}, config);
  return null;
}

/*
  7. Article 글 상세 like 증가 감소 | /article/update/prefer
*/
export async function updateArticlePrefer(id, type) {
  const config = {headers: {returnType: 'map'}};
  await client.patch('/article/update/prefer', {id, type}, config);
  return null;
}

/*
  8. Article 댓글 개수 조회 | /article/commentCnt
*/
export async function selectCommentCount(articleRef) {
  const config = {headers: {returnType: 'map'}};
  const response = await client.get(
    `/article/commentCnt/${articleRef}`,
    config,
  );
  return response.data;
}
