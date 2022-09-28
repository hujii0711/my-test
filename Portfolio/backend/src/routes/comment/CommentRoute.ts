import { Request, Response, NextFunction, Router } from 'express';
import * as CommentController from '../../controller/comment/CommentController';

export const path = '';
export const router = Router();

router.use('/', (req: Request, res: Response, next: NextFunction) => {
  next();
});

router.get('/comment/:articleRef', CommentController.selectListComment); //댓글 목록
router.get('/comment/:articleRef/:id', CommentController.selectComment); //댓글 상세
router.post('/comment/insert/:articleRef', CommentController.insertComment); //댓글 쓰기
router.put('/comment/update/:id', CommentController.updateComment); //댓글 수정
router.delete('/comment/delete/:id', CommentController.deleteComment); //댓글 삭제
router.patch('/comment/update/prefer', CommentController.updateCommentPrefer); //댓글 like 감소 증가
export default router;
