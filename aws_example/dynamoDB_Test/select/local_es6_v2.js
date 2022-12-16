const AWS = require("aws-sdk");

const docClient = new AWS.DynamoDB.DocumentClient({
  accessKeyId: "AKIAT4BRYNERPMIWHEVD",
  secretAccessKey: "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",
  region: "ap-northeast-2",
  endpoint: "http://dynamodb.ap-northeast-2.amazonaws.com",
});

const params = {
  TableName: "demo",
  KeyConditionExpression: "code = :codeVal",
  ExpressionAttributeValues: {
    ":codeVal": "test",
  },
};

const getItem = async () => {
  try {
    const data = await docClient.query(params).promise();
    console.log("data:::::::::::::::::::::::::::::::::", data);
  } catch (err) {
    console.log("Error", err);
  }
};
getItem();
