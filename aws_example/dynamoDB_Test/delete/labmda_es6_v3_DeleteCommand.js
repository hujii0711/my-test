const { DeleteCommand } = require("@aws-sdk/lib-dynamodb");
const { ddbClient } = require("../ddbClient.js");
exports.handler = (event) => {
  const remove = async () => {
    const params = {
      TableName: "testTable",
      Key: {
        id: "e1117a02-b748-44f5-9326-b78238925871",
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
};
