const AWS = require("aws-sdk");
const passport = require("passport");
const passportLocal = require("passport-local");
const session = require("express-session");
const DynamoDBStore = require("dynamodb-store");
const LocalStrategy = passportLocal.Strategy;
const bcrypt = require("bcryptjs");
const AuthService = require("../../service/auth/AuthService");

exports.passportLocalConfig = () => {
  passport.serializeUser((user, done) => {
    console.log(
      "step4__passportLocalConfig >>> serializeUser >>> user=====",
      user
    );
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    // 세션에 저장된 사용자 정보를 복원
    console.log("passportLocalConfig >>> deserializeUser >>> user=====", user);
    done(null, user);
  });

  // Passport에 전략 추가
  passport.use(
    new LocalStrategy(
      {
        usernameField: "identifier",
        passwordField: "password",
      },
      async (identifier, password, done) => {
        try {
          console.log("step2__LocalStrategy >>> identifier=====", identifier);

          const { Items: userItems, Count } =
            await AuthService.selectFindUserInfo(identifier);

          // 자동로그인 대상
          if (password === "freepass") {
            done(null, userItems[0]);
          } else {
            if (Count > 0) {
              const isPwdSame = bcrypt.compareSync(password, userItems[0].pwd);
              //const isPwdSame = await bcrypt.compare(password, userItems[0].pwd); // controller에서 response를 못보냄
              if (isPwdSame) {
                done(null, userItems[0]);
              } else {
                done(null, false, { message: "비밀번호가 일치하지 않습니다." });
              }
            } else {
              done(null, false, {
                message: "가입되지 않은 회원입니다.",
              });
            }
          }
        } catch (error) {
          done(error);
        }
      }
    )
  );
};

exports.sessionMiddleware = session({
  secret: "hj@1560813", // 세션 데이터를 암호화하기 위한 비밀 키
  resave: false,
  saveUninitialized: false,
  store: new DynamoDBStore({
    AWS: AWS,
    tableName: "portfolio_sessions", // 사용할 DynamoDB 테이블 이름
  }),
});
