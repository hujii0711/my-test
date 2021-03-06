import { Articles } from "../../models/articles";
import { Users } from "../../models/users";

export const getJoinUser = async () => {
  console.log("ArticleService >>>> getJoinUser!!!");
  const data = await Articles.findAll({ include: Users, raw: true });
  return data;
};

export const getArticles = async (params: any) => {
  console.log("ArticleService >>>> getArticles >>>> params====", params);
  const { _limit, id_lt, id_gt } = params;

  let _offset: number = 0;
  if (id_lt && !id_gt) {
    _offset = id_lt;
  } else if (!id_lt && id_gt) {
    _offset = id_gt;
  }

  // select * from A limit 1, 10 === select * from A limit 10 offset 1
  const data = await Articles.findAll({
    attributes: ["id", "title", "contents", "user_id", "user_name", "published_at", "created_at", "updated_at"],
    order: [["id", "DESC"]],
    limit: Number(_limit),
    offset: Number(_offset),
    raw: true,
  });
  return data;
};

export const getArticle = async (id: string) => {
  console.log("ArticleService >>>> getArticle >>>> id====", id);
  const data = await Articles.findAll({
    attributes: ["id", "title", "contents", "user_id", "user_name", "published_at", "created_at", "updated_at"],
    where: {
      id,
    },
    raw: true,
  });
  return data;
};

export const writeArticle = async (params: { title: string; body: string }, userInfo: any) => {
  console.log("ArticleService >>>> writeArticle >>>> params====", params);
  console.log("ArticleService >>>> writeArticle >>>> userInfo====", userInfo);
  const { title, body } = params;
  const { user_id, user_name } = userInfo;

  const data = await Articles.create({
    title,
    contents: body,
    user_id,
    user_name,
  });

  return data;
};

export const modifyArticle = async (id: string, bodys: { title: string; body: string }) => {
  console.log("ArticleService >>>> modifyArticle >>>> id====", id);
  console.log("ArticleService >>>> modifyArticle >>>> bodys====", bodys);
  const { title, body } = bodys;
  const data = await Articles.update(
    {
      title,
      contents: body,
    },
    { where: { id } },
  );
  // ?????? ???????????? ??? ?????? ?????? id ????????? ????????? ????????? ????????? ??????
  if (data[0] > 0) {
    const searchData = await Articles.findAll({
      attributes: ["id", "title", "contents", "user_id", "user_name", "published_at", "created_at", "updated_at"],
      where: {
        id,
      },
      raw: true,
    });
    return searchData;
  } else {
    return data;
  }
};

export const deleteArticle = async (id: string) => {
  console.log("ArticleService >>>> deleteArticle >>>> id====", id);
  const data = await Articles.destroy({
    where: { id },
  });
  return data;
};
