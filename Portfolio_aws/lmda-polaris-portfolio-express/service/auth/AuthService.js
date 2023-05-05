const tokenConfig = require("../../modules/passport/token");
const { ddbClient } = require("../../modules/ddbClient");
const {
  PutCommand,
  UpdateCommand,
  QueryCommand,
  ScanCommand,
} = require("@aws-sdk/lib-dynamodb");
const com = require("../../modules/common");
const bcrypt = require("bcryptjs");

/********************************** 
 1. 회원가입
**********************************/
exports.register = async (body) => {
  console.log("AuthService >>>> register >>>> body====", body);
  const { email, password, user_name } = body;

  // 아이디 중복 체크
  const isRegister = await this.selectIsRegister(email);
  console.log("AuthService >>>> register >>>> isRegister====", isRegister);
  if (isRegister) {
    return com.httpRespMsg("F", "아이디가 중복되었습니다.");
  }

  // 비밀번호 암호화
  //const encodedPwd = await bcrypt.hash(password, 10); //두번째 인자 12로 설정시 오류
  //console.log("AuthService >>>> encodedPwd >>>> encodedPwd====", encodedPwd);
  const params = {
    TableName: "users",
    Item: {
      id: com.uuidv4(),
      email,
      user_id: com.setConvStrRemoveIndex(email, "@"),
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
 2. 회원가입시 아이디 중복 체크
**********************************/
exports.selectIsRegister = async (email) => {
  console.log("AuthService >>>> selectIsRegister >>>> email====", email);

  const params = {
    TableName: "users",
    IndexName: "email-index",
    KeyConditionExpression: "email = :param1",
    ExpressionAttributeValues: {
      ":param1": email,
    },
  };
  const result = await ddbClient.send(new QueryCommand(params));
  const { Count = 0 } = result;
  return Count > 0 ? true : false;
};

/********************************** 
 3. 회원 정보 조회 (이메일조건)
**********************************/
exports.selectFindUserInfo = async (email) => {
  console.log("AuthService >>>> selectFindUserInfo >>>> email====", email);

  const params = {
    TableName: "users",
    IndexName: "email-index",
    KeyConditionExpression: "email = :param1",
    ExpressionAttributeValues: {
      ":param1": email,
    },
  };

  const result = await ddbClient.send(new QueryCommand(params));
  console.log("AuthService >>>> selectFindUserInfo >>>> result====", result);
  if (result) {
    return result;
  }
};

/********************************** 
4. 회원 정보 조회 (id 조건)
**********************************/
exports.selectUserInfo = async (id) => {
  const params = {
    TableName: "users",
    KeyConditionExpression: "id = :param1",
    ExpressionAttributeValues: {
      ":param1": id,
    },
  };

  const result = await ddbClient.send(new QueryCommand(params));
  if (result.Count === 1) {
    return result.Items[0];
  }
};

/********************************** 
 5. 자동 로그인
**********************************/
exports.autoLogin = async (id) => {
  const result = await this.selectUserInfo(id);
  const data = tokenConfig.verifyToken(result.token);
  /*{
    status: "S",
    message: "토큰이 정상입니다.",
    id: decoded.id,
    email: decoded.email,
    password: decoded.id
  };*/
  console.log("AuthService >>>> autoLogin >>>> data====", data);
  return data;
};

/********************************** 
6. sessions.expires TTL 만료기간 갱신
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
 7. users 테이블 token 정보 update
**********************************/
exports.updateUserToken = async (id, token) => {
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
      ":param1": token ?? "emptyToken",
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
