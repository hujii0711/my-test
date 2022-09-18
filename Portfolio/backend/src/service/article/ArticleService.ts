import { Articles } from '../../models/articles';
import { Users } from '../../models/users';
import { Sequelize } from 'sequelize';

export const getJoinUser = async () => {
  console.log('ArticleService >>>> getJoinUser!!!');
  const data = await Articles.findAll({ include: Users, raw: true });
  return data;
};

export const getArticles = async (params: any) => {
  const { offset } = params; ////{offset:0}

  // select * from A limit 1(_offset), 10(_limit) === select * from A limit 10 offset 1
  const data = await Articles.findAll({
    attributes: ['id', 'title', 'contents', 'user_id', 'user_name', 'created_at', 'updated_at'],
    order: [['id', 'DESC']],
    limit: 10,
    offset: Number(offset),
    raw: true,
  });
  return data;
};

export const getArticle = async (id: string) => {
  console.log('ArticleService >>>> getArticle >>>> id====', id);
  const data = await Articles.findOne({
    attributes: ['id', 'title', 'contents', 'user_id', 'user_name', 'created_at', 'updated_at'],
    where: {
      id,
    },
    raw: true,
  });
  return data;
};

export const writeArticle = async (params: { title: string; contents: string }, userInfo: any) => {
  console.log('ArticleService >>>> writeArticle >>>> params====', params);
  console.log('ArticleService >>>> writeArticle >>>> userInfo====', userInfo);
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

export const modifyArticle = async (id: string, bodys: { title: string; contents: string }) => {
  console.log('ArticleService >>>> modifyArticle >>>> id====', id);
  console.log('ArticleService >>>> modifyArticle >>>> bodys====', bodys);
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
  console.log('ArticleService >>>> deleteArticle >>>> id====', id);
  const data = await Articles.destroy({
    where: { id },
  });
  return data;
};
