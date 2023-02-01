const { default: axios } = require("axios");
const url = require("url");
const testRouter = require("express").Router();

const CLIENT_ID = "";
const CLIENT_SECRET = "";
const AUTHORIZE_URI = "https://accounts.google.com/o/oauth2/v2/auth";
const REDIRECT_URL = "http://localhost:3000/auth/google/callback";
const RESPONSE_TYPE = "code";
const SCOPE = "openid%20profile%20email";
const ACCESS_TYPE = "offline";
const OAUTH_URL = `${AUTHORIZE_URI}?client_id=${CLIENT_ID}&response_type=${RESPONSE_TYPE}&redirect_uri=${REDIRECT_URL}&scope=${SCOPE}&access_type=${ACCESS_TYPE}`;

testRouter.get("/", async (req, res, next) => {
  next();
});

testRouter.get("/type01", async (req, res, next) => {
  res.render("type01");
});

// #####.step01
// NOTE 버튼 클릭시 구글 로그인 화면으로 이동
testRouter.get("/auth/google/type01", (req, res) => {
  res.redirect(OAUTH_URL);
});

// #####.step02
// NOTE 설정한 리다이렉트 페이지로 이동시 처리할 로직 /auth/google/callback
testRouter.get("/auth/google/callback1", (req, res) => {
  const query = url.parse(req.url, true).query;
  if (query && query.code) {
    oauth2Api(query.code);
  }
  res.render("success");
});

// #####.step03
const oauth2Api = async (code) => {
  const accessToken = await getToken(code);
  const userInfo = await getUserInfo(accessToken);
};

// #####.step04
const getToken = async (code) => {
  try {
    // 접근 토큰 취득
    const tokenApi = await axios.post(
      `https://oauth2.googleapis.com/token?code=${code}&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&redirect_uri=${REDIRECT_URL}&grant_type=authorization_code`
    );
    return tokenApi.data.access_token;
  } catch (err) {
    return err;
  }
};

// #####.step05
const getUserInfo = async (accessToken) => {
  try {
    //접근 토큰으로 사용자 정보 조회
    const userInfoApi = await axios.get(
      `https://www.googleapis.com/oauth2/v2/userinfo?alt=json`,
      {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return userInfoApi;
  } catch (err) {
    return err;
  }
};

module.exports.router = testRouter;
