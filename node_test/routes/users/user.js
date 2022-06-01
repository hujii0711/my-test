const express = require('express');
const tokenConfig = require('../../lib/customMiddleware/tokenConfig');
const { isNotLoggedIn } = require('../../lib/bak/loginCheck');
const User = require('../../models/user');
const path = require('path');
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
  const { userId, userPwd, name } = req.body;

  // userId이 이미 존재하는지 확인
  const exists = await User.findByUserId(userId);
  if (exists) {
    const error = new Error('사용자가 이미 존재합니다.');
    next(error);
  }

  // 저장
  const user = await User.create({
    id: 3,
    userId: userId,
    userPwd: userPwd,
    name: name,
    profile: '개발자',
  });

  // 토큰은 따로 발급하지 않음
  res.render('index', { title: 'JWT Token GET' });
  //res.redirect('/');
});

// 로그인 라우터 isNotLoggedIn,
router.post('/login', async (req, res, next) => {
  console.log('로그인 수행 순서 > /login 라우터 호출 ::: 1');

  const { userId, userPwd } = req.body;

  try {
    const userData = await User.findByUserId(userId);

    // 계정이 존재하지 않으면 에러 처리
    if (!userData) {
      const error = new Error('사용자가 존재하지 않습니다.');
      next(error);
    }

    //사용자가 있는 경우
    if (userData) {
      // 비밀번호 체크
      if (userData.userPwd !== userPwd) {
        console.log('비밀번호가 일치하지 않습니다.');
        const error = new Error('비밀번호가 일치하지 않습니다.');
        next(error);
      }
    }

    const token = tokenConfig.generateToken(userData.id, userData.userId);

    res.cookie('access_token', token, {
      maxAge: 1000 * 60, // 1분
      httpOnly: true,
    });
    res.json({
      code: 200,
      message: '토큰이 발급되었습니다',
      token,
    });
    //get요청외에는 바로 페이지 전화 불가
    //res.render('main');
    //res.redirect('/success');
    //res.sendFile(path.join(__dirname, '../../views/main.html'));
  } catch (e) {
    next(e);
  }
});

// 로그아웃 라우터
router.post('/logout', async (req, res, next) => {
  console.log('/logout 라우터 실행!!!====');
  //res.cookie('access_token');
  //req.logout();
  //req.session.destroy();
  res.cookie('access_token');
  res.json({ message: '로그아웃 되었습니다.' });
});

// 로그인 체크
router.get('/check', async (req, res, next) => {
  const user = req.user;
  if (!user) {
    const error = new Error('로그인이 수행되지 않았습니다.');
    next(error);
  }
  req.body = user;

  // try{
  //   const user = req.user;
  //   if (!user) {
  //     throw new Error('로그인이 수행되지 않았습니다.');
  //   }
  // } catch(err){
  //   next(error);
  // }
});

router.get('/insert', async (req, res) => {
  // /user/insert
  try {
    const hashPwd = await bcrypt.hash('1234', 10);
    const user = await User.create({
      //id 컬럼은 자동증가 설정됨
      userId: 'hj',
      userPwd: hashPwd,
      name: '김해주',
      profile: '개발자',
    });

    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get('/select', async (req, res) => {
  try {
    // 비밀번호 검증
    // const users = await User.findAll({
    //   attributes: ['userPwd'],
    //   where: {
    //     id: 4,
    //   },
    //   raw: true,
    // });
    const users = await User.findOne({
      attributes: ['userPwd', 'name'],
      where: {
        id: 4,
      },
    });
    console.log('users1======', users);
    console.log('users2======', users.toJSON());
    //const hashedPassword = users[0].userPwd;
    //const result = await bcrypt.compare('1234', hashedPassword);

    res.json(users);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
