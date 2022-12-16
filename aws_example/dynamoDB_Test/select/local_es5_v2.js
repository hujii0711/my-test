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
