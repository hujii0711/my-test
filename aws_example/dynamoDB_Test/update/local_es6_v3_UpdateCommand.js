const { UpdateCommand } = require("@aws-sdk/lib-dynamodb");
const { ddbClient } = require("../ddbClient.js");
const update = async () => {
  const params = {
    TableName: "demo",
    Key: {
      code: "test",
    },
    UpdateExpression: "set contents = :param1, testName = :param2",
    ExpressionAttributeValues: {
      ":param1": "업데이트 contents 테스트",
      ":param2": "업데이트 testName 테스트",
    },
  };

  try {
    const data = await ddbClient.send(new UpdateCommand(params));
    console.log("Success >>>> update :::::::::::::::::::::::::::", data);
  } catch (err) {
    console.log("Error", err);
  }
};
update();
