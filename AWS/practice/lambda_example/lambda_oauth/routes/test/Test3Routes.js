const { OAuth2Client } = require("google-auth-library");
const { default: axios } = require("axios");
const test3Router = require("express").Router();

// generateAuthUrl
// 동의 페이지 랜딩을 위한 URL을 생성합니다.

// getToken(code)
// 주어진 코드에 대한 액세스 토큰을 가져옵니다.

// getTokenInfo(accessToken);
// 프로비저닝된 액세스 토큰에 대한 정보를 얻습니다.
// 주어진 토큰에 프로비저닝된 범위를 확인하려는 경우에 특히 유용합니다.

// revokeToken(token)
// 토큰에 부여된 액세스 권한을 취소합니다.

// verifyIdToken(options)
// 인증서와 대상을 확인하여 ID 토큰이 토큰인지 확인합니다.

//https://av485mvree.execute-api.ap-northeast-2.amazonaws.com
//https://av485mvree.execute-api.ap-northeast-2.amazonaws.com/dev/auth/google/callback

let oAuth2Client;

test3Router.get("/", async (req, res, next) => {
  next();
});

test3Router.get("/type03", async (req, res, next) => {
  res.render("type03");
});

//#####step01
test3Router.get("/auth/google/type03", (req, res) => {
  oAuth2Client = new OAuth2Client(
    "568088378939-jemtupaj1rsvcdasr82t8llc677d21j4.apps.googleusercontent.com",
    "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",
    "http://localhost:3000/auth/google/callback"
  );

  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
      //"https://www.googleapis.com/auth/user.phonenumbers.read",
      "openid",
    ],
  });

  res.redirect(authUrl);
});

test3Router.get("/auth/google/callback", async (req, res) => {
  const loginToken = req.cookies.loginToken ?? undefined;
  let response;
  let token;

  console.log("loginToken=====", loginToken);

  if (loginToken) {
    //const aaa = await verifyToken("111");
    response = await fetchGoogleUserinfo(loginToken);
    token = await signToken(req.query.code);
  } else {
    token = await signToken(req.query.code);
    response = await fetchGoogleUserinfo(token);
  }
  res.cookie("loginToken", token, {
    maxAge: 60 * 60 * 1000, // 1시간
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
      reject({
        status: "F",
        message: "토큰이 유효하지 않습니다.",
      });
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

const verify = async (token) => {
  const ticket = await oAuth2Client.verifyIdToken({
    idToken: token,
    audience:
      "568088378939-jemtupaj1rsvcdasr82t8llc677d21j4.apps.googleusercontent.com",
  });
  const payload = ticket.getPayload();
  return {
    nombre: payload.name,
    email: payload.email,
    img: payload.picture,
    google: true,
  };
};

const verifyToken = (targetToken) => {
  return new Promise(async (resolve, reject) => {
    try {
      await oAuth2Client.getTokenInfo(targetToken);
      resolve(true);
    } catch (e) {
      reject(e);
    }
  });
};

module.exports.router = test3Router;
// ///Configuraciones de Google
// async function verify(token) {
//   const ticket = await client.verifyIdToken({
//     idToken: token,
//     audience: process.env.CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
//     // Or, if multiple clients access the backend:
//     //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
//   });
//   const payload = ticket.getPayload();
//   return {
//     nombre: payload.name,
//     email: payload.email,
//     img: payload.picture,
//     google: true,
//   }
// }
