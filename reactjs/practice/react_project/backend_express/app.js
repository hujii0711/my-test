const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const nunjucks = require('nunjucks');
const dotenv = require('dotenv');
const { tokenRenewal } = require('./lib/customMiddleware/tokenConfig'); // 토큰 갱신

dotenv.config({ path: 'config/.env' });

const indexRouter = require('./routes');
const postRounter = require('./routes/posts/post');
const userRouter = require('./routes/users/user');

const { sequelize } = require('./models');

const app = express();
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

app.use(tokenRenewal);

app.use('/', indexRouter);
app.use('/api/posts', postRounter);
app.use('/api/auth', userRouter);

// #. 등록되지 않은 라우터 처리
app.use((req, res, next) => {
  console.error('등록되지 않은 라우터 처리__404!!!!!!!!!!!!!');
  const err = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  res.status(400).json({
    code: 'fail',
    message: err.message,
  });
});

// #. 에러 처리 라우터
app.use((err, req, res, next) => {
  console.error('에러 처리 라우터__500!!!!!!!!!!!!!');
  res.status(500).json({
    code: 'fail',
    message: err.message,
  });
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기중');
});
