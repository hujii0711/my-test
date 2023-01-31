var express = require("express");
var app = express();
const { google } = require("googleapis");
var googleClient = require("./config/google.json");
const googleConfig = {
  clientId: googleClient.web.client_id,
  clientSecret: googleClient.web.client_secret,
  redirect: googleClient.web.redirect_uris[0],
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
function getGooglePlusApi(auth) {
  return google.plus({ version: "v1", auth });
}
async function googleLogin(code) {
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);
  oauth2Client.on("tokens", (tokens) => {
    if (tokens.refresh_token) {
      console.log("리프레시 토큰 :", tokens.refresh_token);
    }
    console.log("액세스 토큰:", tokens.access_token);
  });
  const plus = getGooglePlusApi(oauth2Client);
  const res = await plus.people.get({ userId: "me" });
  console.log(`Hello ${res.data.displayName}! ${res.data.id}`);
  return res.data.displayName;
}
app.get("/login", function (req, res) {
  res.redirect(url);
});
app.get("/auth/google/callback", async function (req, res) {
  const displayName = await googleLogin(req.query.code);
  console.log(displayName);
  res.redirect("http://localhost:3000");
});
app.get("/", function (req, res) {
  res.send("Hello World!");
  console.log("로그인 해서 홈으로 돌아옴");
});
app.listen(3000, function () {
  console.log("Example app listening on port 3000!");
});
