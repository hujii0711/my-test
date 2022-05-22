const checkLoggedIn = (req, res, next) => {
  console.log('checkLoggedIn===', res.status);

  // 로그인 성공시
  return next();

  // 로그인 실패시
  // 1) 에러 처리 라우터로 전달
  //throw new Error('에러는 에러 처리 미들웨어로 갑니다.');
  // 2) 에러 메시지 자체 처리
  //res.status(401).send('로그인하지 않은 사용자만 접근 가능합니다.');
};

module.exports = checkLoggedIn;
