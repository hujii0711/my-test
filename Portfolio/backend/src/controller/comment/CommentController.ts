import { Request, Response } from 'express';
import * as CommentService from '../../service/comment/CommentService';
import { catchAsync } from '../../modules/error';
import httpStatus from 'http-status';

// /articles/:articleId/comments | GET | getComments | 댓글상세
export const getComments = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  const articleId = parseInt(req.params.articleId);
  console.log('req.query=====', req.query);
  console.log('req.params=====', req.params);
  const body = await CommentService.getComments(query, articleId);
  res.json(body).status(httpStatus.OK);
});

export const getComment = catchAsync(async (req: Request, res: Response) => {
  const articleRef = parseInt(req.params.articleId);
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
  const { message } = req.body;
  const { articleId, id } = req.params;
  const result = await CommentService.modifyComment(message, articleId, id);
  res.json(result).status(httpStatus.OK);
});

// /articles/:articleId/comments/:id | DELETE | deleteComment | 댓글삭제
export const deleteComment = catchAsync(async (req: Request, res: Response) => {
  const { articleId, id } = req.params;
  const result = await CommentService.deleteComment(articleId, id);
  res.json(result).status(httpStatus.OK);
});
