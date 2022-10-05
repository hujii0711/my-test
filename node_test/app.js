import express, { Router } from 'express';
import session from 'express-session';
import expressMySqlSession from 'express-mysql-session';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import nunjucks from 'nunjucks';
import dotenv from 'dotenv';
import * as Api from './routes/index.js';
import passport from 'passport';
import passportConfig from './passport/index.js';
import db from './models/index.js';

dotenv.config({ path: 'config/.env' });
const MySQLStore = expressMySqlSession(session);
const app = express();
passportConfig(); // 패스포트 설정

app.set('port', process.env.PORT || 5000);
app.set('view engine', 'html');

nunjucks.configure('views', {
  express: app,
  watch: true,
});

db.sequelize
  .sync({ force: false })
  .then(() => {
    console.log('데이터베이스 연결됨.');
  })
  .catch((err) => {
    console.error(err);
  });

app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));

const sessionMiddleware = session({
  name: 'sessionId',
  resave: false,
  saveUninitialized: true,
  secret: process.env.COOKIE_SECRET,
  store: new MySQLStore({
    host: 'localhost',
    port: 3307,
    user: 'root',
    password: 'hj@1560813',
    database: 'example',
  }),
  cookie: {
    //maxAge: 10 * 1000, // 1 hours (24 hours= 24 * 60 * 60 * 1000 ms)
    //httpOnly: true,
    //secure: true,
  },
});
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());
app.use('/', Api.router);

// #. 등록되지 않은 라우터 처리
app.use((req, res, next) => {
  const err = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  res.status(404).send(err.message);
});

// #. 에러 처리 라우터
app.use((err, req, res, next) => {
  console.log('err=====', err.message);
  res.status(500).send('에러 처리 라우터');
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기중');
});
