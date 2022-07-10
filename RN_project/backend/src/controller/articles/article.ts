import { Request, Response } from "express";
import * as ArticleService from "../../service/articles/article";

export const getListArticles = async (req: Request, res: Response) => {
  const { id } = req.query;
  const body = await ArticleService.getListArticles(id);

  res.json({
    code: "success",
    message: "정상적으로 조회 되었습니다.",
    resp: body,
  });
};

export const insertArticles = async (req: Request, res: Response) => {
  const body = req.body;
  const result = await ArticleService.insertArticles(body);

  res.json({
    code: "success",
    message: "정상적으로 저장 되었습니다.",
    resp: result,
  });
};

export const updateArticles = async (req: Request, res: Response) => {
  const body = req.body;
  const result = await ArticleService.updateArticles(body);

  res.json({
    code: "success",
    message: "정상적으로 수정 되었습니다.",
    resp: result,
  });
};

export const deleteArticles = async (req: Request, res: Response) => {
  const body = req.body;
  const result = await ArticleService.deleteArticles(body);

  res.json({
    code: "success",
    message: "정상적으로 삭제 되었습니다.",
    resp: result,
  });
};

export const getJoinUser = async (req: Request, res: Response) => {
  const result = await ArticleService.getJoinUser();

  res.json({
    code: "success",
    message: "정상적으로 조인문을 조회하였습니다.",
    resp: result,
  });
};
