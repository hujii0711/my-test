const { QueryCommand } = require("@aws-sdk/lib-dynamodb");
const { ddbClient } = require("../ddbClient.js");

exports.handler = (event) => {
  const select = async () => {
    const params = {
      TableName: "testTable",
      KeyConditionExpression: "id = :idVal",
      ExpressionAttributeValues: {
        ":idVal": "d1cea4fd-82d7-450e-8a7e-ba97d221c045",
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
};
