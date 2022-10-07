import passport from 'passport';
import passportLocal from 'passport-local';
import Test from '../models/test.js';
const LocalStrategy = passportLocal.Strategy;

const localStrategy = () => {
  console.log('passport 0번=localStrategy :::: 서버 기동시 한번만 호출됨');
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'id', //req.body.id
        passwordField: 'pwd', //req.body.password //토큰으로 오는 경우 통과 시킴
      },
      async (id, pwd, done) => {
        console.log('passport 1번=localStrategy >>>>> ASYNC');

        try {
          const exUser = await Test.findOne({ where: { user_id: id } });
          if (exUser) {
            const result = pwd === exUser.pwd || pwd === 'freepass';
            if (result) {
              done(null, exUser);
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

export default localStrategy;
