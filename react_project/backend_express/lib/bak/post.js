const express = require('express');
const router = express.Router();

// user 로 호출되는 모든 라우터 실행전에 호출되는 미들웨어
// router.use((req, res, next) => {
//   console.log('/user 라우터의 공통 실행 미들웨어!!!!!!');
//   next();
// });

router.get('/insert', async (req, res) => {
  // /posts/insert
  console.log('posts/insert!!!!!!!!!');
  try {
    const post = await Post.create({
      userName: '김해주',
      title: '김해주_title',
      body: '김해주_body',
    });

    res.status(201).json(post);
  } catch (err) {
    console.error(err);
    next(err);
  }
});
