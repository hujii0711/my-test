const token = require("../../passport/token");
const passport = require("passport");

exports.register = (req, res) => {
  const body = req.body;
  const result = LoginService.register(body);
  res.json(result).status(200);
};

exports.localLogin = (req, res, next) => {
  passport.authenticate("local", (authError, user, options) => {
    if (authError) {
      return next(authError);
    }

    if (!user) {
      const err = new Error(options.message);
      return next(err);
    }

    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }

      //토큰 생성
      const id = user.id;
      const userId = user.user_id;
      const email = user.email;
      const token = token.generateToken(id, userId, email);

      const result = {
        sessionUser: user, //세션에 있는 정보: redux 저장
        token, //취득한 토큰 : AsyncStorage에 저장
      };
      console.error("LoginController >>>> login >>>> result=========", result);
      res.json(result).status(200);
    });
  })(req, res, next); // 미들웨어 내의 미들웨어에는 (req, res, next)를 붙입니다.
};

exports.logout = (req, res) => {
  // DDB 사용자 정보 제거
  // token 정보 제거
};

exports.getLoginStatus = (req, res) => {
  console.log("getLoginStatus >>> 세션 정보 req.user=====", req.user);
  console.log("getLoginStatus >>> 세션 정보 req.session=====", req.session);
  //console.log('getLoginStatus >>> 토큰 req.tokenUserInfo=====', req.tokenUserInfo);

  const result = {
    user: req.user,
    session: req.session,
    isAuthenticated: req.isAuthenticated(),
  };

  res.json(result).status(200);
};

exports.autoLogin = (req, res) => {
  //const token = req.headers.authorization ?? '';
  const token = req.params.token;
  const result = LoginService.autoLogin(token);
  res.json(result).status(200);
};
