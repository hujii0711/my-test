const {
  QueryCommand,
  PutCommand,
  DeleteCommand,
  UpdateCommand,
} = require("@aws-sdk/lib-dynamodb");
const { ddbClient } = require("./commons/ddbClient");
const com = require("./commons/commonUtils");

/*

*/

/********************************** 
 1. chat_socket_connect 테이블 등록
**********************************/
exports.insertChatSocketRegister = async (connectionId, userId, roomId) => {
  try {
    const params = {
      TableName: "chat_socket_connect",
      Item: {
        id: connectionId,
        user_id: userId,
        room_id: roomId,
        created_dt: Number(com.krDate()),
      },
    };

    const result = await ddbClient.send(new PutCommand(params));
    if (result.$metadata.httpStatusCode === 200) {
      return params.Item;
    }
  } catch (err) {
    console.log("insertChatSocketRegister >>> err==========", err);
  }
};

/********************************** 
 2. room_id로 항목 조회
  [파티션 키로 조회]
**********************************/
exports.selectChatSocketConnectInfoAtRoomId = async (roomId) => {
  try {
    const params = {
      TableName: "chat_socket_connect",
      IndexName: "room_id-index",
      KeyConditionExpression: "room_id = :param1",
      ExpressionAttributeValues: {
        ":param1": roomId,
      },
    };
    return await ddbClient.send(new QueryCommand(params));
  } catch (err) {
    console.log("selectChatSocketConnectionAtRoomId >>> err==========", err);
  }
};

/********************************** 
 3. Connection_id 조건에 맞는 항목 조회
  [GSI 만으로 조회]
**********************************/
exports.selectChatSocketConnectInfo = async (connectionId) => {
  try {
    const params = {
      TableName: "chat_socket_connect",
      KeyConditionExpression: "id = :param1",
      ExpressionAttributeValues: {
        ":param1": connectionId,
      },
    };

    return await ddbClient.send(new QueryCommand(params));
  } catch (err) {
    console.log("selectChatRoomItemsAtConnectionId >>> err==========", err);
  }
};

/********************************** 
 4. chat_socket_connect 테이블 삭제
**********************************/
exports.deleteChatSocketConnect = async (roomId, createdDt) => {
  try {
    const params = {
      TableName: "chat_socket_connect",
      Key: {
        room_id: roomId,
        created_dt: Number(createdDt),
      },
    };
    return await ddbClient.send(new DeleteCommand(params));
  } catch (err) {
    console.log("deleteChatRoom >>> err==========", err);
  }
};
