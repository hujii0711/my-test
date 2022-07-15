import { Articles } from '../../models/articles';
import { Users } from '../../models/users';

export const getJoinUser = async () => {
    console.log("ArticleService >>>> getJoinUser!!!");
    const data = await Articles.findAll({ include: Users, raw: true })
    return data;
};

export const getArticles = async (params: any) => {
    console.log("ArticleService >>>> getArticles >>>> params====", params);
    const { id } = params;
    const data = await Articles.findAll({
        where: {
            id
        },
        raw: true
    });
    return data;   
};

export const getArticle = async (id: string) => {
    console.log("ArticleService >>>> getArticle >>>> id====", id);
    const data = await Articles.findAll({
        where: {
            id
        },
        raw: true
    });
    return data;   
};

export const writeArticle = async (params: {title:string, contents:string}) => {
    console.log("ArticleService >>>> writeArticle >>>> params====", params);
    const { title, contents } = params;
    const data = await Articles.create({
        title,
        contents,
        user_id: "fujii0711",
        user_name: "김형준"
    });
    return data;

};

export const modifyArticle = async (id: string, bodys: {title:string, contents:string}) => {
    console.log("ArticleService >>>> modifyArticle >>>> id====", id);
    console.log("ArticleService >>>> modifyArticle >>>> bodys====", bodys);
    const {title, contents } = bodys;
    const data = await Articles.update(
        {
            title,
            contents,
        },
        { where: { id } }
      );
    return data;
};

export const deleteArticle = async (id: string) => {
    console.log("ArticleService >>>> deleteArticle >>>> id====", id);
    const data = await Articles.destroy({
        where: { id },
    });
    return data;
};