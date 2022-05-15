const express = require('express');
const { sequelize } = require('./models');

const app = express();
app.set('port', process.env.PORT || 5001);

sequelize
  .sync({ force: false })
  .then(() => {
    console.log('데이터베이스 연결 성공');
  })
  .catch((err) => {
    console.error(err);
  });

const indexRouter = require('./routes');
const postRounter = require('./routes/post/post');
const userRouter = require('./routes/user/user');

app.use('/', indexRouter);
app.use('/post', postRounter);
app.use('/user', userRouter);

// 404 에러 라우터
app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send('에러 처리 라우터');
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
});
