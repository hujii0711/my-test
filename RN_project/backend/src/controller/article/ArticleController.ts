import { NextFunction, Request, Response } from 'express';
import * as ArticleService from '../../service/article/ArticleService';
import { catchAsync } from '../../modules/error';
import httpStatus from 'http-status';

export const getJoinUser = catchAsync(async (req: Request, res: Response) => {
  const result = await ArticleService.getJoinUser();
  res.json(result).status(httpStatus.OK);
});

//router.get('/articles', ArticleController.getArticles); //글목록
export const getArticles = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  const body = await ArticleService.getArticles(query);
  res.json(body).status(httpStatus.OK);
});

// /articles/:id | GET | getArticle | 글상세
export const getArticle = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const body = await ArticleService.getArticle(id);
  res.json(body).status(httpStatus.OK);
});

// /articles | POST | writeArticle | 글쓰기
export const writeArticle = catchAsync(async (req: Request, res: Response) => {
  const body = req.body;
  const userInfo = req.user;
  const result = await ArticleService.writeArticle(body, userInfo);
  res.json(result).status(httpStatus.OK);
});

// /articles/:id | PUT | modifyArticle | 글수정
export const modifyArticle = catchAsync(async (req: Request, res: Response) => {
  const body = req.body;
  const { id } = req.params;
  const result = await ArticleService.modifyArticle(id, body);
  //const userInfo = req.session.userInfo;
  res.json(result).status(httpStatus.OK);
});

// /articles/:id | DELETE | deleteArticle | 글삭제
export const deleteArticle = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ArticleService.deleteArticle(id);
  res.json(result).status(httpStatus.OK);
});
