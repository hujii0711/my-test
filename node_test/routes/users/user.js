const express = require('express');
const tokenConfig = require('../../lib/customMiddleware/tokenConfig');
const checkLoggedIn = require('../../lib/customMiddleware/checkLoggedIn');
const User = require('../../models/user');
const router = express.Router();
const bcrypt = require('bcryptjs');

/***********************************************
 * auth.post('/register', authCtrl.register);
 * auth.post('/login', authCtrl.login);
 * auth.get('/check', authCtrl.check);
 * auth.post('/logout', authCtrl.logout);
 ***********************************************/
// user 로 호출되는 모든 라우터 실행전에 호출되는 미들웨어
router.use((req, res, next) => {
  console.log('/user 라우터의 공통 실행 미들웨어!!!!!!');
  next();
});

router.post('/register', async (req, res, next) => {
  console.log('/register 라우터 실행!!!====');
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
    hashedPassword : hashPwd
  });
  console.log("db_save====", user);
  const token = tokenConfig.generateToken(userData.id, userData.username);

  res.cookie('access_token', token, {
    maxAge: 1000 * 60, // 1분
    httpOnly: true,
  });

  res.status(200).json({
    code: "success",
    message: '회원가입이 정상 수행되었습니다.',
    data : user
  });
});

// 로그인 라우터 isNotLoggedIn,
router.post('/login', async (req, res, next) => {
  console.log('로그인 수행 순서 > /login 라우터 호출 ::: 1');

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
      const checkPwd = await bcrypt.compare(password, userData.password);

      if (!checkPwd) {
        console.log('비밀번호가 일치하지 않습니다.');
        const error = new Error('비밀번호가 일치하지 않습니다.');
        next(error);
      }
    }

    // 로그인 성공 이후 토큰 생성
    const token = tokenConfig.generateToken(userData.id, userData.userId);

    res.cookie('access_token', token, {
      maxAge: 1000 * 60, // 1분
      httpOnly: true,
    });

    res.status(200).json({
      code: "success",
      message: '로그인이 정상 수행되었습니다.',
      token,
      data : userData
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
  //req.body = tokenUserInfo;
  res.status(200).json({
    code: "success",
    message: '로그인이 정상적으로 수행되었습니다.',
    tokenUserInfo
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
router.get('/logout', checkLoggedIn, async (req, res, next) => {
  console.log('/logout 라우터 실행!!!====');
  //res.cookie('access_token');
  //req.logout();
  //req.session.destroy();
  res.clearCookie('access_token', "", {httpOnly: true});
  //res.cookie('access_token','',{maxAge:0});
  res.status(200).json({
    code: "success",
    message: '로그아웃이 정상 수행되었습니다.'
  });
});

module.exports = router;
