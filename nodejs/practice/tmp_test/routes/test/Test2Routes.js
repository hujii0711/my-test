const { OAuth2Client } = require("google-auth-library");
const test2Router = require("express").Router();

let oAuth2Client;

test2Router.get("/", async (req, res, next) => {
  next();
});

test2Router.get("/type02", async (req, res, next) => {
  res.render("type02");
});

//#####step01
test2Router.get("/auth/google/type02", (req, res) => {
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
      "openid",
    ],
  });

  res.redirect(authUrl);
});

test2Router.get("/auth/google/callback2", async (req, res) => {
  const authenticatedClient = await getAuthenticatedClient(req.query.code);

  const tokenInfo = await getTokenInfo(authenticatedClient);
  const userInfo = await getUserInfo(authenticatedClient);
  console.log("tokenInfo=====", tokenInfo);
  console.log("userInfo=====", userInfo);
  res.render("success");
});

const getAuthenticatedClient = (code) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { tokens } = await oAuth2Client.getToken(code); // 접근 토큰 취득
      oAuth2Client.setCredentials(tokens);
      resolve(oAuth2Client);
    } catch (e) {
      reject(e);
    }
  });
};

// const getTokenInfo = async (authenticatedClient) => {
//   const accessToken = authenticatedClient.credentials.access_token;
//   return await authenticatedClient.getTokenInfo(accessToken);
// };
const getTokenInfo = (authenticatedClient) => {
  return new Promise(async (resolve, reject) => {
    try {
      const accessToken = authenticatedClient.credentials.access_token; // 접근 토큰으로 토큰 정보 취득
      const tokenInfo = await authenticatedClient.getTokenInfo(accessToken);
      resolve(tokenInfo);
    } catch (e) {
      reject(e);
    }
  });
};

// const getUserInfo = async (authenticatedClient) => {
//   const url = "https://www.googleapis.com/oauth2/v2/userinfo";
//   //접근 토큰으로 사용자 정보 조회 header에 authorization 생략
//   return await authenticatedClient.request({ url });
// };
const getUserInfo = (authenticatedClient) => {
  return new Promise(async (resolve, reject) => {
    try {
      const userInfo = await authenticatedClient.request({
        url: "https://www.googleapis.com/oauth2/v2/userinfo",
      });
      resolve(userInfo);
    } catch (e) {
      reject(e);
    }
  });
};

module.exports.router = test2Router;

/*#1
oAuth2Client_.getTokenInfo()
tokenInfo------ {
  expiry_date: 1675224734252,
  scopes: [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email',
    'openid'
  ],
  azp: '568088378939-jemtupaj1rsvcdasr82t8llc677d21j4.apps.googleusercontent.com',
  aud: '568088378939-jemtupaj1rsvcdasr82t8llc677d21j4.apps.googleusercontent.com',
  sub: '106317194300034085005',
  exp: '1675224735',
  email: 'hujii0711@gmail.com',
  email_verified: 'true',
  access_type: 'offline'
}
#2
getUserInfo()
data: {
  id: '106317194300034085005',
  email: 'hujii0711@gmail.com',
  verified_email: true,
  name: '김형준',
  given_name: '형준',
  family_name: '김',
  picture: 'https://lh3.googleusercontent.com/a/AEdFTp7N7ZslhJ906ppBhvioSysfaWqapdAyhB8pBmSB=s96-c',
  locale: 'ko'
}*/
