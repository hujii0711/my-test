import { Comments } from '../../models/comments';
import { Articles } from '../../models/articles';

export const selectListComment = async (paramPack: { offset: string; articleRef: string }) => {
  const { offset, articleRef } = paramPack;
  const data = await Comments.findAll({
    attributes: [
      'id',
      'message',
      'user_id',
      'user_name',
      'liked',
      'unliked',
      'article_ref',
      'created_at',
      'updated_at',
    ],
    order: [['id', 'DESC']],
    limit: 10,
    offset: Number(offset),
    where: {
      article_ref: articleRef,
    },
    raw: true,
  });
  return data;
};

export const selectComment = async (params: { id: string; articleRef: string }) => {
  const { id, articleRef } = params;
  const data = await Comments.findOne({
    attributes: ['id', 'message', 'user_id', 'article_ref', 'created_at', 'updated_at'],
    where: {
      article_ref: Number(articleRef),
      id: Number(id),
    },
    raw: true,
  });
  return data;
};

export const insertComment = async (userInfo: any, paramPack: { message: string; articleRef: string }) => {
  const { user_id, user_name } = userInfo; // 세션 정보
  const { message, articleRef } = paramPack; // 세션 정보

  const data = await Comments.create({
    message,
    article_ref: Number(articleRef),
    user_id,
    user_name,
  });

  // article에 댓글카운트 증가
  await Articles.increment({ comment_cnt: 1 }, { where: { id: articleRef } });

  return data;
};

export const updateComment = async (body: { message: string; id: string }) => {
  const { id, message } = body;
  const data = await Comments.update(
    {
      message,
    },
    { where: { id } },
  );

  // 정상 업데이트 된 경우 해당 id 값으로 조회된 댓글 정보를 리턴
  // LOG  ======= {"article_ref": 2, "created_at": "2022-10-03T05:36:37.000Z", "id": 8, "message": "test", "updated_at": "2022-10-03T05:36:37.000Z", "user_id": "f7d1176a-a503-4b4e-94cd-8d11b8eb990c"}
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

export const deleteComment = async (params: { id: string; articleRef: string }) => {
  const { id, articleRef } = params;

  const data = await Comments.destroy({
    where: { id: Number(id) },
  });

  // article에 댓글카운트 감소
  await Articles.decrement({ comment_cnt: 1 }, { where: { id: Number(articleRef) } });

  return data;
};

export const updateCommentPrefer = async (body: { id: string; type: string }) => {
  const { id, type } = body;
  switch (type) {
    case 'likeUp':
      await Comments.increment({ liked: 1 }, { where: { id } });
      break;
    case 'likeDown':
      await Comments.decrement({ liked: 1 }, { where: { id } });
      break;
    case 'hateUp':
      await Comments.increment({ unliked: 1 }, { where: { id } });
      break;
    case 'hateDown':
      await Comments.decrement({ unliked: 1 }, { where: { id } });
      break;
    case 'likeUpAndhateDown':
      await Comments.increment({ liked: 1 }, { where: { id } });
      await Comments.decrement({ unliked: 1 }, { where: { id } });
      break;
    case 'likeDownAndhateUp':
      await Comments.decrement({ liked: 1 }, { where: { id } });
      await Comments.increment({ unliked: 1 }, { where: { id } });
      break;
  }
  return { status: 'success' };
};
