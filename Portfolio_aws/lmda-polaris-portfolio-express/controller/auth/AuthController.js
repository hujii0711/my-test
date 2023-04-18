const tokenConfig = require("../../modules/passport/token");
const passport = require("passport");
const { catchAsync } = require("../../modules/error");
const AuthService = require("../../service/auth/AuthService");
const httpStatus = require("http-status");

/********************************** 
 1. 회원가입
**********************************/
exports.register = (req, res) => {
  const body = req.body;
  const result = AuthService.register(body);
  res.json(result).status(httpStatus.OK);
};

/********************************** 
 2. 로컬 전략 로그인 수행
**********************************/
exports.login = catchAsync(async (req, res, next) => {
  console.log("AuthController >>> login >>> req =====", req);
  passport.authenticate("local", (authError, user, options) => {
    if (authError) {
      return next(authError);
    }

    if (!user) {
      const err = new Error(options.message);
      return next(err);
    }

    return req.login(user, async (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      //토큰 생성
      const id = user.id;
      const userId = user.user_id;
      const email = user.email;
      const token = tokenConfig.generateToken(id, userId, email);

      // token 정보 user 테이블에 update
      const result = await AuthService.updateUserToken({ id, token });

      if (result) {
        const data = {
          sessionUser: user, //세션에 있는 정보: redux 저장
          token, //취득한 토큰 : AsyncStorage에 저장
        };
        return res.json(data).status(httpStatus.OK);
      }
      return res.json({}).status(httpStatus.OK);
    });
  })(req, res, next); // 미들웨어 내의 미들웨어에는 (req, res, next)를 붙입니다.
});

/********************************** 
 3. 로그아웃
**********************************/
exports.logout = catchAsync(async (req, res) => {
  console.log("AuthController >>> logout >>> body =====", req.body);
  const body = req.body;
  const result = await AuthService.updateUserToken(body);
  if (result) {
    const data = {
      sessionUser: null,
      token: null,
    };
    return res.json(data).status(httpStatus.OK);
  }
  return res.json({}).status(httpStatus.OK);
});

/********************************** 
 4. 로그인 여부 확인
**********************************/
exports.loginStatus = catchAsync(async (req, res) => {
  console.log("AuthController >>> loginStatus >>> req.query =====", req.query);
  const query = req.query;
  const result = await AuthService.loginStatus(query);
  console.log("AuthController >>> loginStatus >>> result =====", result);
  res.json(result).status(httpStatus.OK);
});

/********************************** 
 5. 자동 로그인
**********************************/
exports.autoLogin = catchAsync(async (req, res) => {
  console.log("AuthController >>>>>> autoLogin >>>> req.query=====", req.query);
  const token = req.query.token;
  const result = await AuthService.autoLogin(token);
  res.json(result).status(httpStatus.OK);
});
