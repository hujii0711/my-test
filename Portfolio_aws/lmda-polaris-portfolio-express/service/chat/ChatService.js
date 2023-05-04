const { QueryCommand } = require("@aws-sdk/lib-dynamodb");
const { ddbClient } = require("../../modules/ddbClient");
const com = require("../../modules/common");

/*
  1. 채팅방 목록 조회 | /chat/selectChatRoomPagingList | get
  2. 채팅 메시지 목록 조회 | /chat/selectChatRoomMessagePagingList | get
  3. 사용자 정보 조회 /chat/selectUserPagingList | get
  4. 사용자와 선택된 사용자에 대해 채팅방이 있는지 유무 체크 | selectIsChatRoom | post
*/

/********************************** 
 1. 채팅방 목록 조회
**********************************/
exports.selectChatRoomPagingList = async (query) => {
  console.log(
    "ChatService >>>> selectChatRoomPagingList >>> query==========",
    query
  );
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
  const result = await ddbClient.send(new QueryCommand(params));
  console.log(
    "ChatService >>>> selectChatRoomPagingList >>> result==========",
    result
  );
  return result;
};

/********************************** 
 2. 채팅 메시지 목록 조회
**********************************/
exports.selectChatRoomMessagePagingList = async (query) => {
  const { roomId, createdDt } = query;
  console.log(
    "ChatService >>>> selectChatRoomMessagePagingList >>> query==========",
    query
  );
  const params = {
    TableName: "chat_messages",
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
exports.selectChatUserPagingList = async (query) => {
  console.log(
    "ChatService >>>> selectChatUserPagingList >>>> query====",
    query
  );
  const { createdDt } = query;

  const params = {
    TableName: "chat_users",
    KeyConditionExpression: "pt_key = :param1",
    ExpressionAttributeValues: {
      ":param1": "ALL",
    },
    Limit: 10,
    ScanIndexForward: false, // 내림차순: false | 오름차순: true
  };

  if (Number(createdDt) > 1) {
    params.ExclusiveStartKey = { created_dt: Number(createdDt), pt_key: "ALL" };
  }

  return await ddbClient.send(new QueryCommand(params));
};

/********************************** 
 4. 사용자와 선택된 사용자에 대해 채팅방이 있는지 유무 체크
**********************************/
exports.selectIsChatRoom = async (body) => {
  const { userId, selectedUserId } = body;
  console.log("ChatService >>> selectIsChatRoom >>> body ====", body);
  const params = {
    TableName: "chat_rooms",
    KeyConditionExpression: "user_id = :param1",
    ExpressionAttributeValues: {
      ":param1": userId,
      ":param2": selectedUserId,
    },
    FilterExpression: "selected_user_id =:param2",
  };

  const data = await ddbClient.send(new QueryCommand(params));
  console.log("ChatService >>> selectIsChatRoom >>> data ====", data);
  return data;
};
