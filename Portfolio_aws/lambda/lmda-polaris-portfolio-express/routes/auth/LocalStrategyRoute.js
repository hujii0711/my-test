const localStrategyRouter = require("express").Router();
const AuthController = require("../../controller/auth/AuthController");

localStrategyRouter.use("/auth", (req, res, next) => {
  console.log("auth 라우터 호출!!!!");
  next();
});

/*
  1. 회원가입: register | /auth/local/register | post
  2. 로그인 수행: login | /auth/local/login | post
  3. 로그아웃: logout | /auth/local/logout | get
  4. 자동로그인: autoLogin | /auth/local/autoLogin | get
  5. session.expires TTL 만료기간 갱신: updateSessionExpires | /auth/local/updateSessionExpires | get
*/
localStrategyRouter.post("/auth/local/register", AuthController.register);
localStrategyRouter.post("/auth/local/login", AuthController.login); // 로그인이 되어 있지 않아야 통과
localStrategyRouter.get("/auth/local/logout", AuthController.logout); // 로그인이 되어 있어야 통과
localStrategyRouter.get("/auth/local/autoLogin", AuthController.autoLogin);
localStrategyRouter.get(
  "/auth/local/updateSessionExpires",
  AuthController.updateSessionExpires
);

module.exports.router = localStrategyRouter;
