import { Articles } from '../../models/articles';
import { Comments } from '../../models/comments';
import mailSender from '../../modules/mail';
import { Sequelize } from 'sequelize';

export const selectListArticle = async (params: any) => {
  const { offset } = params; ////{offset:0}
  // select * from A limit 1(_offset), 10(_limit) === select * from A limit 10 offset 1
  const data = await Articles.findAll({
    attributes: [
      'id',
      'title',
      'contents',
      'user_id',
      'user_name',
      'lookup',
      'comment_cnt',
      'created_at',
      'updated_at',
    ],
    order: [['id', 'DESC']],
    limit: 10,
    offset: Number(offset),
    raw: true,
  });
  return data;
};

export const selectArticle = async (id: string) => {
  const data = await Articles.findOne({
    attributes: [
      'id',
      'title',
      'contents',
      'user_id',
      'user_name',
      'lookup',
      'liked',
      'unliked',
      'comment_cnt',
      'created_at',
      'updated_at',
    ],
    where: {
      id,
    },
    raw: true,
  });
  return data;
};

export const insertArticle = async (params: { title: string; contents: string }, userInfo: any) => {
  const { title, contents } = params;
  const { user_id, user_name } = userInfo;
  const data = await Articles.create({
    title,
    contents,
    user_id,
    user_name,
  });

  return data;
};

export const updateArticle = async (id: string, bodys: { title: string; contents: string }) => {
  const { title, contents } = bodys;
  const data = await Articles.update(
    {
      title,
      contents,
    },
    { where: { id } },
  );
  // 정상 업데이트 된 경우 해당 id 값으로 조회된 게시글 정보를 리턴
  if (data[0] > 0) {
    const searchData = await Articles.findOne({
      attributes: ['id', 'title', 'contents', 'user_id', 'user_name', 'created_at', 'updated_at'],
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
  const data = await Articles.destroy({
    where: { id },
  });
  return data;
};

export const updateArticleLookup = async (id: string) => {
  const data = await Articles.increment({ lookup: 1 }, { where: { id } });
  return data;
};

export const updateArticlePrefer = async (id: string, type: string) => {
  switch (type) {
    case 'likeUp':
      await Articles.increment({ liked: 1 }, { where: { id } });
      break;
    case 'likeDown':
      await Articles.decrement({ liked: 1 }, { where: { id } });
      break;
    case 'hateUp':
      await Articles.increment({ unliked: 1 }, { where: { id } });
      break;
    case 'hateDown':
      await Articles.decrement({ unliked: 1 }, { where: { id } });
      break;
    case 'likeUpAndhateDown':
      await Articles.increment({ liked: 1 }, { where: { id } });
      await Articles.decrement({ unliked: 1 }, { where: { id } });
      break;
    case 'likeDownAndhateUp':
      await Articles.decrement({ liked: 1 }, { where: { id } });
      await Articles.increment({ unliked: 1 }, { where: { id } });
      break;
  }
  return { status: 'success' };
};

export const selectCommentCount = async (id: string) => {
  //select count(id) as comment_cnt from comments where id=1;
  const data = Comments.findAll({
    attributes: [[Sequelize.fn('COUNT', Sequelize.col('id')), 'comment_cnt']],
    where: {
      id,
    },
  });
  return data;
};

export const sendEmail = async (bodys: { to: string; subject: string; html: string }) => {
  console.log('ArticleService >>>> sendEmail >>>> bodys====', bodys);
  return mailSender(bodys);
};
