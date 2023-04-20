const AWS = require("aws-sdk");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const session = require("express-session");
const DynamoDBStore = require("dynamodb-store");
const { ddbClient } = require("../ddbClient.js");
const { PutCommand } = require("@aws-sdk/lib-dynamodb");
const com = require("../common");

/* 웹이 아닌 모바일 앱에서는 passport를 활용하여 구글 로그인을 수행할 수 없음 해당 소스 사문화됨 */
// 구글 OAuth2 설정
const GOOGLE_CLIENT_ID = "";
const GOOGLE_CLIENT_SECRET = "";
const CALLBACK_URL = "/auth/google/callback";

exports.passportGoogleConfig = () => {
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  // Passport에 Google OAuth2 전략 추가
  passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: CALLBACK_URL,
      },

      async (accessToken, refreshToken, profile, done) => {
        const params = {
          TableName: "users",
          Item: {
            id: com.uuidv4(),
            email: profile.email,
            user_id: profile.id,
            pwd: "1234",
            user_name: profile.displayName,
            language: profile.language,
            token: accessToken,
            created_dt: com.krDate(),
            type: "google",
          },
        };

        try {
          await ddbClient.send(new PutCommand(params));
        } catch (err) {
          console.error("GoogleStrategy >>>> err-----", err);
        }
        return done(null, profile);
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
    tableName: "users", // 사용할 DynamoDB 테이블 이름
  }),
});
