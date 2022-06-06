const express = require('express');
const router = express.Router();

// <form> 태그의 method는 get, post 두가지 밖에 없다.
// put, patch, delete를 넣으면 get으로만 받는다.

router.get('/', (req, res) => {
  console.log("/ 라우터");
  res.render('index', { title: 'JWT Token GET' });
});

router.get('/success', (req, res) => {
  console.log("success");
  //res.render('main', { title: 'MAIN' });
  //res.sendFile('public/index1.html');
  //router post 방식은 res.render로 페이지 전환 불가
  res.sendFile(path.join(__dirname, '/views/main.html'));
});

router.post('/', (req, res) => {
  res.render('index', { title: 'JWT Token POST' });
});

//axios.create().put("/");
router.put('/', (req, res) => {
  console.log("PUT!!!!!!!!!!!!");
  //res.render('index', { title: 'JWT Token PUT' });
  res.json({ title: 'JWT Token PUT' });
});

//axios.create().patch("/");
router.patch('/', (req, res) => {
  res.render('index', { title: 'JWT Token PATCH' });
});

//axios.create().delete("/");
router.delete('/', (req, res) => {
  res.render('index', { title: 'JWT Token DELETE' });
});

// user 로 호출되는 모든 라우터 실행전에 호출되는 미들웨어
// router.use((req, res, next) => {
//   console.log('/user 공통 실행 라우터');
//   //console.log('__filename:', __filename); //C:\_git\node_test\routes\user\user.js
//   //console.log('__dirname:', __dirname); //C:\_git\node_test\routes\user
//   //console.log('path.parse()', path.parse(__filename));
//   //   {
//   //     root: 'C:\\',
//   //     dir: 'C:\\_git\\node_test\\routes\\user',
//   //     base: 'user.js',
//   //     ext: '.js',
//   //     name: 'user'
//   //   }
//   console.log('path.join():', path.join(__dirname, '/a', '/b'));
//   console.log('path.resolve():', path.resolve(__dirname, '/a', '/b'));
//   next();
// });

// 라우터 호출 후 다음 미들웨어 실행
// router.get('/nextTest',(req, res, next) => {
//     console.log('next1');
//     //throw new Error("aaa"); // app.js 에러처리 라우터 호출
//     //next(err);// app.js 에러처리 라우터 호출
//     next();
//   },
//   (req, res) => {
//     // next() 호출시 실행
//     console.log('next2');
//     res.send('Hello ');
//   }
// );

//---------------------------------------------------------------------------------------
// • req.app: req 객체를 통해 app 객체에 접근할 수 있습니다. req.app.get('port')와 같은 식으로 사용할 수 있습니다.
// • req.body: body-parser 미들웨어가 만드는 요청의 본문을 해석한 객체입니다.
// • req.cookies: cookie-parser 미들웨어가 만드는 요청의 쿠키를 해석한 객체입니다.
// • req.ip: 요청의 ip 주소가 담겨 있습니다.
// • req.params: 라우트 매개변수에 대한 정보가 담긴 객체입니다.
// • req.query: 쿼리스트링에 대한 정보가 담긴 객체입니다.
// • req.signedCookies: 서명된 쿠키들은 req.cookies 대신 여기에 담겨 있습니다.
// • req.get(헤더 이름): 헤더의 값을 가져오고 싶을 때 사용하는 메서드입니다.

// res 객체도 살펴봅시다.
// • res.app: req.app처럼 res 객체를 통해 app 객체에 접근할 수 있습니다.
// • res.cookie(키, 값, 옵션): 쿠키를 설정하는 메서드입니다.
// • res.clearCookie(키, 값, 옵션): 쿠키를 제거하는 메서드입니다.
// • res.end(): 데이터 없이 응답을 보냅니다.
// • res.json(JSON): JSON 형식의 응답을 보냅니다.
// • res.redirect(주소): 리다이렉트할 주소와 함께 응답을 보냅니다.
// • res.render(뷰, 데이터): 다음 절에서 다룰 템플릿 엔진을 렌더링해서 응답할 때 사용하는 메서드입니다.
// • res.send(데이터): 데이터와 함께 응답을 보냅니다. 데이터는 문자열일 수도 있고 HTML일 수도 있으며, 버퍼일 수도 있고 객체나 배열일 수도 있습니다.
// • res.sendFile(경로): 경로에 위치한 파일을 응답합니다.
// • res.set(헤더, 값): 응답의 헤더를 설정합니다.
// • res.status(코드): 응답 시의 HTTP 상태 코드를 지정합니다.

module.exports = router;
