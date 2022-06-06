const express = require('express');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const { isLoggedIn, isNotLoggedIn } = require('./global/loginCheck');
const User = require('../models/user');

const router = express.Router();

// #. 회원 가입 라우터 /auth/join
router.post('/join', isNotLoggedIn, async (req, res, next) => {
  const { email, nick, password } = req.body;
  try {
    const exUser = await User.findOne({ where: { email } });
    if (exUser) {
      return res.redirect('/join?error=exist');
    }
    const hash = await bcrypt.hash(password, 12);
    await User.create({
      email,
      nick,
      password: hash,
    });
    return res.redirect('/');
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

// #. 로그인 라우터 /auth/login
router.post('/login', isNotLoggedIn, (req, res, next) => {
  passport.authenticate('local', (authError, user, info) => { // 로컬 로그인 전략 수행
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!user) { // 회원정보 없으면 user에 null을 반환
      return res.redirect(`/?loginError=${info.message}`);
    }
    // 로그인 전략이 성공하면 req.login 메서드를 호출한다.
    // Passport는 req 객체에 login과 logout 메서드를 추가한다.
    // req.login은 passport.serializeUser를 호출한다. req.login에서 제공하는 user 객체가 serializeUser롤 넘어가게 된다.
    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      return res.redirect('/');
    });
  })(req, res, next); // 미들웨어 내의 미들웨어에는 (req, res, next)를 붙입니다.
});

// #. 로그아웃 라우터 /auth/logout
router.get('/logout', isLoggedIn, (req, res) => {
  // req.logout 메서드는 req.user 객체를 제거
  console.log("/logout 콜백")
  req.logout();
  // req.session.destroy 메서드는 req.session 객체의 내용을 제거
  req.session.destroy();
  res.redirect('/'); 
});

router.get('/kakao', passport.authenticate('kakao'));

router.get('/kakao/callback', passport.authenticate('kakao', {
  failureRedirect: '/',
}), (req, res) => {
  res.redirect('/');
});

module.exports = router;
