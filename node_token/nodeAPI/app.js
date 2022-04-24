const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const nunjucks = require('nunjucks');
const dotenv = require('dotenv');
const passport = require('passport');

dotenv.config();
const pageRouter = require('./routes/page');
const authRouter = require('./routes/auth');
const postRouter = require('./routes/post');
const userRouter = require('./routes/user');
const { sequelize } = require('./models');
const passportConfig = require('./passport');

const app = express();
passportConfig(); // 패스포트 설정
app.set('port', process.env.PORT || 8001);
app.set('view engine', 'html');

// configure의 첫 번째 인수로 views 폴더의 경로를 넣고, 두 번째 인수로 옵션을 넣습니다.
//이때 express 속성에 app 객체를 연결합니다. watch 옵션이 true이면 HTML 파일이 변경될 때 템플릿 엔진을 다시 렌더링합니다.
nunjucks.configure('views', {
  express: app,
  watch: true,
});
//sequelize.sync()는 Sequelize가 초기화 될 때 DB에 필요한 테이블을 생성하는 함수입니다.
//예를 들면 quiz라는 모델이 있다면 CREATE TABLE IF NOT EXISTS `Quizzes`로 시작하는 SQL을 실행하여 모델로 정의된 테이블을 생성합니다.
sequelize.sync({ force: false })
  .then(() => {
    console.log('데이터베이스 연결 성공');
  })
  .catch((err) => {
    console.error(err);
  });

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/img', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
}));
app.use(passport.initialize()); // passport.initialize() 미들웨어는 request에 passport 설정을 담는다.
app.use(passport.session());// passport.session() 미들웨어는 request.session 객체에 passport 정보를 저장한다.

app.use('/', pageRouter);
app.use('/auth', authRouter);
app.use('/post', postRouter);
app.use('/user', userRouter);

app.use((req, res, next) => {
  const error =  new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기중');
});
