import { Comments } from "../../models/comments";

export const getComments = async (params: any) => {
  console.log("Commentervice >>>> getComments >>>> params====", params);
  const data = await Comments.findAll({
    attributes: ["id", "message", "user_id", "articles_ref", "created_at", "updated_at"],
    where: {
      articles_ref: params,
    },
    raw: true,
  });
  return data;
};

export const writeComment = async (message: string, articles_ref: number, userInfo: any) => {
  console.log("Commentervice >>>> writeComment >>>> message====", message);
  console.log("Commentervice >>>> writeComment >>>> articles_ref====", articles_ref);
  const { user_id } = userInfo; // 세션 정보

  const data = await Comments.create({
    message,
    articles_ref,
    user_id,
  });

  return data;
};

export const modifyComment = async (message: string, articles_ref: string, id: string) => {
  console.log("Commentervice >>>> modifyComment >>>> id====", id);
  const data = await Comments.update(
    {
      message,
    },
    { where: { id } },
  );

  // 정상 업데이트 된 경우 해당 id 값으로 조회된 댓글 정보를 리턴
  if (data[0] > 0) {
    const searchData = await Comments.findOne({
      attributes: ["id", "message", "user_id", "articles_ref", "created_at", "updated_at"],
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

export const deleteComment = async (articles_ref: string, id: string) => {
  console.log("Commentervice >>>> deleteComment >>>> id====", id);
  const data = await Comments.destroy({
    where: { id },
  });
  return data;
};
