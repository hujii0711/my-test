const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const path = require('path');

// set: express 앱 설정
// use: 미들웨어 연결
dotenv.config();

// express 패키지를 호출하여 app 변수 객체를 만듬, 이제 이 변수에 각종 기능을 연결
const app = express();
app.set('port', process.env.PORT || 3000);

// 요청에 대한 정보를 콘솔에 기록하는 역할
app.use(morgan('dev')); //dev, short, common, combined 등 인자가 있다. 개발시: dev, short / 배포시: common, combined

//인자로 받은 경로들을 하나로 합쳐서 문자열 형태로 path를 리턴한다.
app.use('/', express.static(path.join(__dirname, 'public')));

//express 4.16.0 버전부터 body-parser의 일부 기능이 express에 내장되어 있어 따로 require 할 필요 없다.
//body-parser는 요청의 본문을 해석해주는 미들웨어이다.
app.use(express.json()); // json 형식의 데이터 전달 

//extended : false --> querystring 모듈사용, true --> qs 모듈 사용하여 해석
app.use(express.urlencoded({ extended: false })); //폼 데이터 전달 

// 요청에 동봉된 쿠키를 해석 (parseCookies와 비슷한 기능)
app.use(cookieParser(process.env.COOKIE_SECRET));

// 세션 관리용 미들웨어로서, 로그인 등의 이유로 세션을 구현할 때 매우 유용
app.use(session({
  resave: false, //요청이 왔을 때 세션에 수정 사항이 생기지 않더라도 세션을 다시 저장할지에 대한 설정
  saveUninitialized: false, //세션에 저장할 내역이 없더라도 세션을 저장할지에 대한 설정
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
  name: 'session-cookie',
}));

const multer = require('multer');
const fs = require('fs');

try {
  fs.readdirSync('uploads');
} catch (error) {
  console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
  fs.mkdirSync('uploads');
}
const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, 'uploads/');
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      done(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});
app.get('/upload', (req, res) => {
  res.sendFile(path.join(__dirname, 'multipart.html'));
});
app.post('/upload', upload.single('image'), (req, res) => {
  console.log(req.file);
  res.send('ok');
});

app.get('/', (req, res, next) => {
  console.log('GET / 요청에서만 실행됩니다.');
  next();
}, (req, res) => {
  throw new Error('에러는 에러 처리 미들웨어로 갑니다.')
});
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send(err.message);
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
});
