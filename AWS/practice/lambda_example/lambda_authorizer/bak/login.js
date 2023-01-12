const jwt = require("jsonwebtoken");
const AUTH_SECRET = "FUJII0711";

const payload = {
  user_id: "hujii0711",
  name: "김형준",
};

exports.handler = function (event, context, callback) {
  console.log("event=====================", event);

  console.log("AUTH_SECRET=======", AUTH_SECRET);

  const token = jwt.sign(
    {
      data: payload,
    },
    AUTH_SECRET,
    {
      expiresIn: "1d",
    }
  );
  console.log("token=======", AUTH_SECRET);
  return {
    statusCode: 200,
    body: JSON.stringify({ token }),
  };
};
