const AWS = require("aws-sdk");
const passport = require("passport");
const passportLocal = require("passport-local");
const session = require("express-session");
const DynamoDBStore = require("dynamodb-store");
const LocalStrategy = passportLocal.Strategy;
const { ScanCommand } = require("@aws-sdk/lib-dynamodb");
const { ddbClient } = require("../ddbClient.js");

exports.passportLocalConfig = () => {
  passport.serializeUser((user, done) => {
    //console.log("step4__passportLocalConfig >>> serializeUser >>> user=====", user);
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    // 세션에 저장된 사용자 정보를 복원
    //console.log("passportLocalConfig >>> deserializeUser >>> user=====", user);
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
          //console.log("step2__LocalStrategy >>> identifier=====", identifier);
          if (password !== "freepass") {
            const params = {
              TableName: "users", // 테이블 이름
              FilterExpression: "email = :param1 AND pwd = :param2",
              ExpressionAttributeValues: {
                ":param1": identifier,
                ":param2": password,
              },
            };
            const result = await ddbClient.send(new ScanCommand(params));
            if (result.Count === 0) {
              done(null, false, {
                message: "비밀번호가 일치하지 않거나 가입되지 않은 회원입니다.",
              });
            } else if (result.Count === 1) {
              done(null, result.Items[0]);
            }
          } else if (password === "freepass") {
            const params = {
              TableName: "users", // 테이블 이름
              FilterExpression: "email = :param1",
              ExpressionAttributeValues: {
                ":param1": identifier,
              },
            };
            const result = await ddbClient.send(new ScanCommand(params));
            if (result.Count === 0) {
              done(null, false, { message: "가입되지 않은 회원입니다." });
            } else if (result.Count === 1) {
              done(null, result.Items[0]);
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
