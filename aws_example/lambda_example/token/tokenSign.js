const jwt = require("jsonwebtoken");

const SECRET_KEY = "FUJII0711";

exports.handler = async function (event, context) {
  const issuer = "Kim Hyung Jun";
  const subject = "token_test";
  const expiresIn = "1m";

  const payload = {
    user_id: "hujii0711",
    name: "김형준",
  };

  // 토큰 발급
  const token = jwt.sign(
    {
      data: payload,
    },
    SECRET_KEY,
    {
      algorithm: "HS512",
      expiresIn: expiresIn,
      header: {
        alg: "HS512",
        typ: "JWT",
      },
      issuer: issuer,
      subject: subject,
    }
  );

  console.log("token==================", token);

  const response = {
    isBase64Encoded: true,
    statusCode: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Access-Control-Expose-Headers": "*",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({ token: token }),
  };
  return response;
};
