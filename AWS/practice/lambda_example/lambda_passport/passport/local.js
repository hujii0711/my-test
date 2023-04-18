const passport = require("passport");
const AWS = require("aws-sdk");
const passportLocal = require("passport-local");
const session = require("express-session");
const DynamoDBStore = require("dynamodb-store");
const LocalStrategy = passportLocal.Strategy;

// AWS 자격 증명 설정
AWS.config.update({
  accessKeyId: "",
  secretAccessKey: "",
  region: "ap-northeast-2", // 사용하려는 AWS 리전 설정
});

const dynamoDBClient = new AWS.DynamoDB.DocumentClient();

// 전체 과정 요약
// 1. 로그인 요청이 들어옴
// 2. passport.authenticate 메서드 호출 [LoginController.ts]
// 3. 로그인 전략 수행 [localStrategy.ts]
// 4. 로그인 성공 시 사용자 정보 객체와 함께 request.login 호출 [LoginController.ts]
// 5. request.login 메서드가 passport.serializeUser 호출 [index.ts]
// 6. request.session 사용자 아이디만 저장
// 7. 로그인 완료

// 로그인 이후의 과정
// 1. 모든 요청에 passport.session() 미들웨어가 passport.deserializeUser 메서드 호출 [index.ts]
// 2. request.session에 저장된 아이디로 데이터베이스에서 사용자 조회
// 3. 조회된 사용자 정보를 request.user에 저장
// 4. 라우터에서 request.user 객체 사용 가능

const passportConfig = () => {
  // Passport 세션 시리얼라이즈 및 디시리얼라이즈 설정
  passport.serializeUser((user, done) => {
    // 사용자 정보를 세션에 저장
    console.log("serializeUser >>> user=====", user);
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    // 세션에 저장된 사용자 정보를 복원
    console.log("deserializeUser >>> user=====", user);
    done(null, user);
  });

  // Passport에 전략 추가
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email", //req.body.identifier
        passwordField: "password", //req.body.password
      },
      (email, password, done) => {
        try {
          const params = {
            TableName: "users", // 테이블 이름
            Key: {
              id: "3d7fb383-f0f7-4904-8f6c-cf2bb93247f1", // 기본 키 값
            },
          };

          dynamoDBClient.get(params, (err, data) => {
            if (err) {
              console.error("Error getting item from DynamoDB:", err);
            } else {
              console.log(
                "Item from DynamoDB::::::::::::::::::::::",
                data.Item
              );
              done(null, data.Item);
            }
          });

          // if (exUser) {
          //   const result = await bcrypt.compare(password, exUser.password);
          //   if (result || password === 'freepass') {
          //     done(null, exUser);
          //   } else {
          //     done(null, false, { message: '비밀번호가 일치하지 않습니다.' });
          //   }
          // } else {
          //   done(null, false, { message: '가입되지 않은 회원입니다.' });
          // }
        } catch (error) {
          console.error(error);
          done(error);
        }
      }
    )
  );
};

const sessionMiddleware = session({
  secret: "hj@1560813", // 세션 데이터를 암호화하기 위한 비밀 키
  resave: false,
  saveUninitialized: false,
  store: new DynamoDBStore({
    AWS: AWS,
    tableName: "users", // 사용할 DynamoDB 테이블 이름
  }),
});

exports.passportConfig = passportConfig;
exports.sessionMiddleware = sessionMiddleware;
