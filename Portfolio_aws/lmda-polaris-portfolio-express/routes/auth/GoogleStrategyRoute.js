const passport = require("passport");
const googleStrategyRouter = require("express").Router();
const httpStatus = require("http-status");

googleStrategyRouter.use("/auth/google", (req, res, next) => {
  console.log("auth/google 라우터 호출!!!!");
  console.log("auth/google >>>> req======", req);
  next();
});

/* 웹이 아닌 모바일 앱에서는 passport를 활용하여 구글 로그인을 수행할 수 없음 해당 소스 사문화됨
  1. 구글 oauth2 로그인 수행: /auth/google/login | get
  2. 구글 oauth2 로그인 수행 후 콜백: /auth/google/callback | get
  3. 구글 oauth2 로그인 수행 실패 처리: /auth/google/fail | get
  4. 구글 oauth2 로그아웃: /auth/google/callback | get
*/
googleStrategyRouter.get(
  "/auth/google/login",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

googleStrategyRouter.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/auth/google/fail" }),
  (req, res) => {
    // 로그인 성공 시 리다이렉트할 URL
    //res.redirect("success");
    //res.render("success");
    res.json({ status: "S" }).status(httpStatus.OK);
  }
);

googleStrategyRouter.get("/auth/google/fail", (req, res) => {
  res.json({ status: "F" }).status(httpStatus.OK);
});

googleStrategyRouter.get("/auth/google/logout", (req, res) => {
  // Passport-Google-OAuth에서 제공하는 revoke 옵션을 사용하여 구글 토큰 해제
  passport.authenticate("google", { revoke: true })(req, res, () => {
    req.logout(); // Passport를 사용하여 로그아웃
    res.json({ status: "S" }).status(httpStatus.OK);
  });
});

module.exports.router = googleStrategyRouter;
