const articleRouter = require("express").Router();
const ArticleController = require("../../controller/article/ArticleController");

articleRouter.use("/article", (req, res, next) => {
  console.log("article 라우터 호출!!!!");
  console.log("auth >>>> req======", req);
  next();
});

/*
  1. 조회 페이징: selectArticlePagingList | /article/selectArticlePagingList | get
  2. 조회 상세: selectArticle | /article/selectArticle | get
  3. 등록: insertArticle | /article/insertArticle | post
  4. 수정: updateArticle | /article/updateArticle | patch
  5. 삭제: deleteArticle | /article/deleteArticle | delete
  6. 조회수 up: updateArticleLookUpCnt | /article/updateArticleLookUpCnt | patch
  7. 좋아요 싫어요 up, down: updateArticleLikeUpDown | /article/updateArticleLikeUpDown | patch
  8. 댓글 등록: insertArticleComment | /article/insertArticleComment | patch
  9. 댓글 수정: updateArticleComment | /article/updateArticleComment | patch
  10. 댓글 삭제: deleteArticleComment | /article/deleteArticleComment | patch
  11. 댓글 좋아요 싫어요 up, down: updateArticleCommentLikeUpDown | /article/updateArticleCommentLikeUpDown | patch
*/

articleRouter.get(
  "/article/selectArticlePagingList",
  ArticleController.selectArticlePagingList
);
articleRouter.get("/article/selectArticle", ArticleController.selectArticle);
articleRouter.post("/article/insertArticle", ArticleController.insertArticle);
articleRouter.patch("/article/updateArticle", ArticleController.updateArticle);
articleRouter.delete("/article/deleteArticle", ArticleController.deleteArticle);
articleRouter.patch(
  "/article/updateArticleLookUpCnt",
  ArticleController.updateArticleLookUpCnt
);
articleRouter.patch(
  "/article/updateArticleLikeUpDown",
  ArticleController.updateArticleLikeUpDown
);
articleRouter.patch(
  "/article/insertArticleComment",
  ArticleController.insertArticleComment
);
articleRouter.patch(
  "/article/updateArticleComment",
  ArticleController.updateArticleComment
);
articleRouter.patch(
  "/article/deleteArticleComment",
  ArticleController.deleteArticleComment
);
articleRouter.patch(
  "/article/updateArticleCommentLikeUpDown",
  ArticleController.updateArticleCommentLikeUpDown
);

module.exports.router = articleRouter;
