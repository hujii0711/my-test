import { NextFunction, Request, Response } from "express";
import * as ArticleService from "../../service/article/ArticleService";
import { catchAsync } from "../../modules/error";
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

// var data= {"pageParams": [undefined], "pages": [[[Object]]]}
// var user= {"blocked": null, "confirmed": true, "created_at": "2022-07-17T04:33:05.480Z", "email": "test@daum.net", "id": 3, "provider": "local", "role": {"description": "Default role given to authenticated user.", "id": 1, "name": "Authenticated", "type": "authenticated"}, "updated_at": "2022-07-17T04:33:05.487Z", "username": "test"};
// var items= [{"body": "test2", "created_at": "2022-06-26T03:29:28.480Z", "id": 2, "published_at": "2022-06-26T03:29:28.470Z", "title": "test1", "updated_at": "2022-06-26T03:29:28.492Z", "user": {"blocked": null, "confirmed": true, "created_at": "2022-06-26T03:29:10.824Z", "email": "hujii0711@gmail.com", "id": 2, "provider": "local", "role": 1, "updated_at": "2022-06-26T03:29:10.831Z", "username": "fujii0711"}}];

// /articles/:id | GET | getArticle | 글상세
export const getArticle = catchAsync(async (req: Request, res: Response) => {
  console.log("getArticle >>> 세션 정보 테스트 --------------", req.session.userInfo);
  const { id } = req.params;
  const body = await ArticleService.getArticle(id);
  res.json(body).status(httpStatus.OK);
});

// /articles | POST | writeArticle | 글쓰기
export const writeArticle = catchAsync(async (req: Request, res: Response) => {
  const body = req.body;
  const userInfo = req.session.userInfo;

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
