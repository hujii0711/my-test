const articleRouter = require("express").Router();
const ArticleController = require("../../controller/article/ArticleController");

articleRouter.use("/article", (req, res, next) => {
  console.log("article 라우터 호출!!!!")
  next();
});

/*
  0. 조회 페이징: selectArticlePagingList | /article/selectArticlePagingList | get
  1. 조회 상세: selectArticle | /article/selectArticle | get
  2. 등록: insertArticle | /article/insertArticle | post
  3. 수정: updateArticle | /article/updateArticle | patch
  4. 삭제: deleteArticle | /article/deleteArticle | delete
  5. 조회수 up: updateArticleLookUpCnt | /article/updateArticleLookUpCnt | patch
  6. 좋아요 up: updateArticleLikeCnt | /article/updateArticleLikeCnt | patch
  7. 싫어요 up: updateArticleUnLikeCnt | /article/updateArticleUnLikeCnt | patch
  8. 댓글 등록: insertArticleComment | /article/insertArticleComment | patch
  9. 댓글 수정: updateArticleComment | /article/updateArticleComment | patch
  10. 댓글 삭제: deleteArticleComment | /article/deleteArticleComment | patch
  11. 댓글 좋아요 up: updateArticleCommentLikeCnt | /article/updateArticleCommentLikeCnt | patch
  12. 댓글 싫어요 up: updateArticleCommentUnLikeCnt | /article/updateArticleCommentUnLikeCnt | patch
*/

articleRouter.get("/article/selectArticlePagingList", ArticleController.selectArticlePagingList);
articleRouter.get("/article/selectArticle", ArticleController.selectArticle);
articleRouter.post("/article/insertArticle", ArticleController.insertArticle);
articleRouter.patch("/article/updateArticle", ArticleController.updateArticle);
articleRouter.delete("/article/deleteArticle", ArticleController.deleteArticle);
articleRouter.patch("/article/updateArticleLookUpCnt", ArticleController.updateArticleLookUpCnt);
articleRouter.patch("/article/updateArticleLikeCnt", ArticleController.updateArticleLikeCnt);
articleRouter.patch("/article/updateArticleUnLikeCnt", ArticleController.updateArticleUnLikeCnt);
articleRouter.patch("/article/insertArticleComment", ArticleController.insertArticleComment);
articleRouter.patch("/article/updateArticleComment", ArticleController.updateArticleComment);
articleRouter.patch("/article/deleteArticleComment", ArticleController.deleteArticleComment);
articleRouter.patch("/article/updateArticleCommentLikeCnt", ArticleController.updateArticleCommentLikeCnt);
articleRouter.patch("/article/updateArticleCommentUnLikeCnt", ArticleController.updateArticleCommentUnLikeCnt);

module.exports.router = articleRouter;
