const tokenConfig = require("../../modules/passport/token");
const { ddbClient } = require("../../modules/ddbClient.js");
const {
  PutCommand,
  UpdateCommand,
  QueryCommand,
  ScanCommand,
} = require("@aws-sdk/lib-dynamodb");
const com = require("../../modules/common.js");

/********************************** 
 1. 회원가입
**********************************/
exports.register = async (body) => {
  console.log("AuthService >>>> register >>>> body====", body);
  const { email, password, user_name } = body;

  const params = {
    TableName: "users",
    Item: {
      id: com.uuidv4(),
      email,
      user_id: email,
      pwd: password,
      user_name: user_name,
      created_dt: com.krDate(),
      login_type: "local",
    },
  };

  const result = await ddbClient.send(new PutCommand(params));

  if (result.$metadata.httpStatusCode === 200) {
    return params.Item;
  }
};

/********************************** 
 2. 자동 로그인
**********************************/
exports.autoLogin = async (token) => {
  const data = tokenConfig.verifyToken(token);
  /*{
    status: "S",
    message: "토큰이 정상입니다.",
    email: decoded.email,
    password: "freepass",
    token,
  };*/
  console.log("AuthService >>>> autoLogin >>>> data====", data);
  return data;
};

/********************************** 
 3. sessions.expires TTL 만료기간 갱신
**********************************/
exports.updateSessionExpires = async (sessId) => {
  const expires = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 90; //90일(10자리 숫자)
  //const expires = Math.floor(Date.now() / 1000) + 60; //1분
  console.log(
    "AuthService >>>> updateSessionExpires >>>> expires====",
    expires
  );

  const params = {
    TableName: "sessions",
    Key: {
      sessionId: `sess:${sessId}`,
    },
    UpdateExpression: "set #setExpires = :param1",
    ExpressionAttributeNames: {
      "#setExpires": "expires",
    },
    ExpressionAttributeValues: {
      ":param1": expires,
    },
  };

  return await ddbClient.send(new UpdateCommand(params));
};

/********************************** 
 users 테이블 token 정보 update(미사용)
**********************************/
exports.updateUserToken = async (body) => {
  const { id, token } = body;
  const params = {
    TableName: "users",
    Key: {
      id,
    },
    UpdateExpression: "set #setToken = :param1", //token은 예약어라서 바로 사용 불가
    ExpressionAttributeNames: {
      "#setToken": "token",
    },
    ExpressionAttributeValues: {
      ":param1": token === "logout" ? "" : token,
    },
  };

  const result = await ddbClient.send(new UpdateCommand(params));
  if (result.$metadata.httpStatusCode === 200) {
    return true;
  }
  return false;
};

/********************************** 
 로그인 여부 확인 (미사용)
**********************************/
exports.loginStatus = async (token) => {
  const l_token = token.substring(7); //Bearer는 제거
  const params = {
    TableName: "users",
    FilterExpression: "#setToken = :param1",
    ExpressionAttributeNames: {
      "#setToken": "token",
    },
    ExpressionAttributeValues: {
      ":param1": l_token,
    },
  };

  return await ddbClient.send(new ScanCommand(params));
};
