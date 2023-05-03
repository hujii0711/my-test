const {
  QueryCommand,
  PutCommand,
  DeleteCommand,
} = require("@aws-sdk/lib-dynamodb");
const { ddbClient } = require("./commons/ddbClient");
const com = require("./commons/commonUtils");

/*
 1. 새로운 채팅방 생성 : insertChatRoomNewRegister X
 2. 채팅방 생성 : insertChatRoomRegister
 3. 특정 사용자에게 기존 채팅방이 있는지 체크 : selectIsChatRoomUser
 4. room_id로 항목 조회 : selectChatRoomItemsAtRoomId X
 5. Connection_id로 항목 조회 : selectChatRoomItemsAtConnectionId X
 6. connection_id 수정 : updateConnectionId X
 7. 채팅방 삭제: deleteChatRoom
*/

/********************************** 
 1. 새로운 채팅방 생성
**********************************/
// exports.insertChatRoomNewRegister = async (connectionId, userId) => {
//   try {
//     const params = {
//       TableName: "chat_rooms",
//       Item: {
//         id: com.uuidv4(),
//         connection_id: connectionId,
//         user_id: userId,
//         created_room_user_id: userId,
//         created_dt: Number(com.krDate()),
//       },
//     };

//     const result = await ddbClient.send(new PutCommand(params));
//     if (result.$metadata.httpStatusCode === 200) {
//       return params.Item;
//     }
//   } catch (err) {
//     console.log("insertChatRoomNewRegister >>> err==========", err);
//   }
// };

/********************************** 
 2. 채팅방 생성
**********************************/
exports.insertChatRoomRegister = async (roomId, userId, selectedUserId) => {
  try {
    const params = {
      TableName: "chat_rooms",
      Item: {
        id: roomId,
        user_id: userId,
        created_user_id: userId,
        received_user_id: selectedUserId,
        created_dt: Number(com.krDate()),
      },
    };
    await ddbClient.send(new PutCommand(params));
  } catch (err) {
    console.log("insertChatRoomRegister >>> err==========", err);
  }
};

/********************************** 
 3. 특정 사용자에게 기존 채팅방이 있는지 체크
  [GSI와 파티션키 조합으로 조회]
**********************************/
exports.selectIsChatRoomUser = async (roomId, userId) => {
  try {
    const params = {
      TableName: "chat_rooms",
      IndexName: "id-index",
      KeyConditionExpression: "id = :param1",
      ExpressionAttributeValues: {
        ":param1": roomId,
        ":param2": userId,
      },
      FilterExpression: "user_id =:param2",
    };
    const data = await ddbClient.send(new QueryCommand(params));
    console.log("selectIsChatRoomUser  >>> data==========", data);
    return data;
  } catch (err) {
    console.log("selectIsChatRoomUser >>> err==========", err);
  }
};

/********************************** 
 4. room_id로 항목 조회
  [GSI 만으로 조회]
**********************************/
// exports.selectChatRoomItemsAtRoomId = async (roomId) => {
//   try {
//     const params = {
//       TableName: "chat_rooms",
//       IndexName: "id-index",
//       KeyConditionExpression: "id = :param1",
//       ExpressionAttributeValues: {
//         ":param1": roomId,
//       },
//     };
//     return await ddbClient.send(new QueryCommand(params));
//   } catch (err) {
//     console.log("selectChatRoomItemsAtRoomId >>> err==========", err);
//   }
// };

/********************************** 
 5. Connection_id 조건에 맞는 항목 조회
  [GSI 만으로 조회]
**********************************/
// exports.selectChatRoomItemsAtConnectionId = async (connectionId) => {
//   try {
//     const params = {
//       TableName: "chat_rooms",
//       IndexName: "connection_id-index",
//       KeyConditionExpression: "connection_id = :param1",
//       ExpressionAttributeValues: {
//         ":param1": connectionId,
//       },
//     };

//     return await ddbClient.send(new QueryCommand(params));
//   } catch (err) {
//     console.log("selectChatRoomItemsAtConnectionId >>> err==========", err);
//   }
// };

/********************************** 
 6. connection_id 수정
**********************************/
// exports.updateConnectionId = async (userId, createdDt, connectionId) => {
//   try {
//     const params = {
//       TableName: "chat_rooms",
//       Key: {
//         user_id: userId,
//         created_dt: Number(createdDt),
//       },
//       UpdateExpression: "set connection_id = :param1, updated_dt = :param2",
//       ExpressionAttributeValues: {
//         ":param1": connectionId,
//         ":param2": com.krDate(),
//       },
//     };
//     return await ddbClient.send(new UpdateCommand(params));
//   } catch (err) {
//     console.log("updateConnectionId >>> err==========", err);
//   }
// };

/********************************** 
 7. 채팅방 삭제
**********************************/
exports.deleteChatRoom = async (userId, createdDt) => {
  try {
    const params = {
      TableName: "chat_rooms",
      Key: {
        user_id: userId,
        created_dt: Number(createdDt),
      },
    };
    return await ddbClient.send(new DeleteCommand(params));
  } catch (err) {
    console.log("deleteChatRoom >>> err==========", err);
  }
};
