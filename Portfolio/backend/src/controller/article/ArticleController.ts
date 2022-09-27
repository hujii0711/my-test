import { NextFunction, Request, Response } from 'express';
import * as ArticleService from '../../service/article/ArticleService';
import { catchAsync } from '../../modules/error';
import httpStatus from 'http-status';

// /article | GET | selectListArticle | 글목록
export const selectListArticle = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  const body = await ArticleService.selectListArticle(query);
  res.json(body).status(httpStatus.OK);
});

// /article/:id | GET | selectArticle | 글상세
export const selectArticle = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const body = await ArticleService.selectArticle(id);
  res.json(body).status(httpStatus.OK);
});

// /article/insert | POST | insertArticle | 글쓰기
export const insertArticle = catchAsync(async (req: Request, res: Response) => {
  const body = req.body;
  const userInfo = req.user;
  const result = await ArticleService.insertArticle(body, userInfo);
  res.json(result).status(httpStatus.OK);
});

// /article/update/:id | PUT | updateArticle | 글수정
export const updateArticle = catchAsync(async (req: Request, res: Response) => {
  const body = req.body;
  const { id } = req.params;
  const result = await ArticleService.updateArticle(id, body);
  //const userInfo = req.session.userInfo;
  res.json(result).status(httpStatus.OK);
});

// /article/delete/:id | DELETE | deleteArticle | 글삭제
export const deleteArticle = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ArticleService.deleteArticle(id);
  res.json(result).status(httpStatus.OK);
});

// /article/upload | POST | fileUpload | 파일업로드
export const fileUpload = catchAsync(async (req: Request, res: Response) => {
  //이제 프론트의 axios로부터 post 요청을 받을 코드를 작성합니다.
  //프론트에서 formData에서 정해주었던 이름으로 img를 받습니다.
  //그리고 Storage 옵션에서 정해준 fileName을 다시 프론트로 보내줍니다.

  console.log(req.file); //req.file을 통해 여러가지 요청 결과를 확인할 수 있습니다.
  res.send('ok');
});

// /sendEmail | POST
export const sendEmail = catchAsync(async (req: Request, res: Response) => {
  const body = req.body;
  const result = await ArticleService.sendEmail(body);
  res.json(result).status(httpStatus.OK);
});

// /article/update/lookup | PATCH
export const updateArticleLookup = catchAsync(async (req: Request, res: Response) => {
  const body = req.body;
  const result = await ArticleService.updateArticleLookup(body);
  res.json(result).status(httpStatus.OK);
});

// /article/update/like | PATCH
export const updateArticleLike = catchAsync(async (req: Request, res: Response) => {
  const { id, select } = req.body;
  const result = await ArticleService.updateArticleLike(id, select);
  res.json(result).status(httpStatus.OK);
});

// /article/commentCnt | GET
export const selectCommentCount = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.body;
  const result = await ArticleService.selectCommentCount(id);
  res.json(result).status(httpStatus.OK);
});
