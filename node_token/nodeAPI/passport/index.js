const passport = require('passport');
const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');
const User = require('../models/user');

// 전체 과정 요약
// 1. 로그인 요청이 들어옴
// 2. passport.authenticate 메서드 호출
// 3. 로그인 전략 수행
// 4. 로그인 성공 시 사용자 정보 객체와 함께 request.login 호출
// 5. request.login 메서드가 passport.serializeUser 호출
// 6. request.session 사용자 아이디만 저장
// 7. 로그인 완료

// 로그인 이후의 과정
// 1. 모든 요청에 passport.session() 미들웨어가 passport.deserializeUser 메서드 호출
// 2. request.session에 저장된 아이디로 데이터베이스에서 사용자 조회
// 3. 조회된 사용자 정보를 request.user에 저장
// 4. 라우터에서 request.user 객체 사용 가능

module.exports = () => {
  //serializeUser : 사용자 정보 객체를 세션에 아이디로 저장
  //request.session 객체에 어떤 데이터를 저장할지 선택
  passport.serializeUser((user, done) => {
    done(null, user.id); // 첫번째 인자: 에러 발생시 사용, 두번째 인자: 세션에 저장할 사용자 정보
  });

  //deserializeUser : 세션에 저장한 아이디를 통해 사용자 정보 객체를 불러오는 것
  //deserializeUser는 매 요청시 실행된다.
  //passport.session() 미들웨어가 이 메서드를 호출한다. 조금 전에 serializeUser에서 세션에 저장했던 아이디를 받아 데이터베이스에서
  //사용자 정보를 조회한다. 조회한 정보를 request.user에 저장하므로 앞으로 request.user를 통해 로그인한 사용자의 정보를 가져올 수 있다.

  passport.deserializeUser((id, done) => {
    User.findOne({
      where: { id },
      include: [{
        model: User,
        attributes: ['id', 'nick'],
        as: 'Followers',
      }, {
        model: User,
        attributes: ['id', 'nick'],
        as: 'Followings',
      }],
    })
      .then(user => done(null, user))
      .catch(err => done(err));
  });

  local();
  kakao();
};
