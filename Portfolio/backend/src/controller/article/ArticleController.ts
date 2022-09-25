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
  console.log('writeArticle >>>>>>>>>> userInfo========', userInfo);
  // const userInfo = {
  //   id: 1,
  //   user_id: 'bfa7ee89-805b-4957-83f2-ebeb23e1bac4',
  //   user_name: '독거노총각',
  //   email: 'fujii0711',
  // };
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

// /articles/upload | POST | fileUpload | 파일업로드
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
  console.log('aaaa==', result);
  res.json(result).status(httpStatus.OK);
});
