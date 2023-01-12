import passport from 'passport';
import local from './localStrategy.js';
import Test from '../models/test.js';

const passportConfig = () => {
  passport.serializeUser((user, done) => {
    console.log('passport 3번=serializeUser');
    const { user_id } = user;
    // user======== {
    //   user_id: 'hujii0711',
    //   user_name: '김형준',
    //   age: 30,
    //   sex: '남자',
    //   address: 'Cheong-na'
    // }
    done(null, user_id); //deserializeUser에 user_id를 넘긴다
  });

  passport.deserializeUser(async (userId, done) => {
    console.log('passport 5번=deserializeUser');
    // req.session======= Session {
    //   cookie: { path: '/', _expires: null, originalMaxAge: null, httpOnly: true },
    //   passport: { user: '김형준' } ==> 해당 값이 결정된다.
    // }
    const users = await Test.findOne({
      attributes: ['id', 'user_id', 'user_name', 'sex', 'address'],
      where: { user_id: userId },
      raw: true,
    });
    //console.log('users====', users);

    try {
      done(null, users);
    } catch (err) {
      done(err);
    }
  });

  local();
};

export default passportConfig;
