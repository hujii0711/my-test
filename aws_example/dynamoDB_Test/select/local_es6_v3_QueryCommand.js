const { QueryCommand } = require("@aws-sdk/lib-dynamodb");
const { ddbClient } = require("../ddbClient.js");

const select = async () => {
  const params = {
    TableName: "demo",
    KeyConditionExpression: "code = :codeVal",
    ExpressionAttributeValues: {
      ":codeVal": "test",
    },
  };

  try {
    const data = await ddbClient.send(new QueryCommand(params));
    console.log("Success >>>> QueryCommand_select ::::::::::", data);
  } catch (err) {
    console.log("Error", err);
  }
};
select();
