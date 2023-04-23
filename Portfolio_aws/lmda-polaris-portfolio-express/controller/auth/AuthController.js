const tokenConfig = require("../../modules/passport/token");
const passport = require("passport");
const { catchAsync } = require("../../modules/error");
const AuthService = require("../../service/auth/AuthService");
const httpStatus = require("http-status");
const com = require("../../modules/common");

/********************************** 
 1. 회원가입
**********************************/
exports.register = catchAsync(async (req, res) => {
  const body = req.body;
  const result = await AuthService.register(body);
  res.json(result).status(httpStatus.OK);
});

/********************************** 
 2. 로컬 전략 로그인 수행
**********************************/
exports.login = catchAsync(async (req, res, next) => {
  //console.log("step1__AuthController >>> login >>> req =====", req);
  passport.authenticate("local", (authError, user, options) => {
    //console.log("step3__AuthController >>> authenticate >>> user =====", user);
    if (authError) {
      return next(authError);
    }

    if (!user) {
      const err = new Error(options.message);
      return next(err);
    }

    return req.login(user, async (loginError) => {
      if (loginError) {
        return next(loginError);
      }
      //console.log("step5__AuthController >>> req.login >>> user =====", user);

      //토큰 생성(토큰은 굳이 필요 없음 AsyncStorage에 users.id 정보만 저장해도됨)
      //passport는 결국 세션 기반 로그인이다.
      const id = user.id;
      const email = user.email;
      const token = tokenConfig.generateToken(id, email);

      const data = {
        sessionUser: user, //세션에 있는 정보: redux 저장
        token, //취득한 토큰 : AsyncStorage에 저장
      };
      res.status(httpStatus.OK).json(data);
    });
  })(req, res, next); // 미들웨어 내의 미들웨어에는 (req, res, next)를 붙입니다.
});

/********************************** 
 3. 로그아웃
**********************************/
exports.logout = catchAsync(async (req, res, next) => {
  console.log("AuthController >>>>>> logout =====");

  //req.logout() 메소드를 사용하여 Passport에서 인증된 세션을 제거
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    //req.session.destroy() 메소드를 사용하여 세션 데이터베이스에서 해당 세션 정보를 삭제
    req.session.destroy();
    res.status(httpStatus.OK).json(com.httpRespMsg("S", "로그아웃 성공"));
  });

  /* 오류 발생
    req.logout();
    req.session.destroy((err) => {
      res.json({ message: "로그아웃 성공!!" }).status(httpStatus.OK);
    });
  */
});

/********************************** 
4. 자동 로그인
**********************************/
exports.autoLogin = catchAsync(async (req, res) => {
  console.log("AuthController >>>>>> autoLogin >>>> req.query=====", req.query);
  const token = req.query.token;
  const result = await AuthService.autoLogin(token);
  res.status(httpStatus.OK).json(result);
});

/********************************** 
5. sessions.expires TTL 만료기간 갱신
**********************************/
exports.updateSessionExpires = catchAsync(async (req, res) => {
  const result = await AuthService.updateSessionExpires(req.sessionID);
  res.status(httpStatus.OK).json(result);
});
