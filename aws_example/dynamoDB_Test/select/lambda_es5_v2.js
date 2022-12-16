const AWS = require("aws-sdk");

exports.handler = (event) => {
  const docClient = new AWS.DynamoDB.DocumentClient();

  // 유저의 알림 리스트 조회
  var params = {
    TableName: "demo",
    KeyConditionExpression: "code = :codeVal",
    ExpressionAttributeValues: {
      ":codeVal": "test",
    },
  };
  docClient
    .query(params)
    .promise()
    .then((data) => {
      console.log("data:::::::::::::::::::::::::::::::::", data);
    })
    .catch((err) => {
      console.error(
        "Unable to read item. Error JSON:",
        JSON.stringify(err, null, 2)
      );
    });
};
