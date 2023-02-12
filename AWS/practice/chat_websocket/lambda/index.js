const AWS = require("aws-sdk");
const dbChatMessage = require("./db_chatMessage");
const dbChatRooms = require("./db_chatRooms");

const api = new AWS.ApiGatewayManagementApi({
  endpoint: "jbglmgd174.execute-api.ap-northeast-2.amazonaws.com/dev",
});

exports.handler = async (event) => {
  const route = event.requestContext.routeKey;
  const connectionId = event.requestContext.connectionId;

  if (route === "$connect") {
    console.log("■■■■■■■■■■■■■■■■■■$connect■■■■■■■■■■■■■■■■");
    return {
      statusCode: 200,
      body: "connect occurred",
    };
  } else if (route === "$disconnect") {
    console.log("■■■■■■■■■■■■■■■■■■$disconnect■■■■■■■■■■■■■■■■■■");
    await dbChatRooms.deleteChatRoom(connectionId);
    return {
      statusCode: 200,
      body: "Disconnection occurred",
    };
  } else if (route === "send") {
    console.log("■■■■■■■■■■■■■■■■■■$send■■■■■■■■■■■■■■■■■■");

    const message = JSON.parse(event.body).message;

    await dbChatMessage.insertChatMessage(JSON.parse(event.body)); //{ roomId: 'asd', userId: 'chat01', message: '1234' }

    const params = {
      ConnectionId: connectionId,
      Data: message,
    };
    await api.postToConnection(params).promise();
    return { statusCode: 200, body: "Data sent." };
  } else if (route === "join") {
    console.log("■■■■■■■■■■■■■■■■■■$join■■■■■■■■■■■■■■■■■■");
    const roomId = JSON.parse(event.body).roomId;

    // room_id로 기존 채팅방 유무 확인 room_id가 파티션키가 아니라서 조회가 안됨 --> 글로벌 보조 인덱스 추가
    const roomInfo = await dbChatRooms.selectChatRoomInfo(roomId);
    console.log("$join >>>> roomInfo=============", roomInfo);

    let data = {
      message: "기존 채팅방이 있습니다.",
      connection_id: connectionId,
      messageList: [],
    };

    if (!roomInfo) {
      await dbChatRooms.insertChatRoom(roomId, connectionId);
      data.message = "채팅방이 생성되었습니다.";
    } else {
      await dbChatRooms.insertChatRoom(roomId, connectionId);
      data.messageList = await dbChatMessage.selectChatMessage(roomId);
    }

    const params = {
      ConnectionId: connectionId,
      Data: JSON.stringify(data),
    };
    await api.postToConnection(params).promise();
    return { statusCode: 200, body: "Data sent." };
  } else if (route === "ping") {
    console.log("■■■■■■■■■■■■■■■■■■$ping");
    const params = {
      ConnectionId: connectionId,
      Data: "ping_test",
    };
    await api.postToConnection(params).promise();
  } else {
    console.log("Received unknown route:", route);
  }
};
