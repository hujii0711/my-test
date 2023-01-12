const jwt = require("jsonwebtoken");
const AUTH_SECRET = "AWS-AUTH-FUJII0711";
const API_GATEWAY_ID = "3x818njj0b";
const API_GATEWAY_STAGE = "*";
const HTTP_VERB = "*";
const RESOURCE = "*";
const METHOD_ARN = `arn:aws:execute-api:ap-northeast-2:455569416380:${API_GATEWAY_ID}/${API_GATEWAY_STAGE}/${HTTP_VERB}/${RESOURCE}`;

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
const generatePolicy = (principalId, effect, resource) => {
  const authResponse = {
    principalId: principalId,
    context: {
      stringKey: "stringval",
      numberKey: 123,
      booleanKey: true,
    },
  };

  if (effect && resource) {
    authResponse.policyDocument = {
      Version: "2012-10-17",
      Statement: [
        {
          Action: "execute-api:Invoke",
          Effect: effect,
          Resource: resource,
        },
      ],
    };
  }
  return authResponse;
};

exports.handler = (event, context, callback) => {
  if (!event.authorizationToken) {
    callback("Could not find authorizationToken");
    return;
  }

  const token = event.authorizationToken;
  console.log("token=================", token);
  console.log("METHOD_ARN=================", METHOD_ARN);

  // JWT 토큰을 검증
  jwt.verify(token, AUTH_SECRET, function (err, decoded) {
    if (err) {
      console.log(
        "Failed jwt verification: ",
        err,
        "auth:",
        event.authorizationToken
      );
      callback("Authorization Failed");
    } else {
      const policy = generatePolicy("*", "allow", METHOD_ARN);
      console.log("decode=========", decoded);
      callback(null, policy);
    }
  });
};
