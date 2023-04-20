const localStrategyRouter = require("express").Router();
const AuthController = require("../../controller/auth/AuthController");

localStrategyRouter.use("/auth", (req, res, next) => {
  console.log("auth 라우터 호출!!!!");
  console.log("auth >>>> req======", req);
  next();
});

/*
  1. 회원가입: register | /auth/register | post
  2. 로그인 수행: login | /auth/login | post
  3. 로그아웃: logout | /auth/logout | get
  4. 자동로그인: autoLogin | /auth/autoLogin | get
*/
localStrategyRouter.post("/auth/register", AuthController.register);
localStrategyRouter.post("/auth/login", AuthController.login); // 로그인이 되어 있지 않아야 통과
localStrategyRouter.post("/auth/logout", AuthController.logout); // 로그인이 되어 있어야 통과
localStrategyRouter.get("/auth/autoLogin", AuthController.autoLogin);
localStrategyRouter.get(
  "/auth/updateSessionExpires",
  AuthController.updateSessionExpires
);

module.exports.router = localStrategyRouter;
