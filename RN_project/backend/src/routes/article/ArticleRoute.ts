import { Request, Response, NextFunction, Router } from "express";
import * as ArticleController from "../../controller/article/ArticleController";
import { verifyToken } from "../../modules/token";

export const path = "";
export const router = Router();

router.use("/", (req: Request, res: Response, next: NextFunction) => {
  console.log("<<<<<< article 라우터 초기 미들웨어 >>>>>>");
  next();
});

// /articles | GET | getArticles | 글목록
// /articles/:id | GET | getArticle | 글상세
// /articles | POST | writeArticle | 글쓰기
// /articles/:id | PUT | modifyArticle | 글수정
// /articles/:id | DELETE | deleteArticle | 글삭제

router.get("/articles", verifyToken, ArticleController.getArticles); //글목록
router.get("/articles/:id", verifyToken, ArticleController.getArticle); //글상세
router.post("/articles", verifyToken, ArticleController.writeArticle); //글쓰기
router.put("/articles/:id", verifyToken, ArticleController.modifyArticle); //글수정
router.delete("/articles/:id", verifyToken, ArticleController.deleteArticle); //글삭제
router.get("/join", ArticleController.getJoinUser);

export default router;
