const jwt = require("jsonwebtoken");
const SECRET_KEY = "FUJII0711";

const splitByDelimiter = (data, delim) => {
  const pos = data ? data.indexOf(delim) : -1;
  return pos > 0 ? [data.substr(0, pos), data.substr(pos + 1)] : ["", ""];
};

exports.handler = async (event) => {
  console.log("event===============", event);
  console.log(
    "authorizationToken===============",
    event.headers.authorizationToken
  );
  const [type, token] = splitByDelimiter(event.headers.authorization, " ");
  console.log("type, token===============", type, token);
  const allow = type === "Bearer" && !!jwt.verify(token, SECRET_KEY);
  console.log("allow===============", allow);
  // console.log(allow)
  const policy = {
    principalId: "*",
    policyDocument: {
      Version: "2012-10-17",
      Statement: [
        {
          Action: "execute-api:Invoke",
          Effect: allow ? "Allow" : "Deny",
          Resource: "*",
        },
      ],
    },
  };
  // console.log(policy)
  return policy;
};
