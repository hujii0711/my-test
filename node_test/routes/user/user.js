const express = require('express');
const tokenConfig = require('../../lib/customMiddleware/tokenConfig');
const { isNotLoggedIn } = require('../../lib/bak/loginCheck');
const User = require('../../models/user');
const path = require('path');
const router = express.Router();

// user 로 호출되는 모든 라우터 실행전에 호출되는 미들웨어
router.use((req, res, next) => {
  console.log('/user 라우터의 공통 실행 미들웨어!!!!!!');
  next();
});

router.post('/register', async (req, res, next) => {
  
  console.log("/register 라우터 실행!!!====")
  const { userId, userPwd, name } = req.body;

  // userId이 이미 존재하는지 확인
  const exists = await User.findByUserId(userId);
  if (exists) {
    const error = new Error("사용자가 이미 존재합니다.");
    next(error);
  }

  // 저장
  const user = await User.create({

    id: 3,
    userId : userId,
    userPwd : userPwd,
    name: name,
    profile: '개발자',
  });

  // 토큰은 따로 발급하지 않음
  res.render('index', { title: 'JWT Token GET' });
  //res.redirect('/');
});

// 로그인 라우터 isNotLoggedIn, 
router.post('/login', async (req, res, next) => {
  console.log("로그인 수행 순서 > /login 라우터 호출 ::: 1");

  const { userId, userPwd } = req.body;

  try {
    const userData = await User.findByUserId(userId);

    // 계정이 존재하지 않으면 에러 처리
    if (!userData) {
      const error = new Error("사용자가 존재하지 않습니다.");
      next(error);
    }

    //사용자가 있는 경우
    if (userData) {
      // 비밀번호 체크
      if(userData.userPwd !== userPwd){
        console.log("비밀번호가 일치하지 않습니다.");
        const error = new Error("비밀번호가 일치하지 않습니다.");
        next(error);
      }
    }

    const token = tokenConfig.generateToken(userData.id, userData.userId);
    
    res.cookie('access_token', token, {
      maxAge: 1000 * 60,  // 1분
      httpOnly: true,
    });
    res.json({
      code: 200,
      message: '토큰이 발급되었습니다',
      token,
    });
    //get요청외에는 바로 페이지 전화 불가
    //res.render('main');
    //res.redirect('/success');
    //res.sendFile(path.join(__dirname, '../../views/main.html')); 
  } catch (e) {
    next(e);
  }
});

// 토큰발급 라우터
router.post('/geneToken', async (req, res, next) => {
  console.log("/geneToken 라우터 실행!!!====")
  const { userId } = req.body;

  try {
    const userData = await User.findByUserId(userId);
    const token = tokenConfig.generateToken(userData.id, userData.userId);
    res.cookie('access_token', token, {
      maxAge: 1000 * 60,  // 1분
      httpOnly: true,
    });
    res.json({
      code: 200,
      message: '토큰이 발급되었습니다',
      token,
    });
  } catch (e) {
  }
});

// 로그아웃 라우터
router.get('/logout', async (req, res, next) => {
  console.log("/logout 라우터 실행!!!====")
  //res.cookie('access_token');
  //req.logout();
  //req.session.destroy();
  res.cookie('access_token');
  res.json({message : "로그아웃 되었습니다."});
});

// 회원가입 페이지 이동 라우터
router.get('/goRegister', async (req, res, next) => {
  console.log("/goRegister 라우터 실행!!!====")
  res.render('register', { title: '회원가입' });
});



// 추후 미들웨어나 모듈로 변경
router.post('/validToken', async (req, res, next) => {
  console.log("/validToken 라우터 실행!!!====");
  try {
    const token = tokenConfig.verifyToken(req);
    console.log("validToken >>>>>> token====", token)
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
      raw : true
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
      userId :"hj",
      userPwd : "1234",
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

module.exports = router;
