import { Request, Response, NextFunction, Router } from "express";
import * as ArticleController from '../../controller/articles/article';

export const path = '/article';
export const router = Router();

router.use('/', (req:Request, res:Response, next: NextFunction) => {
    console.log("article 라우터 초기 미들웨어");
    next();
});

router.get('/select', ArticleController.getListArticles);
router.post('/insert', ArticleController.insertArticles);
router.put('/update', ArticleController.updateArticles);
router.delete('/delete', ArticleController.deleteArticles);
router.get('/join', ArticleController.getJoinUser);

export default router;