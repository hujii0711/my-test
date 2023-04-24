const {
  QueryCommand,
  PutCommand,
  DeleteCommand,
} = require("@aws-sdk/lib-dynamodb");
const { ddbClient } = require("./commons/ddbClient");
const com = require("./commons/commonUtils");

/*
    chat_userlist Table 데이터 조회
    param: room_id
    return: undefined
    ws: $join시 조회
*/
exports.selectChatRoomInfo = async (room_id) => {
  try {
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
    console.log("db_chatRooms > selectChatRoomInfo >>>> result ======", result);

    if (result.Items) {
      return {
        connection_id: result.Items[0].connection_id,
        room_id: result.Items[0].room_id,
      };
    } else {
      return;
    }
  } catch (err) {
    console.log("Error", err);
  }
};

/*
    chat_userlist Table 데이터 생성
    param: room_id, connection_id
    return: undefined
    ws: $join시 생성
*/
exports.insertChatRoom = async (room_id, connection_id) => {
  try {
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
  } catch (err) {
    console.log("Error", err);
  }
};

/*
    chat_userlist Table 데이터 삭제
    param: connection_id
    return: undefined
    ws: $disconnect시 삭제
*/
exports.deleteChatRoom = async (connection_id) => {
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
