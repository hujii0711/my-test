const {
  QueryCommand,
  PutCommand,
  UpdateCommand,
  DeleteCommand,
  ScanCommand,
} = require("@aws-sdk/lib-dynamodb");
const { ddbClient } = require("../../modules/ddbClient.js");
const com = require("../../modules/common.js");

/********************************** 
 1. 채팅방 목록 조회
**********************************/
exports.selectChatRoomPagingList = async () => {
  const params = {
    TableName: "chat_rooms",
    IndexName: "room_id-index",
    KeyConditionExpression: "#HashKey = :hkey",
    ExpressionAttributeNames: { "#HashKey": "room_id" },
    ExpressionAttributeValues: {
      ":hkey": room_id,
    },
  };

  // 파티션키(connection_id)가 아니면 검색이 되지 않아 글로벌 인덱스 추가
  const result = await ddbClient.send(new QueryCommand(params));

  if (result.Items) {
    return {
      connection_id: result.Items[0].connection_id,
      room_id: result.Items[0].room_id,
    };
  } else {
    return;
  }
};

/********************************** 
 2. 채팅방 개설
**********************************/
exports.insertChatRoomRegister = async () => {
  const params = {
    TableName: "chat_rooms",
    Item: {
      room_id: room_id ?? com.uuidv4(), // 최초 채팅방 생성시 com.uuidv4 사용하고 두번째 부터는 클라이언트에서 넘어온 room_id 사용
      connection_id, // 웹소켓 연결시 부여된 connection_id
      user_id: "fujii0711", //stateless ==> 접속한 유저정보 DB에서 확인
      user_name: "김형준", //stateless ==> 접속한 유저정보 DB에서 확인
      created_date: Date.now(),
    },
  };
  const data = await ddbClient.send(new PutCommand(params));
  console.log("db_chatRooms > insertChatRoom >>>> data ======", data);
};

/********************************** 
 3. 기존 방 있는지 유무 체크
**********************************/
exports.selectIsChatRoom = async () => {
  return null;
};

/********************************** 
 4. 채팅방 입장하면서 채팅 메시지 목록 조회
**********************************/
exports.selectChatRoomMessagePagingList = async () => {
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

/********************************** 
 5. 채팅방 메시지 전송
**********************************/
exports.insertSendMessge = async () => {
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
        created_date: Date.now(),
      },
    };
    const data = await ddbClient.send(new PutCommand(params));
    console.log("db_chatRooms > insertChatMessage >>>> data ======", data);
  } catch (err) {
    console.log("Error", err);
  }
};

/********************************** 
 6. 채팅방 나가기
**********************************/
exports.deleteChatRoom = async () => {
  const params = {
    TableName: "chat_rooms",
    Key: {
      connection_id,
    },
  };

  try {
    const data = await ddbClient.send(new DeleteCommand(params));
    console.log("db_chatRooms > deleteChatRoom >>>> data ======", data);
  } catch (err) {
    console.log("Error", err);
  }
};

/********************************** 
 7. 사용자 정보 조회
**********************************/
exports.selectUserPagingList = async () => {
  return null;
};
