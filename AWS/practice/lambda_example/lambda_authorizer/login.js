const jwt = require("jsonwebtoken");
const AUTH_SECRET = "AWS-AUTH-FUJII0711";

const payload = {
  user_id: "hujii0711",
  name: "김형준",
};

exports.handler = function (event, context, callback) {
  const token = jwt.sign(
    {
      data: payload,
    },
    AUTH_SECRET,
    {
      expiresIn: "1d",
    }
  );
  console.log("token=======", token);
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify({ token }),
  };
};
