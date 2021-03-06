const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const nunjucks = require('nunjucks');
const dotenv = require('dotenv');
const passport = require('passport');

dotenv.config({ path: 'config/.env' });

const indexRouter = require('./routes');
const postRounter = require('./routes/posts/post');
const userRouter = require('./routes/users/user');

const { sequelize } = require('./models');
const passportConfig = require('./lib/passport');

const app = express();
passportConfig(); // 패스포트 설정
app.set('port', process.env.PORT || 5000);
app.set('view engine', 'html');

nunjucks.configure('views', {
  express: app,
  watch: true,
});

sequelize
  .sync({ force: false })
  .then(() => {
    console.log('데이터베이스 연결 성공');
  })
  .catch((err) => {
    console.error(err);
  });

app.use(morgan('dev')); //combine : 더 자세한 로그
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()); //클라이언트에서 json 데이터 전송 가능
app.use(express.urlencoded({ extended: false })); // formDate 전송 가능 extended: false--> querystring , true --> qs(qs가 더 강력함)
app.use(cookieParser(process.env.COOKIE_SECRET)); // cookieParser(암호화키) : 쿠키의 데이터를 암호화
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);
app.use(passport.initialize()); // passport.initialize() 미들웨어는 request에 passport 설정을 담는다.
app.use(passport.session()); // passport.session() 미들웨어는 request.session 객체에 passport 정보를 저장한다.

// 모든 라우터에 수행되는 미들웨이 순서 주의!
app.use(tokenRenewal);

app.use('/', indexRouter);
app.use('/api/posts', postRounter);
app.use('/api/users', userRouter);

// 404 응답은 익스프레스는 모든 미들웨어 함수 및 라우터를 실행했으며 이들 중 어느 것도 응답하지 않았다는 것을 나타낸다.
app.use((req, res, next) => {
  const err = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  res.status(404).send(err.message);
});

// #. 에러 처리 라우터
app.use((err, req, res, next) => {
  console.log('에러 처리 라우터!!!!!!!!!!!!!');
  res.status(500).send('에러 처리 라우터');
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기중');
});
