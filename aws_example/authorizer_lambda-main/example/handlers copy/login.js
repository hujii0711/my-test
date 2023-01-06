const jwt = require("jsonwebtoken");
const SECRET_KEY = "FUJII0711";

exports.handler = async (event) => {
  const issuer = "Kim Hyung Jun";
  const subject = "token_test";
  const expiresIn = "10m";

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

  const response = {
    statusCode: 200,
    body: JSON.stringify({ token }),
  };

  return response;
};
