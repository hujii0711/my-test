import { Request, Response, NextFunction, Router } from 'express';
import * as ArticleController from '../../controller/article/ArticleController';
import { verifyToken } from '../../modules/token';
import { upload } from '../../modules/multer';

export const path = '';
export const router = Router();

router.use('/', (req: Request, res: Response, next: NextFunction) => {
  next();
});

router.get('/article', ArticleController.getArticles); //글 목록
router.get('/article/:id', ArticleController.getArticle); //글 상세
router.post('/article/insert', ArticleController.writeArticle); //글 쓰기
router.put('/article/update/:id', verifyToken, ArticleController.modifyArticle); //글 수정
router.delete('/article/delete/:id', verifyToken, ArticleController.deleteArticle); //글 삭제
router.patch('/article/update/lookup', verifyToken, ArticleController.updateArticleLookup); //조회수 증가
router.patch('/article/update/like', verifyToken, ArticleController.updateArticleLike); //like 증가

router.post('/upload', upload.single('image'), ArticleController.fileUpload);
router.post('/sendEmail', ArticleController.sendEmail);

export default router;
