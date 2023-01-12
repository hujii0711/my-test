const express = require('express');
const {
  generateToken,
  checkLoggedIn,
} = require('../../lib/customMiddleware/tokenConfig');
const User = require('../../models/user');
const router = express.Router();
const bcrypt = require('bcryptjs');
const Joi = require('joi');

router.post('/register', async (req, res, next) => {
  const schema = Joi.object().keys({
    username: Joi.string().alphanum().min(3).max(20).required(),
    password: Joi.string().required(),
  });

  //const result = schema.validate(req.body);
  const result = await schema.validateAsync(req.body);

  if (result.error) {
    const error = new Error('회원 가입 validation을 통과하지 못했습니다.');
    next(error);
  }

  const { username, password } = req.body;

  // userId이 이미 존재하는지 확인
  const exists = await User.findByUserInfo(username);
  if (exists) {
    const error = new Error('사용자가 이미 존재합니다.');
    next(error);
  }

  // 비밀번호 암호화
  const hashPwd = await bcrypt.hash(password, 10);

  // 저장
  const userData = await User.create({
    username,
    hashedPassword: hashPwd,
  });

  const token = generateToken(userData.id, userData.username);

  res.cookie('access_token', token, {
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7일
    httpOnly: true,
  });

  res.status(200).json({
    code: 'success',
    message: '회원가입이 정상 수행되었습니다.',
    resp: userData,
  });
});

// 로그인 라우터 isNotLoggedIn,
router.post('/login', async (req, res, next) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      const error = new Error('아이디 또는 비밀번호를 입력하세요.');
      next(error);
    }

    const userData = await User.findByUserInfo(username);

    // 계정이 존재하지 않으면 에러 처리
    if (!userData) {
      const error = new Error('사용자가 존재하지 않습니다.');
      next(error);

      //사용자가 있는 경우
    } else {
      // 비밀번호 체크
      const checkPwd = await bcrypt.compare(password, userData.hashedPassword);
      if (!checkPwd) {
        console.log('비밀번호가 일치하지 않습니다.');
        const error = new Error('비밀번호가 일치하지 않습니다.');
        next(error);
      }
    }

    // 로그인 성공 이후 토큰 생성
    const token = generateToken(userData.id, userData.username);

    res.cookie('access_token', token, {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7일
      httpOnly: true,
    });

    res.status(200).json({
      code: 'success',
      message: '로그인이 정상 수행되었습니다.',
      token,
      resp: userData,
    });
  } catch (err) {
    next(err);
  }
});

// 로그인 체크
router.get('/check', async (req, res, next) => {
  const tokenUserInfo = req.tokenUserInfo;
  if (!tokenUserInfo) {
    const error = new Error('로그인이 수행되지 않았습니다.');
    next(error);
  }

  res.status(200).json({
    code: 'success',
    message: '로그인이 정상적으로 수행되었습니다.',
    resp: tokenUserInfo,
  });
  // try{
  //   const user = req.user;
  //   if (!user) {
  //     throw new Error('로그인이 수행되지 않았습니다.');
  //   }
  // } catch(err){
  //   next(error);
  // }
});

// 로그아웃 라우터
router.post('/logout', checkLoggedIn, async (req, res, next) => {
  res.clearCookie('access_token', '', { httpOnly: true });
  res.status(200).json({
    code: 'success',
    message: '로그아웃이 정상 수행되었습니다.',
  });
});

module.exports = router;
