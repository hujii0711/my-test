import { Comments } from '../../models/comments';

export const getComments = async (params: any) => {
    console.log("Commentervice >>>> getComments >>>> params====", params);
    const data = await Comments.findAll({
        where: {
            id : params
        },
        raw: true
    });
    return data;   
};

export const writeComment = async (message: string, articles_ref: number) => {
    console.log("Commentervice >>>> writeComment >>>> message====", message);
    console.log("Commentervice >>>> writeComment >>>> articles_ref====", articles_ref);

    const data = await Comments.create({
        message,
        articles_ref,
        user_id: "HaeJu",
    });
    return data;
};

export const modifyComment = async (message: string, articles_ref: string, id: string) => {
    console.log("Commentervice >>>> modifyComment >>>> id====", id);
    const data = await Comments.update(
        {
            message,
        },
        { where: { id } }
    );
    return data;
};

export const deleteComment = async (articles_ref: string, id: string) => {
    console.log("Commentervice >>>> deleteComment >>>> id====", id);
    const data = await Comments.destroy({
        where: { id },
    });
    return data;
};

