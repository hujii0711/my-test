import { Request, Response } from 'express';
import * as CommentService from '../../service/comment/CommentService';
import { catchAsync } from '../../modules/error';
import httpStatus from 'http-status';

// /comment/:articleRef | GET | selectListComment | 댓글 목록
export const selectListComment = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  const articleId = parseInt(req.params.articleId);
  const body = await CommentService.selectListComment(query, articleId);
  res.json(body).status(httpStatus.OK);
});

// /comment/:articleRef/:id | GET | selectComment | 댓글 상세
export const selectComment = catchAsync(async (req: Request, res: Response) => {
  const articleRef = parseInt(req.params.articleRef);
  const id = parseInt(req.params.commentId);
  const body = await CommentService.selectComment(articleRef, id);
  res.json(body).status(httpStatus.OK);
});

// /comment/insert/:articleRef | POST | insertComment | 댓글쓰기
export const insertComment = catchAsync(async (req: Request, res: Response) => {
  const { message } = req.body;
  const article_ref = parseInt(req.params.articleId);
  const userInfo = req.user;
  const result = await CommentService.insertComment(message, article_ref, userInfo);
  res.json(result).status(httpStatus.OK);
});

// /comment/update/:id | PUT | updateComment | 댓글수정
export const updateComment = catchAsync(async (req: Request, res: Response) => {
  const { message, id } = req.body;
  const result = await CommentService.updateComment(message, id);
  res.json(result).status(httpStatus.OK);
});

// /comment/delete/:id | DELETE | deleteComment | 댓글삭제
export const deleteComment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await CommentService.deleteComment(id);
  res.json(result).status(httpStatus.OK);
});

// /comment/update/prefer | PATCH | updateCommentPrefer | 댓글 like 감소 증가
export const updateCommentPrefer = catchAsync(async (req: Request, res: Response) => {
  const { id, type } = req.body;
  const result = await CommentService.updateCommentPrefer(id, type);
  res.json(result).status(httpStatus.OK);
});
