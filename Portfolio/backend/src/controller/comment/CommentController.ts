import { Request, Response } from 'express';
import * as CommentService from '../../service/comment/CommentService';
import { catchAsync } from '../../modules/error';
import httpStatus from 'http-status';

// /articles/:articleId/comments | GET | getComments | 댓글 목록
export const getComments = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  const articleId = parseInt(req.params.articleId);
  const body = await CommentService.getComments(query, articleId);
  res.json(body).status(httpStatus.OK);
});

// /articles/:articleRef/comments/:commentId | GET | getComment | 댓글 상세
export const getComment = catchAsync(async (req: Request, res: Response) => {
  const articleRef = parseInt(req.params.articleRef);
  const id = parseInt(req.params.commentId);
  const body = await CommentService.getComment(articleRef, id);
  res.json(body).status(httpStatus.OK);
});

// /articles/:articleId/comments | POST | writeComment | 댓글쓰기
export const writeComment = catchAsync(async (req: Request, res: Response) => {
  const { message } = req.body;
  const article_ref = parseInt(req.params.articleId);
  const userInfo = req.user;
  const result = await CommentService.writeComment(message, article_ref, userInfo);
  res.json(result).status(httpStatus.OK);
});

// /articles/:articleId/comments/:id | PUT | modifyComment | 댓글수정
export const modifyComment = catchAsync(async (req: Request, res: Response) => {
  const { message, id } = req.body;
  const result = await CommentService.modifyComment(message, id);
  res.json(result).status(httpStatus.OK);
});

// /articles/:articleId/comments/:id | DELETE | deleteComment | 댓글삭제
export const deleteComment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await CommentService.deleteComment(id);
  res.json(result).status(httpStatus.OK);
});

// /articles/comments/like | PATCH | updateCommentLike | 댓글 like 감소 증가
export const updateCommentLike = catchAsync(async (req: Request, res: Response) => {
  const { id, select } = req.body;
  const result = await CommentService.updateCommentLike(id, select);
  res.json(result).status(httpStatus.OK);
});
