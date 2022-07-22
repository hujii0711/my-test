import { Request, Response } from "express";
import * as CommentService from "../../service/comment/CommentService";
import { catchAsync } from "../../modules/error";

// /articles/:articleId/comments | GET | getComments | 댓글상세
export const getComments = catchAsync(async (req: Request, res: Response) => {
  const { articleId } = req.params;
  const body = await CommentService.getComments(articleId);

  res.json({
    code: "success",
    message: "정상적으로 getComments 조회 되었습니다.",
    resp: body,
  });
});

// /articles/:articleId/comments | POST | writeComment | 댓글쓰기
export const writeComment = catchAsync(async (req: Request, res: Response) => {
  const { message } = req.body;
  const article_ref = parseInt(req.params.articleId);
  const userInfo = req.session.userInfo;
  const result = await CommentService.writeComment(message, article_ref, userInfo);

  res.json({
    code: "success",
    message: "정상적으로 writeComment 저장 되었습니다.",
    resp: result,
  });
});

// /articles/:articleId/comments/:id | PUT | modifyComment | 댓글수정
export const modifyComment = catchAsync(async (req: Request, res: Response) => {
  const { message } = req.body;
  const { articleId, id } = req.params;
  const result = await CommentService.modifyComment(message, articleId, id);

  res.json({
    code: "success",
    message: "정상적으로 modifyComment 수정 되었습니다.",
    resp: result,
  });
});

// /articles/:articleId/comments/:id | DELETE | deleteComment | 댓글삭제
export const deleteComment = catchAsync(async (req: Request, res: Response) => {
  const { articleId, id } = req.params;
  const result = await CommentService.deleteComment(articleId, id);

  res.json({
    code: "success",
    message: "정상적으로 deleteComment 삭제 되었습니다.",
    resp: result,
  });
});
