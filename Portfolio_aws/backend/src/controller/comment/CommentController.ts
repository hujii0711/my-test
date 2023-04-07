import { Request, Response } from 'express';
import * as CommentService from '../../service/comment/CommentService';
import { catchAsync } from '../../modules/error';
import httpStatus from 'http-status';

// /comment/:articleRef | GET | selectListComment | 댓글 목록
export const selectListComment = catchAsync(async (req: Request, res: Response) => {
  const offset = req.query.offset as unknown as string;
  const articleRef = req.params.articleRef;
  const paramPack = { offset, articleRef };
  const result = await CommentService.selectListComment(paramPack);
  res.json(result).status(httpStatus.OK);
});

// /comment/:articleRef/:id | GET | selectComment | 댓글 상세
export const selectComment = catchAsync(async (req: Request, res: Response) => {
  const articleRef = req.params.articleRef;
  const id = req.params.id;
  const params = { id, articleRef };
  const result = await CommentService.selectComment(params);
  res.json(result).status(httpStatus.OK);
});

// /comment/insert/:articleRef | POST | insertComment | 댓글쓰기
export const insertComment = catchAsync(async (req: Request, res: Response) => {
  const paramPack = { ...req.body, ...req.params };
  const userInfo = req.user;
  const result = await CommentService.insertComment(userInfo, paramPack);
  res.json(result).status(httpStatus.OK);
});

// /comment/update/:id | PUT | updateComment | 댓글수정
export const updateComment = catchAsync(async (req: Request, res: Response) => {
  const body = req.body;
  const result = await CommentService.updateComment(body);
  res.json(result).status(httpStatus.OK);
});

// /comment/delete/:id | DELETE | deleteComment | 댓글삭제
export const deleteComment = catchAsync(async (req: Request, res: Response) => {
  const articleRef = req.params.articleRef;
  const id = req.params.id;
  const params = { id, articleRef };
  const result = await CommentService.deleteComment(params);
  res.json(result).status(httpStatus.OK);
});

// /comment/update/prefer | PATCH | updateCommentPrefer | 댓글 like 감소 증가
export const updateCommentPrefer = catchAsync(async (req: Request, res: Response) => {
  const body = req.body;
  const result = await CommentService.updateCommentPrefer(body);
  res.json(result).status(httpStatus.OK);
});
