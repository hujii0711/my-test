const express = require('express');
const router = express.Router();

// passport를 활용한 세션 관리
// 로그인 라우터 isNotLoggedIn,
router.post('/login', async (req, res, next) => {
  console.log('로그인 수행 순서 > /login 라우터 호출 ::: 1');

  // 로컬 로그인 전략 수행
  passport.authenticate('local', (authError, user, info) => {
    if (authError) {
      //localStrategy ---> done(error);
      console.error(authError);
      return next(authError);
    }

    if (!user) {
      //localStrategy ---> done(null, false, { message: '가입되지 않은 회원입니다.' });
      return res.redirect(`/?loginError=${info.message}`);
    }
    // 로그인 전략이 성공하면 req.login 메서드를 호출한다.
    // Passport는 req 객체에 login과 logout 메서드를 추가한다.
    // req.login은 passport.serializeUser를 호출한다. req.login에서 제공하는 user 객체가 serializeUser롤 넘어가게 된다.
    console.log('로그인 수행 순서 > localStrategy 전략 수행 결과::: 3');

    return req.login(user, (loginError) => {
      console.log(
        '로그인 수행 순서 > req.login 호출 후 serializeUser 수행 결과 ::: 5'
      );
      if (loginError) {
        // passport.serializeUser() 내부의 done(); 함수 수행시
        console.error('loginError============', loginError);
        return next(loginError);
      }

      // 토큰 생성
      const { id, userId } = req.user;
      const token = tokenConfig.generateToken(id, userId);
      res.cookie('access_token', token, {
        maxAge: 1000 * 60, // 1분
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
  console.log('/getUserInfo 라우터 실행#######################', req.user);
  res.json(req.user);
});

// 토큰발급 라우터
router.post('/geneToken', async (req, res, next) => {
  console.log('/geneToken 라우터 실행!!!====');
  const { userId } = req.body;

  try {
    const userData = await User.findByUserId(userId);
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
  } catch (e) {}
});

// 로그아웃 라우터
router.get('/logout', async (req, res, next) => {
  console.log('/logout 라우터 실행!!!====');
  //res.cookie('access_token');
  //req.logout();
  //req.session.destroy();
  res.cookie('access_token');
  res.json({ message: '로그아웃 되었습니다.' });
});

// 회원가입 페이지 이동 라우터
router.get('/goRegister', async (req, res, next) => {
  console.log('/goRegister 라우터 실행!!!====');
  res.render('register', { title: '회원가입' });
});

// 추후 미들웨어나 모듈로 변경
router.post('/validToken', async (req, res, next) => {
  console.log('/validToken 라우터 실행!!!====');
  try {
    const token = tokenConfig.verifyToken(req);
    console.log('validToken >>>>>> token====', token);
    res.json({
      code: 200,
      message: '토큰이 검증되었습니다',
      token,
    });
  } catch (e) {
    //ctx.throw(500, e);
  }
});

// 조회: GET
router.get('/select', async (req, res) => {
  // /user/select
  //http://localhost:5001/user/select/aa ---> req.params===={ id: 'aa' }
  //http://localhost:5001/user/select?aaa=111&bbb=222 ---> req.query==== { aaa: '111', bbb: '222' }
  try {
    const users = await User.findAll({
      attributes: ['name', 'profile'],
      where: {
        id: 1,
      },
      raw: true,
    });

    // User.findAll({
    //   attributes: ['name', 'profile'],
    //   where: {
    //     id: 1,
    //   },
    // }).then((result) => {
    //   console.log('result-----', result);
    // });

    //const { username, password } = { username: '김형준', password: 1234 };

    // static메소드로 인스턴스 생성없이 바로 가져오기
    //const name = await User.findByUsername(username);
    //console.log('name====', name);

    // 인스턴스 생성하여 가져오기
    //const user = new User();
    //const pwd = await user.setPassword(password);
    //console.log('pwd====', pwd);

    res.json(users);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// 등록 : POST
router.get('/insert', async (req, res) => {
  // /user/insert
  try {
    const user = await User.create({
      id: 1,
      userId: 'hj',
      userPwd: '1234',
      name: '김해주',
      profile: '개발자',
    });

    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// 수정 : PUT
router.get('/update', async (req, res) => {
  // /user/update
  try {
    const result = await User.update(
      {
        profile: '디자이너',
      },
      {
        where: { id: 1 },
      }
    );
    res.json(result);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// 삭제 : DELETE
router.get('/delete', async (req, res) => {
  // /user/delete
  try {
    const result = await User.destroy({ where: { id: 1 } });
    res.json(result);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get('/', (req, res) => {
  // /user
  console.log('user Router___GET');
  res.send('user Router___GET');
});

router.post('/', (req, res) => {
  // /user
  console.log('user Router___POST');
  res.send('user Router___POST');
});

// const User = require('../../models/user');

// exports.dbSelect = async (req, res) => {
//   console.log('userCtrl >>>>> dbSelect====');
//   try {
//     const users = await User.findAll();
//     console.log('users=====', users);
//     res.json(users);
//   } catch (err) {
//     console.error(err);
//     next(err);
//   }
// };

// exports.dbInsert = (param) => {
//   console.log('userCtrl >>>>> dbInsert====', param);
// };

// exports.dbUpdate = (param) => {
//   console.log('userCtrl >>>>> dbUpdate====', param);
// };

// exports.dbDelete = (param) => {
//   console.log('userCtrl >>>>> dbDelete====', param);
// };
