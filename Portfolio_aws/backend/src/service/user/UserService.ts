import { Users } from '../../models/users';
import bcrypt from 'bcryptjs';
import { Op } from 'sequelize';

export const getListUsers = async (userInfo: any) => {
  const { user_id } = userInfo;
  const data = await Users.findAll({
    where: { user_id: { [Op.ne]: user_id } },
    raw: true,
  });
  return data;
};

export const insertUsers = async (params: { user_name: string; email: string }) => {
  const { user_name, email } = { ...params };

  const data = await Users.create({
    user_name,
    email,
  });
  return data;
};

export const updateUsers = async (params: { id: number; user_name: string; email: string }) => {
  const { id, user_name, email } = { ...params };
  const data = await Users.update(
    {
      user_name,
      email,
    },
    { where: { id } },
  );
  return data;
};

export const deleteUsers = async (params: { id: number }) => {
  const { id } = { ...params };
  const data = await Users.destroy({
    where: { id },
  });
  return data;
};

export const findByUserInfo = async (user_id: string) => {
  return await Users.findOne({
    attributes: ['id', 'user_id', 'user_name'],
    where: { user_id },
    raw: true,
  });
};

export const createUser = async () => {
  const hash = await bcrypt.hash('1234', 12);
  const uuidv4 = () => {
    return 'xyxyxyxy'.replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };
  const _email = uuidv4() + '@daum.net';
  const DATA = Array(50)
    .fill(undefined)
    .map((elem, idx) => (elem = { email: uuidv4() + '@daum.net', password: hash, user_name: '랜덤테스터' }));

  DATA.forEach(async (elem) => {
    await Users.create({
      email: _email,
      password: hash,
      user_name: '랜덤테스터',
    });
  });
  return null;
};
