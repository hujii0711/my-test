const { PutCommand } = require("@aws-sdk/lib-dynamodb");
const { ddbClient } = require("../ddbClient.js");

//insert
const insert = async () => {
  const params = {
    TableName: "demo",
    Item: {
      code: "code2",
      bucket: "bucket2",
      contents: "contents2",
    },
  };

  try {
    const data = await ddbClient.send(new PutCommand(params));
    console.log("Success >>>> insert :::::::::::::::::::::::::::", data);
  } catch (err) {
    console.log("Error", err);
  }
};
insert();
