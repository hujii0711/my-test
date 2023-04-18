const passport = require("passport");
const localStrategyRouter = require("express").Router();
const LoginController = require("../../controller/login/LoginController");
const { passportConfig, sessionMiddleware } = require("../../passport/local");

passportConfig();
localStrategyRouter.use(sessionMiddleware);
localStrategyRouter.use(passport.initialize());
localStrategyRouter.use(passport.session());

localStrategyRouter.post("/auth/register", LoginController.register);
localStrategyRouter.post("/auth/localLogin", LoginController.localLogin); // 로그인이 되어 있지 않아야 통과
localStrategyRouter.get("/auth/logout", LoginController.logout); // 로그인이 되어 있어야 통과
localStrategyRouter.get("/auth/autoLogin", LoginController.autoLogin);
localStrategyRouter.get("/auth/status", LoginController.getLoginStatus);
localStrategyRouter.get("/localLogin", (req, res) => {
  res.render("localLogin");
});

module.exports.router = localStrategyRouter;
