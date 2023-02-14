const { OAuth2Client } = require("google-auth-library");
const { default: axios } = require("axios");
const test3Router = require("express").Router();

let oAuth2Client;

test3Router.get("/", async (req, res, next) => {
  next();
});

test3Router.get("/auth", async (req, res, next) => {
  res.render("auth");
});

//#####step01
test3Router.get("/auth/google/type03", (req, res) => {
  oAuth2Client = new OAuth2Client(
    "",
    "",
    "http://localhost:3000/auth/google/callback"
    //"https://www.googleapis.com/auth/user.phonenumbers.read",
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

test3Router.get("/auth/google/callback", async (req, res) => {
  const loginToken = req.cookies.loginToken ?? undefined;
  let response;
  let token;

  if (!loginToken) {
    token = await signToken(req.query.code);
    response = await fetchGoogleUserinfo(token);
  } else {
    response = await fetchGoogleUserinfo(loginToken);
    token = await signToken(req.query.code);
  }

  res.cookie("loginToken", token, {
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true,
  });
  res.render("authSuccess");
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
