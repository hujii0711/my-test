import { Request, Response, NextFunction, Router } from 'express';
import * as ArticleController from '../../controller/article/ArticleController';
import { upload } from '../../modules/multer';
import { isLoggedIn } from '../../modules/passport/loginCheck';
import cors from 'cors';

export const path = '';
export const router = Router();

router.use('/', (req: Request, res: Response, next: NextFunction) => {
  console.log('Article 모든 라우터!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
  next();
});

router.get('/article', ArticleController.selectListArticle); //글 목록
router.get('/article/:id', ArticleController.selectArticle); //글 상세
router.post('/article/insert', isLoggedIn, ArticleController.insertArticle); //글 쓰기
router.put('/article/update/:id', isLoggedIn, ArticleController.updateArticle); //글 수정
router.delete('/article/delete/:id', isLoggedIn, ArticleController.deleteArticle); //글 삭제
router.patch('/article/update/lookup', ArticleController.updateArticleLookup); //조회수 증가
router.patch('/article/update/prefer', isLoggedIn, ArticleController.updateArticlePrefer); //like 증가 감소
router.get('/article/commentCnt/:articleRef', ArticleController.selectCommentCount); //댓글 개수 조회
router.post('/upload', upload.single('fileUpload'), ArticleController.fileUpload);
//upload.single('avatar') 의 매개변수 'avatar'는 form을 통해 전송되는 파일의 name속성을 가져야 함.

router.post('/sendEmail', ArticleController.sendEmail);

export default router;
