const { GetCommand } = require("@aws-sdk/lib-dynamodb");
const { ddbClient } = require("./ddbClient.js");

const select = async () => {
  const params = {
    TableName: "demo",
    Key: {
      code: "test",
    },
  };

  try {
    const data = await ddbClient.send(new GetCommand(params));
    console.log("Success >>>> GetCommand_select ::::::::::", data);
  } catch (err) {
    console.log("Error", err);
  }
};
select();
