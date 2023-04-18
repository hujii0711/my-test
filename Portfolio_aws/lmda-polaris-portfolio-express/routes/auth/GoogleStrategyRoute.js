const passport = require("passport");
const googleStrategyRouter = require("express").Router();
const {
  passportGoogleConfig,
  sessionMiddleware,
} = require("../../modules/passport/google");

passportGoogleConfig();
googleStrategyRouter.use(sessionMiddleware);
googleStrategyRouter.use(passport.initialize());
googleStrategyRouter.use(passport.session());

googleStrategyRouter.get(
  "/auth/googleLogin",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

googleStrategyRouter.get(
  "/auth/googleCallback",
  passport.authenticate("google", { failureRedirect: "/fail" }),
  (req, res) => {
    // 로그인 성공 시 리다이렉트할 URL
    //res.redirect("success");
    //res.render("success");
  }
);

module.exports.router = googleStrategyRouter;
