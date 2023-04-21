const jwt = require("jsonwebtoken");
const { ApiError } = require("../../modules/error");
const httpStatus = require("http-status");

const tokenConfig = {};

tokenConfig.generateToken = (id, email) => {
  console.log("########### tokenConfig.generateToken () ###########");
  try {
    const payload = { id, email };
    const options = { expiresIn: "90d" }; // 유효기간 90일(90d) | 1시간(1h, 60*60) | 기본 초단위(millisecond 단위 아님)
    const token = jwt.sign(payload, "kimHyungJun", options);
    console.log("token.js > token.generateToken > token============", token);
    return token;
  } catch (err) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      "토큰이 발급 도중 오류가 발생하였습니다."
    );
  }
};

tokenConfig.verifyToken = (token) => {
  console.log("########### tokenConfig.verifyToken() ###########");
  if (!token) {
    return {
      status: "E",
      message: "토큰이 없습니다.",
    };
  }

  try {
    const decoded = jwt.verify(token, "kimHyungJun");

    console.log(
      "########### tokenConfig.verifyToken() >>>> decoded==============",
      decoded
    );
    // iat(Issued At)은 토큰 발급 시간
    // exp(Expiration Time)은 토큰의 만료 시간: jwt.sign시 expiresIn에 설정한 값
    return {
      status: "S",
      message: "토큰이 정상입니다.",
      id: decoded.id,
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
