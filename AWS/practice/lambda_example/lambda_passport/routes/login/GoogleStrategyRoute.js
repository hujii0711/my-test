const passport = require("passport");
const googleStrategyRouter = require("express").Router();
const { passportConfig, sessionMiddleware } = require("../../passport/google");

passportConfig();
googleStrategyRouter.use(sessionMiddleware);
googleStrategyRouter.use(passport.initialize());
googleStrategyRouter.use(passport.session());

googleStrategyRouter.get("/", (req, res, next) => {
  next();
});

googleStrategyRouter.get("/google", (req, res, next) => {
  res.render("googleLogin");
});

// 구글 로그인 라우트 핸들러
googleStrategyRouter.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// 구글 로그인 콜백 라우트 핸들러
googleStrategyRouter.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/fail" }),
  (req, res) => {
    // 로그인 성공 시 리다이렉트할 URL
    //res.redirect("success");
    res.render("success");
  }
);

googleStrategyRouter.get("/auth/test", (req, res) => {
  res.render("test");
});

module.exports.router = googleStrategyRouter;
