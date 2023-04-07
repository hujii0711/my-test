const ArticleService = require("../../service/article/ArticleService");
const { catchAsync } = require("../../modules/error");
const httpStatus = require("http-status");

/********************************** 
 0. 조회 페이징
**********************************/
exports.selectArticlePagingList = catchAsync(async (req, res) => {
  const query = req.query;
  const result = await ArticleService.selectArticlePagingList(query);
  res.json(result).status(httpStatus.OK);
});

/********************************** 
 1. 조회 상세
**********************************/
exports.selectArticle = catchAsync(async (req, res) => {
  const query = req.query;
  const result = await ArticleService.selectArticle(query);
  res.json(result).status(httpStatus.OK);
});

/********************************** 
 2. 등록
**********************************/
exports.insertArticle = catchAsync(async (req, res) => {
  const body = req.body;
  const result = await ArticleService.insertArticle(body);
  res.json(result).status(httpStatus.OK);
});

/********************************** 
 3. 수정
**********************************/
exports.updateArticle = catchAsync(async (req, res) => {
  const body = req.body;
  const result = await ArticleService.updateArticle(body);
  res.json(result).status(httpStatus.OK);
});

/********************************** 
 4. 삭제
**********************************/
exports.deleteArticle = catchAsync(async (req, res) => {
  const body = req.body;
  const result = await ArticleService.deleteArticle(body);
  res.json(result).status(httpStatus.OK);
});

/********************************** 
 5. 조회수 up
**********************************/
exports.updateArticleLookUpCnt = catchAsync(async (req, res) => {
  const body = req.body;
  const result = await ArticleService.updateArticleLookUpCnt(body);
  res.json(result).status(httpStatus.OK);
});

/********************************** 
 6. 좋아요 up
**********************************/
exports.updateArticleLikeCnt = catchAsync(async (req, res) => {
  const body = req.body;
  const result = await ArticleService.updateArticleLikeCnt(body);
  res.json(result).status(httpStatus.OK);
});

/********************************** 
 7. 싫어요 up
**********************************/
exports.updateArticleUnLikeCnt = catchAsync(async (req, res) => {
  const body = req.body;
  const result = await ArticleService.updateArticleUnLikeCnt(body);
  res.json(result).status(httpStatus.OK);
});

/********************************** 
 8. 댓글 등록 (실질 update)
**********************************/
exports.insertArticleComment = catchAsync(async (req, res) => {
  const body = req.body;
  const result = await ArticleService.insertArticleComment(body);
  res.json(result).status(httpStatus.OK);
});

/********************************** 
 9. 댓글 수정 (실질 update)
**********************************/
exports.updateArticleComment = catchAsync(async (req, res) => {
  const body = req.body;
  const result = await ArticleService.updateArticleComment(body);
  res.json(result).status(httpStatus.OK);
});

/********************************** 
 10. 댓글 삭제 (실질 update)
**********************************/
exports.deleteArticleComment = catchAsync(async (req, res) => {
  const body = req.body;
  const result = await ArticleService.deleteArticleComment(body);
  res.json(result).status(httpStatus.OK);
});

/********************************** 
 11. 댓글 좋아요 up (실질 update)
**********************************/
exports.updateArticleCommentLikeCnt = catchAsync(async (req, res) => {
  const body = req.body;
  const result = await ArticleService.updateArticleCommentLikeCnt(body);
  res.json(result).status(httpStatus.OK);
});

/********************************** 
 12. 댓글 싫어요 up (실질 update)
**********************************/
exports.updateArticleCommentUnLikeCnt = catchAsync(async (req, res) => {
  const body = req.body;
  const result = await ArticleService.updateArticleCommentUnLikeCnt(body);
  res.json(result).status(httpStatus.OK);
});
