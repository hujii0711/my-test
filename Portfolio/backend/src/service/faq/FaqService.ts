import { Faqs } from '../../models/faqs';

export const selectListFaq = async () => {
  const data = await Faqs.findAll({
    attributes: ['id', 'answer', 'question', 'user_id', 'created_at', 'updated_at'],
    order: [['id', 'DESC']],
    limit: 10,
    //offset: Number(offset),
    where: {},
    raw: true,
  });
  return data;
};

export const selectFaq = async () => {
  const data = await Faqs.findOne({
    attributes: ['id', 'answer', 'user_id'],
    where: {},
    raw: true,
  });
  return data;
};

export const insertFaq = async () => {
  //const { user_id } = userInfo;
  const data = await Faqs.create({
    //answer,
    //question,
    //user_id,
  });
  return data;
};

export const updateFaq = async () => {
  const data = await Faqs.update(
    {
      //answer,
      //question,
    },
    { where: {} },
  );

  // 정상 업데이트 된 경우 해당 id 값으로 조회된 댓글 정보를 리턴
  if (data[0] > 0) {
    const searchData = await Faqs.findOne({
      attributes: ['id', 'answer', 'question', 'user_id', 'created_at', 'updated_at'],
      where: {
        //id,
      },
      raw: true,
    });
    return searchData;
  } else {
    return data;
  }
};

export const deleteFaq = async () => {
  const data = await Faqs.destroy({
    where: {},
  });
  return data;
};

export const updateFaqPrefer = async () => {
  return { status: 'success' };
};
