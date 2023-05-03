const AWS = require("aws-sdk");
const dbChatRooms = require("./db_chatRooms");
const dbChatMessage = require("./db_chatMessage");
const dbChatSocketConnect = require("./db_chatSocketConnect");

const api = new AWS.ApiGatewayManagementApi({
  endpoint: process.env.API_GATEWAY_CHAT_URL + "/dev",
});

/* 
  <기본 라우트 키>
  1. $connect - 기본적으로 클라이언트가 websocket API에 연결될때 발생하는 이벤트이다.
  2. $disconnect - 클라이언트가 websocket API와의 연결이 종료될때 발생하는 이벤트이다.
  3. $default - 특정 라우트키 값이나 매칭되는 값이 없을때 기본적으로 호출되는 이벤트이다.
*/

/*
  <postToConnection()의 인자>
  - params: WebSocket 연결에 보낼 메시지와 WebSocket 연결 ID를 포함하는 객체입니다.
  - Data (필수): WebSocket 연결에 보낼 메시지입니다. 문자열 또는 버퍼 형태일 수 있습니다.
  - ConnectionId (필수): 보낼 WebSocket 연결 ID입니다.
*/
exports.handler = async (event) => {
  const route = event.requestContext.routeKey;
  const connectionId = event.requestContext.connectionId;

  if (route === "$connect") {
    console.log("■■■■■■■■■■■■■■■■■■$connect■■■■■■■■■■■■■■■■");
    return {
      statusCode: 200,
      body: JSON.stringify({ connectionId }),
    };
  } else if (route === "$disconnect") {
    console.log("■■■■■■■■■■■■■■■■■■$disconnect■■■■■■■■■■■■■■■■■■");

    // dynamoDB에서는 GSI 속성만으로는 삭제 불가능하여 connection_id로 items 조회
    const result = await dbChatSocketConnect.selectChatSocketConnectInfo(
      connectionId
    );

    if (result.Count === 1) {
      const { user_id: userId, created_dt: createdDt } = result.Items[0];
      await dbChatSocketConnect.deleteChatSocketConnect(userId, createdDt);
    }

    return {
      statusCode: 200,
      body: "##########<From server $disconnect>##########",
    };
  } else if (route === "message") {
    console.log("■■■■■■■■■■■■■■■■■■$message■■■■■■■■■■■■■■■■■■");

    const { roomId, message, userId } = JSON.parse(event.body);

    //채팅 메시지 저장
    const insertResult = await dbChatMessage.insertSendMessge(
      roomId,
      userId,
      message
    );

    if (insertResult.$metadata.httpStatusCode === 200) {
      //채팅방에 있는 사용자 정보 조회
      const connectInfo =
        await dbChatSocketConnect.selectChatSocketConnectInfoAtRoomId(roomId);

      if (connectInfo.Count > 0) {
        const postCalls = connectInfo.Items.map(async ({ connection_id }) => {
          const dt = {
            ConnectionId: connection_id,
            Data: JSON.stringify({ type: "chatSend", message }),
          };
          try {
            await api.postToConnection(dt).promise();
          } catch (err) {
            //만약 끊긴 접속이라면, DB에서 삭제한다.
            if (err.statusCode === 410) {
              console.error(
                `Found stale connection, deleting ${connection_id}`
              );
              const result =
                await dbChatSocketConnect.selectChatSocketConnectInfo(
                  connection_id
                );

              if (result.Count === 1) {
                const { user_id: userId, created_dt: createdDt } =
                  result.Items[0];
                await dbChatSocketConnect.deleteChatSocketConnect(
                  userId,
                  createdDt
                );
              }
            }
          }
        });

        try {
          await Promise.all(postCalls);
          //Promise.all에 전달되는 프라미스 중 하나라도 거부되면, Promise.all이 반환하는 프라미스는 에러와 함께 바로 거부
        } catch (e) {
          return { statusCode: 500, body: e.stack };
        }
      }
    }

    return {
      statusCode: 200,
      body: "##########<From server message>##########",
    };
  } else if (route === "join") {
    console.log("■■■■■■■■■■■■■■■■■■$message■■■■■■■■■■■■■■■■■■");

    const { roomId, userId, selectedUserId } = JSON.parse(event.body);

    const roomInfo = await dbChatRooms.selectIsChatRoomUser(roomId, userId);
    console.log("roomInfo=================", roomInfo);
    // 기존 방이 있다면 chat_room에는 skip
    if (roomInfo.Count === 0) {
      await dbChatRooms.insertChatRoomRegister(roomId, userId, selectedUserId);
    }

    try {
      await api
        .postToConnection({
          ConnectionId: connectionId,
          Data: JSON.stringify({ type: "join", newRoomId: roomId }), // json 데이터 응답시에는 stringify하여 보낸다.
        })
        .promise();
    } catch (err) {
      console.error(`Failed to send join to ${connectionId}: ${err}`);
    } finally {
      return {
        statusCode: 200,
        body: "##########<From server join>##########",
      };
    }
  } else if (route === "ping") {
    console.log("■■■■■■■■■■■■■■■■■■$ping");
    try {
      await api
        .postToConnection({
          ConnectionId: connectionId,
          Data: "ping_test",
        })
        .promise();
    } catch (err) {
      console.error(`Failed to send ping to ${connectionId}: ${err}`);
    } finally {
      return {
        statusCode: 200,
        body: "##########<From server ping>##########",
      };
    }
  } else if (route === "$default") {
    console.log("Received $default route:", route);
  } else {
    console.log("Received unknown route:", route);
  }
};
