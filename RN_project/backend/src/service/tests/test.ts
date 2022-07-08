import { Tests } from '../../models/tests';

export const getListTests = async (params: any) => {
    console.log("TestService >>>> getTests >>>> params====", params);
    const data = await Tests.findAll({
        where: {
            id : params
        },
        raw: true
    });
    return data;   
};

export const insertTests = async (params: {username:string}) => {
    console.log("TestService >>>> insertTests >>>> params====", params);
    const { username } = {...params};
    
    const data = await Tests.create({
        username
    });
    return data;
};

export const updateTests = async (params: {id:number, username:string}) => {
    console.log("TestService >>>> updateTests >>>> params====", params);
    const { id, username } = {...params};
    const data = await Tests.update(
        {
          username,
        },
        { where: { id } }
      );
    return data;
};

export const deleteTests = async (params: {id:number}) => {
    console.log("TestService >>>> deleteTests >>>> params====", params);
    const { id } = { ...params };
    const data = await Tests.destroy({
        where: { id },
    });
    return data;
};

