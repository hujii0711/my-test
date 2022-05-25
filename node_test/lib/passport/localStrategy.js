const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy; // 로그인 전략을 구현하는 Strategy 생성자
const bcrypt = require('bcryptjs');
const User = require('../../models/user');
//LocalStrategy({}, callbackFunc)
// {} : 전략에 관한 설정을 하는 곳
// callbackFunc : 실제 전략을 수행하는 함수
module.exports = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'userId', //req.body.userId
        passwordField: 'userPwd', //req.body.userPwd
      },
      //userId, userPwd: 사용자가 입력한 값
      //done : passport.authenticate의 콜백함수
      async (userId, userPwd, done) => {
        try {
          const exUser = await User.findByUserId(userId);
          console.log("로그인 수행 순서 > LocalStrategy User.findByUserId 수행 결과::: 2");
          if (exUser) {
            //const result = await bcrypt.compare(password, exUser.password); // 사용자의 비밀번호 비교
            if(exUser.userPwd === userPwd){
              done(null, exUser); // 
            } else {
              done(null, false, { message: '비밀번호가 일치하지 않습니다.' });
            }
          } else {
            done(null, false, { message: '가입되지 않은 회원입니다.' });
          }
        } catch (error) {
          console.error("error============", error);
          done(error);
        }
      }
    )
  );
};
