const { google } = require("googleapis");
const test2Router = require("express").Router();

test2Router.get("/", async (req, res, next) => {
  next();
});

test2Router.get("/type02", async (req, res, next) => {
  res.render("type02");
});

const googleConfig = {
  clientId: "",
  clientSecret: "",
  redirect: "http://localhost:3000/auth/google/callback",
};

const scopes = ["https://www.googleapis.com/auth/plus.me"];

const oauth2Client = new google.auth.OAuth2(
  googleConfig.clientId,
  googleConfig.clientSecret,
  googleConfig.redirect
);

const url = oauth2Client.generateAuthUrl({
  access_type: "offline",
  scope: scopes,
});

//#####step01
test2Router.get("/auth/google/type02", (req, res) => {
  res.redirect(url);
});

//#####step02
/* 
  login할 주소와 로그인이 되었을 경우 실행될 callback 주소를 작성한다.
  로그인할 주소는 아까 로그인 할 url 받아올 url변수의 정보를 redirect 시키고
  callback 주소는 google.json의 redirect 주소를 적으면 된다.
  그리고 로그인이 성공했을 경우 돌아올 redircet주소를 적는다.
*/
test2Router.get("/auth/google/callback2", async function (req, res) {
  const displayName = await googleLogin(req.query.code);
  console.log("/auth/google/callback >>> displayName ======", displayName);
  res.render("success");
});

//#####step03
/* 
  실질적으로 로그인해서 정보를 불러올 코드를 작성한다.
  간단하게 리프레시토큰, 액세스토큰, displayName과 id를 얻어와본다.
*/
async function googleLogin(code) {
  const { tokens } = await oauth2Client.getToken(code);
  console.log("googleLogin >>> tokens ======", tokens);

  oauth2Client.setCredentials(tokens);
  oauth2Client.on("tokens", (token) => {
    console.log("tokens >>> token ======", token);
    if (tokens.refresh_token) {
      console.log("googleLogin >>> 리프레시 토큰 :", tokens.refresh_token);
    }
    console.log("googleLogin >>> 액세스 토큰:", tokens.access_token);
  });
  const plus = getGooglePlusApi(oauth2Client);
  const res = await plus.people.get({ userId: "me" });
  console.log("googleLogin >>> res:", res);
  console.log(`Hello ${res.data.displayName}! ${res.data.id}`);
  return res.data.displayName;
}

//#####step04
/* 
  로그인 url을 받아오기 위한 정보를 입력한다.
  access_type에는 online과 offline이 있는데 offline으로 해야 제일 처음 로그인 했을 때 refresh_token을 받아온다.
  (refresh_token은 항상 제일 처음 로그인할 때 가져온다 그러므로 다시 가져오고 싶으면 https://myaccount.google.com/permissions 에서 액세스된 어플리케이션을 해제해야 한다.)
  scope는 위에 입력한 scope들을 가져온다. 지금처럼 scope하나만 가져올경우
  scope : 'https://www.googleapis.com/auth/plus.me' 바로 적어도 된다. 하지만 여러 scope를 가져올 경우 위에 처럼 배열을 하나 만들어
  여러 scope들을 사용할 수 있다.
  그리고 google+ api를 사용하기 위해 google+ api에 대한 정보를 입력한다.
*/
function getGooglePlusApi(auth) {
  return google.plus({ version: "v1", auth });
}

module.exports.router = test2Router;
