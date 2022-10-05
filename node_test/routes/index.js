import { Router } from 'express';
import passport from 'passport';
//import Test from '../models/test.js';
import { QueryTypes } from 'sequelize';
import db from '../models/index.js';
export const router = Router();

/***************************************
  index 페이지
***************************************/
router.get('/', (req, res) => {
  res.render('index', { title: '세션 DB 연동 테스트' });
});

/***************************************
  로그인 페이지
***************************************/
router.get('/auth/login', (req, res) => {
  res.render('login', { title: '로그인 페이지' });
});

/***************************************
  로그인 수행
***************************************/
// router.post('/auth/loginAction', (req, res) => {
//   const { id, pwd } = req.body;
//   if (id == 'test' && pwd === '1234') {
//     const userInfo = {
//       user_name: '김형준',
//       age: 30,
//       sex: '남자',
//       address: 'Cheong-na',
//     };
//     req.session.userInfo = userInfo;
//     res.redirect('/userInfo');
//   } else {
//     res.status(200).send({ code: 2, msg: '다시 한번 확인해주세요' });
//   }
// });

router.post('/auth/loginAction', (req, res, next) => {
  passport.authenticate('local', (authError, user, options) => {
    console.log('passport 2번=passport.authenticate');
    console.log('passport.authenticate >>>> user===', user);
    console.log('passport.authenticate >>>> options===', options);
    if (authError) {
      console.error(authError);
      return next(authError);
    }

    if (!user) {
      const err = new Error(options.message);
      return next(err);
    }

    return req.login(user, (loginError) => {
      console.log('passport 4번=req.login');
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }

      res.redirect('/userInfo');
    });
  })(req, res, next); // 미들웨어 내의 미들웨어에는 (req, res, next)를 붙입니다.
});

/***************************************
  로그인후 사용자 정보
***************************************/
router.get('/userInfo', (req, res) => {
  console.log('userInfo >>> req.session=======', req.session);
  console.log('userInfo >>> req.sessionID=======', req.sessionID);
  console.log('userInfo >>> req.user=======', req.user);
  console.log(
    'userInfo >>> req.isAuthenticated()=======',
    req.isAuthenticated()
  );
  res.render('userInfo', {
    userInfo: req.user,
  });
});

/***************************************
  로그아웃
***************************************/
router.get('/auth/logout', (req, res) => {
  req.logout();

  // req.session 객체의 내용을 제거
  req.session.destroy((err) => {
    res.redirect('/');
  });
});

/***************************************
  저수준 쿼리 테스트
***************************************/
router.get('/rawQuery', async (req, res) => {
  const query = `SELECT * FROM example.tests WHERE user_id='test'`;
  const result = await db.sequelize.query(query, { type: QueryTypes.SELECT });
  console.log('result====', result);
  res.redirect('/');
});

// router.get('/', (req, res) => {
//   //res.render('main', { title: 'MAIN' });
//   //res.sendFile('public/index1.html');
//   //router post 방식은 res.render로 페이지 전환 불가
//   //res.sendFile(path.join(__dirname, '/views/main.html'));
// });
