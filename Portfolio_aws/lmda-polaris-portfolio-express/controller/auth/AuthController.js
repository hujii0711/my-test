const tokenConfig = require("../../modules/passport/token");
const passport = require("passport");
const { catchAsync, ApiError } = require("../../modules/error");
const AuthService = require("../../service/auth/AuthService");
const httpStatus = require("http-status");
const com = require("../../modules/common");

/********************************** 
 1. 회원가입
**********************************/
exports.register = catchAsync(async (req, res) => {
  const body = req.body;
  const result = await AuthService.register(body);
  res.status(httpStatus.OK).json(result);
});

/********************************** 
 2. 로컬 전략 로그인 수행
 cf.) catchAsync(async 사용시 res.json()으로 클라이언트에 넘겨주지 못함
**********************************/
exports.login = catchAsync(async (req, res, next) => {
  console.log("step1__AuthController >>> login >>> req =====", req);
  passport.authenticate("local", (authError, user, options) => {
    console.log("step3__AuthController >>> authenticate >>> user =====", user);
    if (authError) {
      return next(authError);
    }

    if (!user) {
      //const err = new Error(options.message);
      const err = new ApiError(httpStatus.UNAUTHORIZED, options.message);
      return next(err);
    }

    return req.login(user, async (loginError) => {
      if (loginError) {
        return next(loginError);
      }
      console.log("step5__AuthController >>> req.login >>> user =====", user);

      //토큰 생성(토큰은 굳이 필요 없음 AsyncStorage에 users.id 정보만 저장해도됨)
      //passport는 결국 세션 기반 로그인이다.

      //최신 발급받은 토큰을 users.token에 저장(클라이언트에 토큰을 보관하지 않는다.)
      const id = user.id;
      const email = user.email;
      const newToken = tokenConfig.generateToken(id, email);
      const isUpdate = await AuthService.updateUserToken(id, newToken);

      if (!isUpdate) {
        const err = new ApiError(
          httpStatus.UNAUTHORIZED,
          "토큰 동기화 중 오류가 발생하였습니다."
        );
        return next(err);
      }

      const data = {
        sessionUser: { ...user, token: newToken }, //세션에 있는 정보: redux 저장, 최신 발급된 token으로 변경(DB, 클라이언트 동기화)
      };

      //console.log("step5__AuthController >>> data =====", data);

      res.status(httpStatus.OK).json(data);
    });
  })(req, res, next); // 미들웨어 내의 미들웨어에는 (req, res, next)를 붙입니다.
});

/********************************** 
 3. 로그아웃
**********************************/
exports.logout = catchAsync(async (req, res, next) => {
  console.log("AuthController >>>> logout >>>> req.user===", req.user);
  console.log("AuthController >>>> logout >>>> req.session===", req.session);
  console.log(
    "AuthController >>>> logout >>>> req.sessionID===",
    req.sessionID
  );

  //req.logout() 메소드를 사용하여 Passport에서 인증된 세션을 제거
  //await AuthService.updateUserToken(id, "emptyToken");
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
  const id = req.query.autoId;
  const result = await AuthService.autoLogin(id);
  res.status(httpStatus.OK).json(result);
});

/********************************** 
5. sessions.expires TTL 만료기간 갱신
**********************************/
exports.updateSessionExpires = catchAsync(async (req, res) => {
  const result = await AuthService.updateSessionExpires(req.sessionID);
  res.status(httpStatus.OK).json(result);
});

/********************************** 
6. 구글 로그인 후처리
**********************************/
exports.googleLogin = catchAsync(async (req, res) => {
  const body = req.body;
  const result = await AuthService.googleLogin(body);
  console.log("AuthController >>>>>> googleLogin >>>> result=====", result);
  res.status(httpStatus.OK).json(result);
});
