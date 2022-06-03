const passport = require('passport');
const local = require('./localStrategy');
const User = require('../../models/user');

module.exports = () => {

  passport.serializeUser((user, done) => {
    console.log("로그인 수행 순서 > serializeUser 내부 수행 ::: 4");
    done(null, user.userId); // 첫번째 인자: 에러 발생시 사용, 두번째 인자: 세션에 저장할 사용자 정보
  });

  passport.deserializeUser(async (userId, done) => {
    try{
      const user = await User.findByUserInfo(userId);
      console.log("로그인 수행 순서 > deserializeUser 수행 결과 ::: 6");
      done(null, user);
    } catch(err) {
      done(err);
    }
  });

  local();
};
