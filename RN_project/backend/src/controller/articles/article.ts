import { Request, Response } from "express";
import * as ArticleService from "../../service/articles/article";
import { catchAsync } from "../../modules/error";

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

// var data= {"pageParams": [undefined], "pages": [[[Object]]]}
// var user= {"blocked": null, "confirmed": true, "created_at": "2022-07-17T04:33:05.480Z", "email": "test@daum.net", "id": 3, "provider": "local", "role": {"description": "Default role given to authenticated user.", "id": 1, "name": "Authenticated", "type": "authenticated"}, "updated_at": "2022-07-17T04:33:05.487Z", "username": "test"};
// var items= [{"body": "test2", "created_at": "2022-06-26T03:29:28.480Z", "id": 2, "published_at": "2022-06-26T03:29:28.470Z", "title": "test1", "updated_at": "2022-06-26T03:29:28.492Z", "user": {"blocked": null, "confirmed": true, "created_at": "2022-06-26T03:29:10.824Z", "email": "hujii0711@gmail.com", "id": 2, "provider": "local", "role": 1, "updated_at": "2022-06-26T03:29:10.831Z", "username": "fujii0711"}}];

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
  console.log("writeArticle >>> result =====", result);
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
