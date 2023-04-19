const AWS = require("aws-sdk");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const session = require("express-session");
const DynamoDBStore = require("dynamodb-store");
const { ddbClient } = require("../ddbClient.js");
const { PutCommand } = require("@aws-sdk/lib-dynamodb");
const com = require("../common");

// 구글 OAuth2 설정
const GOOGLE_CLIENT_ID =
  "568088378939-jemtupaj1rsvcdasr82t8llc677d21j4.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";
const CALLBACK_URL = "/auth/google/callback";

exports.passportGoogleConfig = () => {
  passport.serializeUser((user, done) => {
    // 사용자 정보를 세션에 저장
    console.log("passportGoogleConfig >>> serializeUser >>> user=====", user);
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    // 세션에 저장된 사용자 정보를 복원
    console.log("passportGoogleConfig >>> deserializeUser >>> user=====", user);
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
