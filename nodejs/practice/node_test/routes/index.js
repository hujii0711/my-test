import { Router } from 'express';
import passport from 'passport';
//import Test from '../models/test.js';
import { QueryTypes } from 'sequelize';
import tokenConfig from '../passport/token.js';
import { sequelize } from '../models/index.js';

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
      // 토큰 취득
      const token = tokenConfig.generateToken(user.user_id);
      res.cookie('access_token', token, {
        maxAge: 1000 * 60 * 60, // 1시간
        httpOnly: true,
      });
      res.status(200).render('userInfo', {
        token, //app asyncStorage에 담기
        userInfo: req.user, // redux 상태에 담기
      });
    });
  })(req, res, next); // 미들웨어 내의 미들웨어에는 (req, res, next)를 붙입니다.
});

/***************************************
  자동로그인 기능
***************************************/
router.get('/auth/autoLogin', (req, res, next) => {
  const _token = req.cookies.access_token ?? '';

  const result = tokenConfig.verifyToken(_token);
  const { status, user_id, pwd, token, message } = result;

  if (status === 'S') {
    res.status(200).render('userInfo', {
      user_id,
      pwd,
      token,
      message,
    });
  } else {
    res.status(200).render('userInfo', {
      message,
    });
  }
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
router.get('/auth/logout', (req, res, next) => {
  if (req.user) {
    console.log('로그아웃 처리');
    req.logout();
    req.session.destroy((err) => {
      if (err) {
        next('세션 삭제시 에러');
      }
      console.log('세션 삭제 성공');
      res.clearCookie('access_token', '', { httpOnly: true });
      res.redirect('/');
    });
  } else {
    console.log('로긴 안되어 있음');
    res.redirect('/auth/login');
  }
});

/***************************************
  저수준 쿼리 테스트
***************************************/
router.get('/rawQuery', async (req, res) => {
  // const param1 = 'test';
  // const param2 = '1234';
  // const query = `SELECT * FROM example.tests WHERE user_id=? and pwd=?`;
  // const result = await sequelize.query(query, {
  //   type: QueryTypes.SELECT,
  //   replacements: [param1, param2],
  // });
  //console.log('result====', result);
  const query1 = `SELECT count(B.id) cnt FROM
	  (SELECT id, title, user_name FROM example.articles WHERE title ='aaaaa') A LEFT JOIN
    (SELECT id, title, user_name FROM example.articles WHERE title ='bbbbb') B ON A.user_name = B.user_name;`;
  const result1 = await sequelize.query(query1, {
    type: QueryTypes.SELECT,
  });
  console.log('result1====', result1);
  console.log('result1.length====', result1.length);
  //[ { cnt: 1, user_name: 'GH' } ]
  const param1 = 0;
  const param2 = 10;
  const query2 = `SELECT *, ROW_NUMBER() OVER(ORDER BY id DESC) AS ROW_NUM
  FROM example.articles ORDER BY ROW_NUM ASC
  LIMIT :offset, :limit;`;
  const result2 = await sequelize.query(query2, {
    type: QueryTypes.SELECT,
    replacements: { offset: param1, limit: param2 },
  });

  console.log('result2====', result2);
  console.log('result2.length====', result2.length);
  // const param3 = 'test';
  // const param4 = '1234';
  // const query1 = `SELECT * FROM example.tests WHERE user_id=:userId and pwd=:password`;
  // const result1 = await db.sequelize.query(query1, {
  //   type: QueryTypes.SELECT,
  //   replacements: { userId: param3, password: param4 },
  // });
  //console.log('result1====', result1);
  res.redirect('/');
});

// router.get('/', (req, res) => {
//   //res.render('main', { title: 'MAIN' });
//   //res.sendFile('public/index1.html');
//   //router post 방식은 res.render로 페이지 전환 불가
//   //res.sendFile(path.join(__dirname, '/views/main.html'));
// });
