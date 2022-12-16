const { DeleteCommand } = require("@aws-sdk/lib-dynamodb");
const { ddbClient } = require("../ddbClient.js");
const remove = async () => {
  const params = {
    TableName: "demo",
    Key: {
      code: "code2",
    },
  };

  try {
    const data = await ddbClient.send(new DeleteCommand(params));
    console.log("Success >>>> delete :::::::::::::::::::::::::::", data);
  } catch (err) {
    console.log("Error", err);
  }
};

remove();
