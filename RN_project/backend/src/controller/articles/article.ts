import { Request, Response } from "express";
import * as ArticleService from "../../service/articles/article";
import {catchAsync} from "../../modules/error";

export const getJoinUser = catchAsync(async (req: Request, res: Response) => {
  const result = await ArticleService.getJoinUser();

  res.json({
    code: "success",
    message: "정상적으로 조인문을 조회하였습니다.",
    resp: result,
  });
});

//router.get('/articles', ArticleController.getArticles); //글목록
export const getArticles = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  const body = await ArticleService.getArticles(query);

  res.json({
    code: "success",
    message: "정상적으로 getArticles 조회 되었습니다.",
    resp: body,
  });
});

// /articles/:id | GET | getArticle | 글상세
export const getArticle = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const body = await ArticleService.getArticle(id);

  res.json({
    code: "success",
    message: "정상적으로 getArticle 조회 되었습니다.",
    resp: body,
  });
});

// /articles | POST | writeArticle | 글쓰기
export const writeArticle = catchAsync(async (req: Request, res: Response) => {
  const body = req.body;
  const result = await ArticleService.writeArticle(body);

  res.json({
    code: "success",
    message: "정상적으로 writeArticle 저장 되었습니다.",
    resp: result,
  });
});

// /articles/:id | PUT | modifyArticle | 글수정
export const modifyArticle = catchAsync(async (req: Request, res: Response) => {
  const body = req.body;
  const { id } = req.params;
  const result = await ArticleService.modifyArticle(id, body);

  res.json({
    code: "success",
    message: "정상적으로 modifyArticle 수정 되었습니다.",
    resp: result,
  });
});

// /articles/:id | DELETE | deleteArticle | 글삭제
export const deleteArticle = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ArticleService.deleteArticle(id);

  res.json({
    code: "success",
    message: "정상적으로 deleteArticle 삭제 되었습니다.",
    resp: result,
  });
});