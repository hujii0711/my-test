const express = require('express');
const router = express.Router();

// passport를 활용한 세션 관리
// 로그인 라우터 isNotLoggedIn, 
router.post('/login', async (req, res, next) => {
    console.log("로그인 수행 순서 > /login 라우터 호출 ::: 1");
  
    // 로컬 로그인 전략 수행
    passport.authenticate('local', (authError, user, info) => {
  
      if (authError) { //localStrategy ---> done(error);
        console.error(authError);
        return next(authError);
      }
  
      if (!user) {  //localStrategy ---> done(null, false, { message: '가입되지 않은 회원입니다.' });
        return res.redirect(`/?loginError=${info.message}`);
      }
      // 로그인 전략이 성공하면 req.login 메서드를 호출한다.
      // Passport는 req 객체에 login과 logout 메서드를 추가한다.
      // req.login은 passport.serializeUser를 호출한다. req.login에서 제공하는 user 객체가 serializeUser롤 넘어가게 된다.
      console.log("로그인 수행 순서 > localStrategy 전략 수행 결과::: 3");
  
      return req.login(user, (loginError) => {
  
        console.log("로그인 수행 순서 > req.login 호출 후 serializeUser 수행 결과 ::: 5");
        if (loginError) { // passport.serializeUser() 내부의 done(); 함수 수행시
          console.error("loginError============", loginError);
          return next(loginError);
        }
  
        // 토큰 생성
        const {id, userId} = req.user;
        const token = tokenConfig.generateToken(id, userId);
        res.cookie('access_token', token, {
          maxAge: 1000 * 60,  // 1분
          httpOnly: true,
        });
        res.json({
          code: 200,
          message: '토큰이 발급되었습니다',
          token,
        });
      });
    })(req, res, next);
});
  
// 세션의 사용자 정보 취득
router.post('/getUserInfo', async (req, res, next) => {
    console.log("/getUserInfo 라우터 실행#######################", req.user);
    res.json(req.user);
});