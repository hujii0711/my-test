import { Articles } from '../../models/articles';
import { Comments } from '../../models/comments';
import mailSender from '../../modules/mail';
import { Sequelize, QueryTypes } from 'sequelize';
import { sequelize } from '../../models';

export const selectListArticle = async (query: any) => {
  const offset = Number(query.offset);
  const SQL = `select id
                     ,title
                     ,contents
                     ,user_id
                     ,user_name
                     ,lookup
                     ,created_at
                     ,updated_at
                     ,row_number() over(order by id desc) as row_num
                from articles
                order by row_num asc
                limit :offset, 10;`;
  const data = await sequelize.query(SQL, {
    type: QueryTypes.SELECT,
    replacements: { offset },
  });
  // const data = await Articles.findAll({
  //   attributes: ['id', 'title', 'contents', 'user_id', 'lookup', 'user_name', 'created_at', 'updated_at'],
  //   order: [['id', 'DESC']],
  //   limit: 10,
  //   offset: Number(offset),
  //   raw: true,
  // });

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

export const updateArticle = async (paramPack: { id: string; title: string; contents: string }) => {
  const { id, title, contents } = paramPack;
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

export const updateArticleLookup = async (id: number) => {
  const data = await Articles.increment({ lookup: 1 }, { where: { id } });
  return data;
};

export const updateArticlePrefer = async (params: { id: string; type: string }) => {
  const { type, id } = params;
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

export const selectCommentCount = async (articleRef: string) => {
  //SELECT COUNT(`id`) AS `comment_cnt` FROM `comments` AS `Comments` WHERE `Comments`.`article_ref` = 26;
  const data = Comments.findAll({
    attributes: [[Sequelize.fn('COUNT', Sequelize.col('id')), 'comment_cnt']],
    where: {
      article_ref: Number(articleRef),
    },
  });
  return data;
};

export const sendEmail = async (bodys: { to: string; subject: string; html: string }) => {
  console.log('ArticleService >>>> sendEmail >>>> bodys====', bodys);
  return mailSender(bodys);
};
