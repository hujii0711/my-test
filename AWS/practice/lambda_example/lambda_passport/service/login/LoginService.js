const token = require("../../passport/token");
const AWS = require("aws-sdk");

// AWS 자격 증명 설정
AWS.config.update({
  accessKeyId: "",
  secretAccessKey: "",
  region: "ap-northeast-2", // 사용하려는 AWS 리전 설정
});

const uuidv4 = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

const krDate = () => {
  return Date.now() + 1000 * 60 * 60 * 9;
};

const dynamoDBClient = new AWS.DynamoDB.DocumentClient();

exports.register = async (body) => {
  console.log("LoginService >>>> register >>>> body====", body);
  // { email: 'test2@daum.net', user_name: 'fujii0711', password: '1234' }

  const params = {
    TableName: "users",
    Item: {
      id: uuidv4(),
      email: body.email,
      user_id: body.email,
      pwd: body.password,
      user_name: body.user_name,
      created_dt: krDate(),
      type: "local",
      //token : empty,
      //language : empty
    },
  };

  dynamoDBClient.put(params, (err, data) => {
    if (err) {
      console.error("Error inserting data:", err);
    } else {
      console.log("Data inserted successfully:", data);
    }
  });

  return data;
};

exports.autoLogin = async (_token) => {
  const data = token.verifyToken(_token);
  return data;
};
