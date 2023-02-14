const { OAuth2Client } = require("google-auth-library");
const { default: axios } = require("axios");
const testRouter = require("express").Router();

let oAuth2Client;

testRouter.get("/", async (req, res, next) => {
  next();
});

testRouter.get("/intro", async (req, res, next) => {
  res.render("intro");
});

//#####step01
testRouter.get("/auth/google/type01", (req, res) => {
  oAuth2Client = new OAuth2Client(
    "568088378939-jemtupaj1rsvcdasr82t8llc677d21j4.apps.googleusercontent.com",
    "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",
    "https://av485mvree.execute-api.ap-northeast-2.amazonaws.com/dev/auth/google/callback"
  );

  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
  });

  res.redirect(authUrl);
});

testRouter.get("/auth/google/callback", async (req, res) => {

  const loginToken = req.cookies.loginToken ?? undefined;
  
  let response;
  let token;

  if (!loginToken) {
    token = await signToken(req.query.code);
    response = await fetchGoogleUserinfo(token);
  } else {
    response = await fetchGoogleUserinfo(loginToken);
    console.log("fetchGoogleUserinfo=========", response);
    token = await signToken(req.query.code);
  }
  console.log("fetchGoogleUserinfo=========", response);
  res.cookie("loginToken", token, {
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true,
  });
  res.render("success");
});

const fetchGoogleUserinfo = async (accessToken) => {
  try {
    const result = await axios.get(
      `https://www.googleapis.com/oauth2/v2/userinfo`,
      {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return result;
  } catch (err) {
    return err;
  }
};

const signToken = (code) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { tokens } = await oAuth2Client.getToken(code); // 접근 토큰 취득
      oAuth2Client.setCredentials(tokens);
      const accessToken = oAuth2Client.credentials.access_token;
      resolve(accessToken);
    } catch (e) {
      reject(e);
    }
  });
};

const verifyToken = (targetToken) => {
  return new Promise(async (resolve, reject) => {
    try {
      await oAuth2Client.getTokenInfo(targetToken);
      oAuth2Client.resolve(true);
    } catch (e) {
      reject(false);
    }
  });
};

const getTokenInfo = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const accessToken = oAuth2Client.credentials.access_token; // 접근 토큰으로 토큰 정보 취득
      const tokenInfo = await oAuth2Client.getTokenInfo(accessToken);
      resolve(tokenInfo);
    } catch (e) {
      reject(e);
    }
  });
};

module.exports.router = testRouter;
