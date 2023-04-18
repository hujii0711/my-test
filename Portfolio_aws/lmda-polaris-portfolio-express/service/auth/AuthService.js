const tokenConfig = require("../../modules/passport/token");
const { ddbClient } = require("../../modules/ddbClient.js");
const {
  PutCommand,
  UpdateCommand,
  QueryCommand,
} = require("@aws-sdk/lib-dynamodb");
const com = require("../../modules/common.js");

/********************************** 
 1. 회원가입
**********************************/
exports.register = async (body) => {
  console.log("AuthService >>>> register >>>> body====", body);

  const params = {
    TableName: "users",
    Item: {
      id: com.uuidv4(),
      email: body.email,
      user_id: body.email,
      pwd: body.password,
      user_name: body.user_name,
      created_dt: com.krDate(),
      type: "local",
    },
  };

  try {
    await ddbClient.send(new PutCommand(params));
    return params.Item;
  } catch (err) {
    return null;
  }
};

/********************************** 
 2. 자동 로그인
**********************************/
exports.autoLogin = async (_token) => {
  const data = tokenConfig.verifyToken(_token);
  /*{
    status: "S",
    message: "토큰이 정상입니다.",
    user_id: decoded.userId,
    email: decoded.email,
    password: "freepass",
    token,
  };*/
  console.log("AuthService >>>> autoLogin >>>> data====", data);
  return data;
};

/********************************** 
 3. users 테이블 token 정보 update
**********************************/
exports.updateUserToken = async (body) => {
  console.log("AuthService >>>> updateUserToken >>>> body====", body);
  const params = {
    TableName: "users",
    Key: {
      id: body.id,
    },
    UpdateExpression: "set #setToken = :param1", //token은 예약어라서 바로 사용 불가
    ExpressionAttributeNames: {
      "#setToken": "token",
    },
    ExpressionAttributeValues: {
      ":param1": body.token === "logout" ? "" : body.token,
    },
  };

  try {
    const result = await ddbClient.send(new UpdateCommand(params));
    if (result.$metadata.httpStatusCode === 200) {
      return true;
    }
    return false;
  } catch (err) {
    console.log("AuthService >>>> updateUserToken >>>> err====", err);
    return null;
  }
};

/********************************** 
 4. 로그인 여부 확인
**********************************/
exports.loginStatus = async (query) => {
  console.log("AuthService >>>> loginStatus >>>> query====", query);
  const params = {
    TableName: "articles",
    KeyConditionExpression: "id = :param1",
    ExpressionAttributeValues: {
      ":param1": query.id,
    },
  };
  const result = await ddbClient.send(new QueryCommand(params));
  return result.data;
};
