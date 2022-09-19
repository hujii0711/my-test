import { Comments } from '../../models/comments';

export const getComments = async (params: any, article_ref: number) => {
  console.log('Commentervice >>>> getComments >>>> params====', params);
  console.log('Commentervice >>>> getComments >>>> article_ref====', article_ref);
  const { offset } = params; ////{offset:0}
  const data = await Comments.findAll({
    attributes: ['id', 'message', 'user_id', 'article_ref', 'created_at', 'updated_at'],
    order: [['id', 'DESC']],
    limit: 10,
    offset: Number(offset),
    where: {
      article_ref,
    },
    raw: true,
  });
  return data;
};

export const getComment = async (article_ref: number, id: number) => {
  console.log('Commentervice >>>> getComment >>>> article_ref====', article_ref);
  console.log('Commentervice >>>> getComment >>>> id====', id);
  const data = await Comments.findOne({
    attributes: ['id', 'message', 'user_id', 'article_ref', 'created_at', 'updated_at'],
    where: {
      article_ref,
      id,
    },
    raw: true,
  });
  return data;
};

export const writeComment = async (message: string, article_ref: number, userInfo: any) => {
  console.log('Commentervice >>>> writeComment >>>> message====', message);
  console.log('Commentervice >>>> writeComment >>>> article_ref====', article_ref);
  const { user_id } = userInfo; // 세션 정보

  const data = await Comments.create({
    message,
    article_ref,
    user_id,
  });

  return data;
};

export const modifyComment = async (message: string, articles_ref: string, id: string) => {
  console.log('Commentervice >>>> modifyComment >>>> id====', id);
  const data = await Comments.update(
    {
      message,
    },
    { where: { id } },
  );

  // 정상 업데이트 된 경우 해당 id 값으로 조회된 댓글 정보를 리턴
  if (data[0] > 0) {
    const searchData = await Comments.findOne({
      attributes: ['id', 'message', 'user_id', 'article_ref', 'created_at', 'updated_at'],
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
  console.log('Commentervice >>>> deleteComment >>>> id====', id);
  const data = await Comments.destroy({
    where: { id },
  });
  return data;
};

export const updateLikeComment = async (id: string) => {
  console.log('Commentervice >>>> updateLikeComment >>>> id====', id);
  //update comments set liked = liked+1 where id = 10
  const data = await Comments.increment(
    {
      liked: 1,
    },
    { where: { id } },
  );
  const data1 = await Comments.decrement(
    {
      liked: 1,
    },
    { where: { id } },
  );
};
