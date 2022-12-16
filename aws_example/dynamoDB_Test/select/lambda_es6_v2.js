const AWS = require("aws-sdk");

exports.handler = async (event) => {
  const docClient = new AWS.DynamoDB.DocumentClient();

  // 유저의 알림 리스트 조회
  var params = {
    TableName: "demo",
    KeyConditionExpression: "code = :codeVal",
    ExpressionAttributeValues: {
      ":codeVal": "test",
    },
  };

  try {
    const data = await docClient.query(params).promise();
    console.log("data:::::::::::::::::::::::::::::::::", data);
  } catch (err) {
    console.log("Error", err);
  }
};
