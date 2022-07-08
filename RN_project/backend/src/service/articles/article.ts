import { Articles } from '../../models/articles';
import { Users } from '../../models/users';

export const getListArticles = async (params: any) => {
    console.log("ArticleService >>>> getListArticles >>>> params====", params);
    const data = await Articles.findAll({
        where: {
            id : params
        },
        raw: true
    });
    return data;   
};

export const insertArticles = async (params: {title:string, contents:string}) => {
    console.log("ArticleService >>>> insertArticles >>>> params====", params);
    const { title, contents } = {...params};
    
    //const data = await Articles.create({
    //    title,
    //    contents,
    //    user_id : "fujii0711"
    //});
    //return data;
};

export const updateArticles = async (params: {id:number, title:string, contents:string}) => {
    console.log("ArticleService >>>> updateArticles >>>> params====", params);
    const { id, title, contents } = {...params};
    const data = await Articles.update(
        {
            title,
            contents,
        },
        { where: { id } }
      );
    return data;
};

export const deleteArticles = async (params: {id:number}) => {
    console.log("ArticleService >>>> deleteArticles >>>> params====", params);
    const { id } = { ...params };
    const data = await Articles.destroy({
        where: { id },
    });
    return data;
};

export const getJoinUser = async () => {
    console.log("ArticleService >>>> getJoinUser!!!");
    const data = await Articles.findAll({ include: Users, raw: true })
    return data;
};

