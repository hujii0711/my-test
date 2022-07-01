import * as dotenv from 'dotenv';
dotenv.config();

export const database = {

    development : {
        username : 'fujii0711',
        password :  'hj@1560813',
        dbname :  'example',
        host : 'localhost',
        port : 3306,
        dialect : "mysql"
    }

}