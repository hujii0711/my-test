// 로그인한 사용자는 회원가입과 로그인 라우터에 접근하지 않게 하기 위한 미들웨어 추가(접근 권한 제어)

// 로그인한 상태여야 다음 미들웨어 호출 : 자신의 프로필 확인
exports.isLoggedIn = (req, res, next) => {
  // 로그인 여부를 isAuthenticated 메서드를 통해 파악할 수 있다.
  console.log("isLoggedIn >>>>>>> 로그인 했는지 확인 =======", req.isAuthenticated());
  if (req.isAuthenticated()) { //PassPort는 req 객체에 isAuthenticated 메서드를 추가하여 로그인 중이면 true, 아니면 false를 줌
    next(); // 다음 미들웨어로 넘어갈 수 있다.
  } else {
    res.status(403).send('로그인 필요');
  }
};

// 로그인한 상태가 아니여야 다음 미들웨어 호출 : 회원가입 페이지
exports.isNotLoggedIn = (req, res, next) => {
  console.log("isNotLoggedIn >>>>>>> 로그인 안했는지 확인 =======", req.isAuthenticated());
  if (!req.isAuthenticated()) { 
    next(); // 로그인한 상태가 아니라면 다음 미들웨어로 넘어갈 수 있다.
  } else {
    const message = encodeURIComponent('로그인한 상태입니다.');
    res.redirect(`/?error=${message}`);
  }
};
