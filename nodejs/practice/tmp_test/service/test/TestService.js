const {
  QueryCommand,
  PutCommand,
  UpdateCommand,
  DeleteCommand,
} = require("@aws-sdk/lib-dynamodb");
const { ddbClient } = require("../../commons/ddbClient.js");
const com = require("../../commons/commonUtils.js");

exports.selectTest = async (query) => {
  const { id } = query;

  const params = {
    TableName: "users",
    KeyConditionExpression: "id = :idVal",
    ExpressionAttributeValues: {
      ":idVal": id,
    },
  };

  const data = await ddbClient.send(new QueryCommand(params));
  return data;
};

exports.insertTest = async (body) => {
  const { user_id, user_name, age } = body;

  const params = {
    TableName: "users",
    Item: {
      id: com.uuidv4(),
      user_id: user_id,
      user_name: user_name,
      age: age,
      created_date: com.krDate(),
    },
  };

  const data = await ddbClient.send(new PutCommand(params));
  return data;
};

exports.updateTest = async (body) => {
  const { id, user_name } = body;

  const params = {
    TableName: "users",
    Key: { id },
    UpdateExpression: "set user_name = :param1, updated_date = :param2",
    ExpressionAttributeValues: {
      ":param1": user_name,
      ":param2": com.krDate(),
    },
  };

  const data = await ddbClient.send(new UpdateCommand(params));
  return data;
};

exports.deleteTest = async (body) => {
  const { id } = body;

  const params = {
    TableName: "users",
    Key: {
      id,
    },
  };

  const data = await ddbClient.send(new DeleteCommand(params));
  return data;
};
