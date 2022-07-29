import env from "../modules/env";

export const databaseConfig = {

    [env.node_env]: {
        host : env.database.host,
        username : env.database.username,
        password : env.database.password,
        dbname :  env.database.dbname,
        port : env.database.port,
    },
}