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
        usernameField: 'email', //req.body.email
        passwordField: 'password', //req.body.password
      },
      async (email, password, done) => {
        // 위에서 선언한 email, passport의 값이 들어간다.
        // email, password: 사용자가 입력한 값
        // done : passport.authenticate의 콜백함수
        // done(1, 2, 3);
        // 1 사용하는 경우 : 서버에서 에러가 발생하는 경우
        // 2 사용하지 않은 경우 : 로그인이 실패했을 때, 2 사용하는 경우 : 사용자 정보를 passport.authenticate 보내줌
        // 3 사용하는 경우 : 로그인 처리 과정에서 비밀번호가 일치하지 않거나 존재하지 않는 회원일 때와 같은 사용자 정의 에러가 발생했을 때
        try {
          const exUser = await User.findOne({ where: { email } });

          if (exUser) {
            const result = await bcrypt.compare(password, exUser.password); // 사용자의 비밀번호 비교
            console.log('LocalStrategy >>>>> result====', result);
            if (result) {
              //passport.serializeUser()에 exUser 정보를 보냄
              done(null, exUser); // 비밀번호 일치한 경우 두번째 인자로 사용자 정보 넣어 보냄
            } else {
              done(null, false, { message: '비밀번호가 일치하지 않습니다.' });
            }
          } else {
            done(null, false, { message: '가입되지 않은 회원입니다.' });
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
      }
    )
  );
};
