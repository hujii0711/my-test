const passport = require("passport");
const localStrategyRouter = require("express").Router();
const AuthController = require("../../controller/auth/AuthController");
const {
  passportLocalConfig,
  sessionMiddleware,
} = require("../../modules/passport/local");

passportLocalConfig();
localStrategyRouter.use(sessionMiddleware);
localStrategyRouter.use(passport.initialize());
localStrategyRouter.use(passport.session());

localStrategyRouter.use("/auth", (req, res, next) => {
  console.log("auth 라우터 호출!!!!");
  console.log("auth >>>> req======", req);
  next();
});
localStrategyRouter.post("/auth/register", AuthController.register);
localStrategyRouter.post("/auth/login", AuthController.login); // 로그인이 되어 있지 않아야 통과
localStrategyRouter.post("/auth/logout", AuthController.logout); // 로그인이 되어 있어야 통과
localStrategyRouter.get("/auth/autoLogin", AuthController.autoLogin);
localStrategyRouter.get("/auth/status", AuthController.getLoginStatus);

module.exports.router = localStrategyRouter;
