const { QueryCommand, PutCommand } = require("@aws-sdk/lib-dynamodb");
const { ddbClient } = require("./commons/ddbClient");
const com = require("./commons/commonUtils");

/*
    chat_message Table 데이터 생성
    param: room_id, message
    return: undefined
    ws: $send시 생성
*/
exports.insertChatMessage = async (params) => {
  const { roomId, userId, message } = params;
  try {
    const params = {
      TableName: "chat_message",
      Item: {
        id: com.uuidv4(),
        room_id: roomId,
        user_id: userId,
        user_name: "김형준",
        message,
        created_date: com.krDate(),
      },
    };
    const data = await ddbClient.send(new PutCommand(params));
    console.log("db_chatRooms > insertChatMessage >>>> data ======", data);
  } catch (err) {
    console.log("Error", err);
  }
};

/*
    chat_message Table 데이터 조회
    param: room_id
    return: Items
    ws: $join시 조회
*/
exports.selectChatMessage = async (room_id) => {
  try {
    const params = {
      TableName: "chat_message",
      IndexName: "room_id-index",
      KeyConditionExpression: "#HashKey = :hkey",
      ExpressionAttributeNames: { "#HashKey": "room_id" },
      ExpressionAttributeValues: {
        ":hkey": room_id,
      },
    };

    const result = await ddbClient.send(new QueryCommand(params));
    console.log("db_chatRooms > selectChatMessage >>>> result ======", result);
    if (result.Items) {
      return result.Items;
    } else {
      return;
    }
  } catch (err) {
    console.log("Error", err);
  }
};
