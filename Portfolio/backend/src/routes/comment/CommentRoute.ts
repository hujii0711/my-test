import { Request, Response, NextFunction, Router } from 'express';
import * as CommentController from '../../controller/comment/CommentController';

export const path = '';
export const router = Router();

router.use('/', (req: Request, res: Response, next: NextFunction) => {
  console.log('<<<<<< comments 라우터 초기 미들웨어 >>>>>>');
  next();
});

// /articles/:articleId/comments | GET | getComments | 댓글목록
// /articles/:articleId/comments/:commentId | GET | getComment | 댓글목록
// /articles/:articleId/comments | POST | writeComment | 댓글쓰기
// /articles/:articleId/comments/:id | PUT | modifyComment | 댓글수정
// /articles/:articleId/comments/:id | DELETE | deleteComment | 댓글삭제

router.get('/articles/:articleId/comments', CommentController.getComments); //댓글목록
router.get('/articles/:articleRef/comments/:commentId', CommentController.getComment); //댓글상세
router.post('/articles/:articleId/comments', CommentController.writeComment); //댓글쓰기
router.put('/articles/comments/:id', CommentController.modifyComment); //댓글수정
router.delete('/articles/comments/:id', CommentController.deleteComment); //댓글삭제

export default router;
