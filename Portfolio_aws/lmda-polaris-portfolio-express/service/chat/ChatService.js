const {
  QueryCommand,
  PutCommand,
  UpdateCommand,
  DeleteCommand,
  ScanCommand,
} = require("@aws-sdk/lib-dynamodb");
const { ddbClient } = require("../../modules/ddbClient.js");
const com = require("../../modules/common.js");

/*
  1. 채팅방 목록 조회 | /chat/selectChatRoomPagingList | get
  2. 채팅 메시지 목록 조회 | /chat/selectChatRoomMessagePagingList | get
  3. 사용자 정보 조회 /chat/selectUserPagingList | get
*/

/********************************** 
 1. 채팅방 목록 조회
**********************************/
exports.selectChatRoomPagingList = async (query) => {
  const { userId, createdDt } = query;

  const params = {
    TableName: "chat_rooms",
    KeyConditionExpression: "user_id = :param1",
    ExpressionAttributeValues: {
      ":param1": userId,
    },
    Limit: 10,
    ScanIndexForward: false,
  };

  if (Number(createdDt) > 1) {
    params.ExclusiveStartKey = { created_dt: Number(createdDt), pt_key: "ALL" };
  }

  return await ddbClient.send(new QueryCommand(params));
};

/********************************** 
 2. 채팅 메시지 목록 조회
**********************************/
exports.selectChatRoomMessagePagingList = async () => {
  const { roomId, createdDt } = query;

  const params = {
    TableName: "chat_rooms",
    KeyConditionExpression: "room_id = :param1",
    ExpressionAttributeValues: {
      ":param1": roomId,
    },
    Limit: 10,
    ScanIndexForward: false,
  };

  if (Number(createdDt) > 1) {
    params.ExclusiveStartKey = { created_dt: Number(createdDt), pt_key: "ALL" };
  }

  return await ddbClient.send(new QueryCommand(params));
};

/********************************** 
 3. 사용자 정보 조회
**********************************/
exports.selectUserPagingList = async () => {
  return null;
};
