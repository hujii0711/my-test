import { Request, Response, NextFunction, Router } from 'express';
import * as ArticleController from '../../controller/article/ArticleController';
import { verifyToken } from '../../modules/token';
import { upload } from '../../modules/multer';

export const path = '';
export const router = Router();

router.use('/', (req: Request, res: Response, next: NextFunction) => {
  console.log('<<<<<< article 라우터 초기 미들웨어 >>>>>>');
  next();
});

// /article/list | GET | getArticles | 글목록
// /article/view/:id | GET | getArticle | 글상세
// /article/write | POST | writeArticle | 글쓰기
// /articles/update/:id | PUT | modifyArticle | 글수정
// /articles/delete/:id | DELETE | deleteArticle | 글삭제

router.get('/articles', ArticleController.getArticles); //글목록
router.get('/articles/:id', ArticleController.getArticle); //글상세
router.post('/articles', ArticleController.writeArticle); //글쓰기
router.put('/articles/:id', verifyToken, ArticleController.modifyArticle); //글수정
router.delete('/articles/:id', verifyToken, ArticleController.deleteArticle); //글삭제
router.get('/join', ArticleController.getJoinUser);
router.post('/upload', upload.single('image'), ArticleController.fileUpload);
router.post('/sendEmail', ArticleController.sendEmail);
export default router;

// router.route('/sub') //한개 url로 REST 재활용 [ /test/sub ]
//     .get(TestController.getListTests)
//     .post(TestController.insertTests)
//     .put(TestController.updateTests)
//     .delete(TestController.deleteTests)
