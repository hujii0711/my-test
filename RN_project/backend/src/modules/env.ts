import path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: path.resolve(__dirname, "../config/.env") });

const env = {
	port: process.env.PORT!,
    node_env: process.env.NODE_ENV!,
	database: {
		host: process.env.DB_HOST!,
		port: Number(process.env.DB_PORT!),
		username: process.env.DB_USERNAME!,
		password: process.env.DB_PASSWORD!,
		dbname: process.env.DB_NAME!,
	},
	jwt: {
		secret: process.env.JWT_SECRET!
	},
	log: {
		debug: process.env.LOG_DEBUG === 'true' ? true : false
	},
	cookie:{
		secret : process.env.COOKIE_SECRET!
	},
	max_age: {
		session: Number(process.env.SESSION_MAX_AGE!), 			// 1시간
		token: process.env.TOKEN_MAX_AGE!,						// 30일
		token_cookie: Number(process.env.TOKEN_MAX_AGE_COOKIE!) // 30일
	}
};

export default env;
