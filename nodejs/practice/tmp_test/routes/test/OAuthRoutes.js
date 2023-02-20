const { OAuth2Client } = require("google-auth-library");
const { default: axios } = require("axios");
const oAuthRouter = require("express").Router();

let oAuth2Client;

oAuthRouter.get("/", async (req, res, next) => {
  next();
});

oAuthRouter.get("/authIndex", async (req, res, next) => {
  res.render("authIndex");
});

//#####step01
//"https://av485mvree.execute-api.ap-northeast-2.amazonaws.com/dev/auth/google/callback"
oAuthRouter.get("/auth/google/page", (req, res) => {
  oAuth2Client = new OAuth2Client(
    "",
    "",
    "http://localhost:3000/auth/google/callback"
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

//#####step02
oAuthRouter.get("/auth/google/callback", async (req, res) => {
  const loginToken = req.cookies.loginToken ?? undefined;
  console.log(
    "1-------/auth/google/callback >>>>> loginToken======",
    loginToken
  );
  console.log(
    "2-------/auth/google/callback >>>>> req.query.code======",
    req.query.code
  );

  //   const verifyTokenInfo = await verifyToken(loginToken);
  //   console.log(
  //     "2-1-------/auth/google/callback >>>>> verifyTokenInfo======",
  //     verifyTokenInfo
  //   );

  let response;
  let token;

  if (loginToken) {
    response = await getGoogleUserinfo(loginToken);
    token = await signToken(req.query.code);
  } else {
    token = await signToken(req.query.code);
    response = await getGoogleUserinfo(token);
  }

  const verifyTokenInfo = await verifyToken(token);
  console.log(
    "4-------/auth/google/callback >>>>> verifyTokenInfo======",
    verifyTokenInfo
  );

  console.log("5-------getGoogleUserinfo >>>>> response======", response);

  res.cookie("loginToken", token, {
    maxAge: 60 * 60 * 2 * 1000, //2시간(밀리초단위)
    httpOnly: true,
  });
  res.render("authSuccess");
});

const getGoogleUserinfo = async (accessToken) => {
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

const signToken = async (code) => {
  try {
    const tokenInfo = await oAuth2Client.getToken(code); // access_token 취득
    console.log("3-------signToken >>>>> tokenInfo======", tokenInfo);
    oAuth2Client.setCredentials(tokenInfo.tokens);
    const accessToken = oAuth2Client.credentials.access_token;
    return accessToken;
  } catch (err) {
    console.log("error========", err);
    return;
  }
};

const verifyToken = async (targetToken) => {
  try {
    const result = await oAuth2Client.getTokenInfo(targetToken);
    return result;
  } catch (err) {
    console.log("error========", err);
    return;
  }
};

const getTokenInfo = async () => {
  try {
    const accessToken = oAuth2Client.credentials.access_token; // 접근 토큰으로 토큰 정보 취득
    const tokenInfo = await oAuth2Client.getTokenInfo(accessToken);
    return tokenInfo;
  } catch (err) {
    console.log("error========", err);
  }
};

module.exports.router = oAuthRouter;

// const signToken = (code) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       const tokenInfo = await oAuth2Client.getToken(code); // access_token 취득
//       console.log("3-------signToken >>>>> tokenInfo======", tokenInfo);
//       oAuth2Client.setCredentials(tokenInfo.tokens);
//       const accessToken = oAuth2Client.credentials.access_token;
//       resolve(accessToken);
//     } catch (e) {
//       reject(e);
//     }
//   });
// };

// const verifyToken = (targetToken) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       const result = await oAuth2Client.getTokenInfo(targetToken);
//       resolve(result);
//     } catch (e) {
//       console.log("verifyToken Error!!!!!!!!!");
//       reject(false);
//     }
//   });
// };

// const getTokenInfo = () => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       const accessToken = oAuth2Client.credentials.access_token; // 접근 토큰으로 토큰 정보 취득
//       const tokenInfo = await oAuth2Client.getTokenInfo(accessToken);
//       resolve(tokenInfo);
//     } catch (e) {
//       reject(e);
//     }
//   });
// };
