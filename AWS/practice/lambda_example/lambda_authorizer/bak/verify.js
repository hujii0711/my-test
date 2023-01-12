const jwt = require("jsonwebtoken");

/* 정책 문서 형식을 생성
    authResponse = {
        "principalId": "...", 
        "policyDocument": {
            "Version": "2012-10-17",
            "Statement": [
                {
                    "Effect": "Allow",
                    "Action": "*",
                    "Resource": "*"
                }
            ]
        },
        "context": {
            stringKey: "stringval",
            numberKey: 123,
            booleanKey: true
        }
    }
*/
const generatePolicy = function (principalId, effect, resource) {
  const authResponse = {}; // authResponse 객체 선언
  authResponse.principalId = principalId;

  if (effect && resource) {
    const policyDocument = {};
    policyDocument.Version = "2012-10-17"; // 정책 문서 형식 버전
    policyDocument.Statement = [];

    const statementOne = {};
    statementOne.Action = "execute-api:Invoke";
    statementOne.Effect = effect;
    statementOne.Resource = resource;

    policyDocument.Statement[0] = statementOne;
    authResponse.policyDocument = policyDocument;
  }
  // Optional output with custom properties of the String, Number or Boolean type.
  authResponse.context = {
    stringKey: "stringval",
    numberKey: 123,
    booleanKey: true,
  };

  return authResponse;
};

// 핸들러 함수를 정의
exports.handler = function (event, context, callback) {
  console.log("event===================", event);
  if (!event.authorizationToken) {
    callback("Could not find authorizationToken");
    return;
  }

  // JWT 토큰의 앞부분(Bearer)을 제거
  // "authorizationToken": "Bearer eyJhbGciOiJ~~~cCI6IkpXVCJ9.eyJnaXZlbl~~~pKNDQuZSJ9.mioxKcb1~~~W1LTk5_anGo"
  //const token = event.authorizationToken.split(" ")[1];
  const token = event.authorizationToken;

  // auth0.com에서 제공한 Client Secret을 환경변수로부터 읽어와서 변수에 할당
  const secretBuffer = new Buffer(process.env.AUTH_SECRET);

  // JWT 토큰을 검증
  jwt.verify(token, secretBuffer, function (err, decoded) {
    if (err) {
      console.log(
        "Failed jwt verification: ",
        err,
        "auth:",
        event.authorizationToken
      );
      callback("Authorization Failed");
    } else {
      const policy = generatePolicy("*", "allow", event.methodArn);
      console.log(policy);
      callback(null, policy);
    }
  });
};

const methodArn =
  "arn:aws:execute-api:ap-northeast-2:455569416380:vb43hq6vt2/dev/GET/posttoken";
const [arn, aws, execute_api, region, accountId, apiId, stage] =
  methodArn.split(/[:/]/);
const scopedMethodArn =
  [arn, aws, execute_api, region, accountId, apiId].join(":") +
  "/" +
  [stage, "*", "*"].join("/");
console.log("scopedMethodArn==============", scopedMethodArn);
