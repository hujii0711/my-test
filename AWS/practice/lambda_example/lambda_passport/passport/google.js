const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const AWS = require('aws-sdk');
const session = require('express-session');
const DynamoDBStore = require('dynamodb-store');

// AWS 자격 증명 설정
AWS.config.update({
  accessKeyId: '',
  secretAccessKey: '',
  region: 'ap-northeast-2', // 사용하려는 AWS 리전 설정
});

const dynamoDBClient = new AWS.DynamoDB.DocumentClient();

// 구글 OAuth2 설정
const GOOGLE_CLIENT_ID = '';
const GOOGLE_CLIENT_SECRET = '';
const CALLBACK_URL = '/auth/google/callback'; // 구글 로그인 후 콜백 URL

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

const uuidv4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

const krDate = () => {
  return Date.now() + 1000 * 60 * 60 * 9;
};

const passportConfig = () => {
  // Passport 세션 시리얼라이즈 및 디시리얼라이즈 설정
  passport.serializeUser((user, done) => {
    // 사용자 정보를 세션에 저장
    console.log('serializeUser >>> user=====', user);
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    // 세션에 저장된 사용자 정보를 복원
    console.log('deserializeUser >>> user=====', user);
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
      (accessToken, refreshToken, profile, done) => {
        console.log('GoogleStrategy >>> profile=====', profile);
        console.log('GoogleStrategy >>> accessToken=====', accessToken);
        // Google 로그인 성공 시 호출되는 콜백 함수
        // 사용자 인증 로직 및 세션 데이터 저장 등을 처리할 수 있습니다.
        // profile에는 구글 사용자 정보가 들어있습니다.
        // done() 함수를 호출하여 인증 결과를 passport에 알립니다.
        const item = {
          id: uuidv4(), // 삽입할 데이터의 고유 식별자
          email: profile.email,
          user_id: profile.id, // 삽입할 데이터의 고유 식별자
          pwd: '1234',
          user_name: profile.displayName, // 삽입할 데이터의 속성 값
          language: profile.language,
          token: accessToken,
          created_dt: krDate(),
          type: 'google',
        };

        // DynamoDB에 데이터 삽입
        const params = {
          TableName: 'users', // 삽입할 테이블 이름
          Item: item, // 삽입할 데이터 객체
        };

        dynamoDBClient.put(params, (err, data) => {
          if (err) {
            console.error('Error inserting data:', err);
          } else {
            console.log('Data inserted successfully:', data);
          }
        });
        return done(null, profile);
      }
    )
  );
};

const sessionMiddleware = session({
  secret: 'hj@1560813', // 세션 데이터를 암호화하기 위한 비밀 키
  resave: false,
  saveUninitialized: false,
  /*store: new (require("connect-dynamodb"))({
          client: dynamoDBClient,
          table: "users",
          // 기본 설정인 아래와 같이 TTL 설정을 할 경우, 세션 데이터가 자동으로 삭제됩니다.
          // 따라서 TTL 설정을 사용하지 않고 직접 세션 데이터를 삭제하는 방식으로 구현하는 것이 좋습니다.
          // autoRemove: 'interval',
          // autoRemoveInterval: 10 // 세션 데이터 삭제 간격 (분)
      }),*/
  store: new DynamoDBStore({
    AWS: AWS,
    tableName: 'users', // 사용할 DynamoDB 테이블 이름
  }),
});

exports.passportConfig = passportConfig;
exports.sessionMiddleware = sessionMiddleware;
