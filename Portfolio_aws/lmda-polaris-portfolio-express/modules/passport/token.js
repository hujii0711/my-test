const jwt = require("jsonwebtoken");

const tokenConfig = {};

tokenConfig.generateToken = (id, userId, email) => {
  console.log("########### token.js > token.generateToken () ###########");
  try {
    const payload = { id, userId, email };
    const options = { expiresIn: "30d" }; // 유효기간 30일
    const token = jwt.sign(payload, "kimHyungJun", options);
    console.log("token.js > token.generateToken > token============", token);
    return token;
  } catch (err) {
    console.error(err);
  }
};

tokenConfig.verifyToken = (token) => {
  console.log("########### token.js > verifyToken() ###########");
  if (!token) {
    return {
      status: "E",
      message: "토큰이 없습니다.",
    };
  }

  try {
    const decoded = jwt.verify(token, "kimHyungJun");

    console.log(
      "########### token.js > verifyToken() >>>> decoded==============",
      decoded
    );
    return {
      status: "S",
      message: "토큰이 정상입니다.",
      user_id: decoded.userId,
      email: decoded.email,
      password: "freepass",
      token,
    };
  } catch (err) {
    return {
      status: "F",
      message: "토큰이 유효하지 않습니다.",
    };
  }
};

module.exports = tokenConfig;
