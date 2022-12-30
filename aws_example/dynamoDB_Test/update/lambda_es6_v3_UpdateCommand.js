const { UpdateCommand } = require("@aws-sdk/lib-dynamodb");
const { ddbClient } = require("../ddbClient.js");

exports.handler = (event) => {
  const update = async () => {
    const params = {
      TableName: "testTable",
      Key: {
        id: "d1cea4fd-82d7-450e-8a7e-ba97d221c045",
      },
      UpdateExpression: "set user_id = :param1, user_name = :param2",
      ExpressionAttributeValues: {
        ":param1": "haeju",
        ":param2": "김해주",
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
};
