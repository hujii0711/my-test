const {
  DynamoDBClient,
  CreateTableCommand,
} = require("@aws-sdk/client-dynamodb");

const create = async () => {
  const ddbClient = new DynamoDBClient();

  const params = {
    TableName: "testTable",
    KeySchema: [
      {
        AttributeName: "id",
        KeyType: "HASH",
      },
      {
        AttributeName: "userName",
        KeyType: "RANGE",
      },
    ],
    AttributeDefinitions: [
      {
        AttributeName: "id",
        AttributeType: "S",
      },
      {
        AttributeName: "userName",
        AttributeType: "S",
      },
    ],
    BillingMode: "PAY_PER_REQUEST",
  };

  try {
    const data = await ddbClient.send(new CreateTableCommand(params));
  } catch (err) {
    console.log("Error:::::::::::::::::::::::::::::", err);
  }
};
create();
