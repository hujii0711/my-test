const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const nunjucks = require('nunjucks');
const dotenv = require('dotenv');
const passport = require('passport');

dotenv.config({ path: "config/.env" }); //.env 설치 파일 경로 명시
const pageRouter = require('./routes/page');
const authRouter = require('./routes/auth');
const postRouter = require('./routes/post');
const userRouter = require('./routes/user');
//폴더 내의 index.js 파일은 require 시 이름을 생략할 수 있다
const { sequelize } = require('./models'); //require('./models')는 require('./models/index.js')와 같음
const passportConfig = require('./passport');

const app = express();
passportConfig(); // 패스포트 설정
app.set('port', process.env.PORT || 8000);
app.set('view engine', 'html');

// configure의 첫 번째 인수로 views 폴더의 경로를 넣고, 두 번째 인수로 옵션을 넣습니다.
//이때 express 속성에 app 객체를 연결합니다. watch 옵션이 true이면 HTML 파일이 변경될 때 템플릿 엔진을 다시 렌더링합니다.
nunjucks.configure('views', {
  express: app,
  watch: true,
});

//시퀄라이즈를 통해 익스프레스 앱과 MySQL을 연결해야 합니다.
//db.sequelize를 불러와서 sync 메서드를 사용해 서버 실행 시 MySQL과 연동되도록 했습니다. 내부에 force: false 옵션이 있는데, 이 옵션을 true로
//설정하면 서버 실행 시마다 테이블을 재생성합니다. 테이블을 잘못 만든 경우에 true로 설정하면 됩니다.
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
  }
}));
app.use(passport.initialize()); // passport.initialize() 미들웨어는 request에 passport 설정을 담는다.
app.use(passport.session());// passport.session() 미들웨어는 request.session 객체에 passport 정보를 저장한다.

app.use('/', pageRouter);
app.use('/auth', authRouter);
app.use('/post', postRouter);
app.use('/user', userRouter);

// #. 404 처리 라우터
// 404 응답은 익스프레스는 모든 미들웨어 함수 및 라우터를 실행했으며 이들 중 어느 것도 응답하지 않았다는 것을 나타낸다.
app.use((req, res, next) => {
  const error =  new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

// #. 에러 처리 라우터
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기중');
});
