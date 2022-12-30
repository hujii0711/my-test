const { CreateTableCommand } = require("@aws-sdk/client-dynamodb");
const { ddbClient } = require("./ddbClient.js");
const create = async () => {
  const params = {
    TableName: "testTable",
    AttributeDefinitions: [
      {
        AttributeName: "Season", //ATTRIBUTE_NAME_1
        AttributeType: "N", //ATTRIBUTE_TYPE
      },
      {
        AttributeName: "Episode", //ATTRIBUTE_NAME_2
        AttributeType: "N", //ATTRIBUTE_TYPE
      },
    ],
    KeySchema: [
      {
        AttributeName: "Season", //ATTRIBUTE_NAME_1
        KeyType: "HASH",
      },
      {
        AttributeName: "Episode", //ATTRIBUTE_NAME_2
        KeyType: "RANGE",
      },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1,
    },
    StreamSpecification: {
      StreamEnabled: false,
    },
  };

  try {
    const data = await ddbClient.send(new CreateTableCommand(params));
    console.log("Success >>>> create :::::::::::::::::::::::::::", data);
  } catch (err) {
    console.log("Error", err);
  }
};
create();
