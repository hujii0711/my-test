import { Users } from '../../models/users';

export const getListUsers = async (params: any) => {
    console.log("UserService >>>> getListUsers >>>> params====", params);
    const data = await Users.findAll({
        where: {
            id : params
        },
        raw: true
    });
    return data;   
};

export const insertUsers = async (params: {user_name:string, email:string}) => {
    console.log("UserService >>>> insertUsers >>>> params====", params);
    const { user_name, email } = {...params};
    
    //const data = await Users.create({
    //    user_name,
    //    email,
    //});
    //return data;
};

export const updateUsers = async (params: {id:number, user_name:string, email:string}) => {
    console.log("UserService >>>> updateUsers >>>> params====", params);
    const { id, user_name, email } = {...params};
    const data = await Users.update(
        {
            user_name,
            email,
        },
        { where: { id } }
      );
    return data;
};

export const deleteUsers = async (params: {id:number}) => {
    console.log("UserService >>>> deleteUsers >>>> params====", params);
    const { id } = { ...params };
    const data = await Users.destroy({
        where: { id },
    });
    return data;
};

export const findByUserInfo = async (user_id : string) => {
    return await Users.findOne({
      attributes: ['id', 'user_id', 'user_name'],
      where: { user_id },
      raw: true,
    });
  };

