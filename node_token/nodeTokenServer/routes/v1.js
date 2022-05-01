const express = require('express');
const jwt = require('jsonwebtoken');

const { verifyToken, deprecated } = require('./middlewares');
const { Domain, User, Post, Hashtag } = require('../models');

const router = express.Router();

router.use(deprecated);

// 전달받은 클라이언트 비밀키로 도메인이 등록된 것인지를 확인
// 등록되지 않은 도메인이라면 에러 메시지로 응답하고, 등록된 도메인이라면 토큰을 발급해서 응답한다.
// 토큰은 jwt.sign 메서드로 발급 받을 수 있다.
router.post('/token', async (req, res) => {
  const { clientSecret } = req.body;
  try {
    const domain = await Domain.findOne({
      where: { clientSecret },
      include: {
        model: User,
        attribute: ['nick', 'id'],
      },
    });
    if (!domain) {
      return res.status(401).json({
        code: 401,
        message: '등록되지 않은 도메인입니다. 먼저 도메인을 등록하세요',
      });
    }
    //jwt.sign({}, "", {});
    // 토큰은 jwt.sign 메서드로 발급 받을 수 있다.
    // 첫번째 인자: 토큰의 내용
    // 두번째 인자: 토큰의 비밀키
    // 세번째 인자: 토큰의 설정
    const token = jwt.sign(
    //토큰의 내용
    { 
      id: domain.User.id,
      nick: domain.User.nick,
    },
    //토큰의 설정
    process.env.JWT_SECRET,
    //토큰의 설정
    { 
      expiresIn: '1m', // 유효기간 : 1분 (발급된지 1분이 지나면 토큰이 만료되므로 만료되었다면 토큰을 재발급 받아야 한다.)
      issuer: 'Kim Hyung Jun', // 발급자 정보
    });
    return res.json({
      code: 200,
      message: '토큰이 발급되었습니다',
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      message: '서버 에러',
    });
  }
});

// 사용자가 발급받은 토큰을 테스트 해볼 수 있는 라우터
// 토큰을 검증하는 미들웨어를 거친 후, 검증이 성공했다면 토큰의 내용물을 응답으로 보내준다.
router.get('/test', verifyToken, (req, res) => {
  res.json(req.decoded);
});

router.get('/posts/my', verifyToken, (req, res) => {
  Post.findAll({ where: { userId: req.decoded.id } })
    .then((posts) => {
      console.log(posts);
      res.json({
        code: 200,
        payload: posts,
      });
    })
    .catch((error) => {
      console.error(error);
      return res.status(500).json({
        code: 500,
        message: '서버 에러',
      });
    });
});

router.get('/posts/hashtag/:title', verifyToken, async (req, res) => {
  try {
    const hashtag = await Hashtag.findOne({ where: { title: req.params.title } });
    if (!hashtag) {
      return res.status(404).json({
        code: 404,
        message: '검색 결과가 없습니다',
      });
    }
    const posts = await hashtag.getPosts();
    return res.json({
      code: 200,
      payload: posts,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      message: '서버 에러',
    });
  }
});

module.exports = router;
