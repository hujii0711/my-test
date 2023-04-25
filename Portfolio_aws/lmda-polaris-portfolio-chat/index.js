const AWS = require("aws-sdk");
const {
  QueryCommand,
  PutCommand,
  DeleteCommand,
} = require("@aws-sdk/lib-dynamodb");
const { ddbClient } = require("./commons/ddbClient");
const com = require("./commons/commonUtils");

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
  const param = event.queryStringParameters;

  console.log("param==========", param);
  //console.log("roomId==========", roomId);
  //console.log("userId==========", userId);
  //console.log("createdDt==========", createdDt);
  //console.log("connectionId==========", connectionId);

  if (route === "$connect") {
    console.log("■■■■■■■■■■■■■■■■■■$connect■■■■■■■■■■■■■■■■");

    // roomId가 없다면 채팅방 개설
    // connect_id도 신규로 업데이트 필요
    //if (!roomId) {
    try {
      const params = {
        TableName: "chat_rooms",
        Item: {
          id: com.uuidv4(),
          connection_id: connectionId,
          user_id: param.userId,
          created_dt: Number(com.krDate()),
        },
      };
      const data = await ddbClient.send(new PutCommand(params));
      console.log("$connect >>> PutCommand.data==========", data);
    } catch (err) {
      console.log("$connect >>> PutCommand.err==========", err);
    }
    //}
    return {
      statusCode: 200,
      body: "##########<From server $connect>##########",
    };
  } else if (route === "$disconnect") {
    console.log("■■■■■■■■■■■■■■■■■■$disconnect■■■■■■■■■■■■■■■■■■");
    //chat_rooms.connection_id로 조회로 삭제
    // createdDt가 있다면
    // if (createdDt) {
    //   try {
    //     const params = {
    //       TableName: "chat_rooms",
    //       Key: {
    //         user_id: userId,
    //         created_dt: Number(createdDt),
    //       },
    //     };

    //     await ddbClient.send(new DeleteCommand(params));
    //   } catch (err) {
    //     console.log("$disconnect >>> PutCommand.err==========", err);
    //   }
    // }
    return {
      statusCode: 200,
      body: "##########<From server $disconnect>##########",
    };
  } else if (route === "message") {
    console.log("■■■■■■■■■■■■■■■■■■$message■■■■■■■■■■■■■■■■■■");

    const { roomId, message, userId } = JSON.parse(event.body);

    try {
      try {
        //채팅 메시지 입력 start
        const params = {
          TableName: "chat_messages",
          Item: {
            id: com.uuidv4(),
            room_id: roomId,
            message,
            send_user_id: userId,
            created_dt: Number(com.krDate()),
          },
        };
        const data = await ddbClient.send(new PutCommand(params));
        //채팅 메시지 입력 end

        await api
          .postToConnection({
            ConnectionId: connectionId,
            Data: JSON.parse(event.body).message, //event.body의 typeof는 string이다.
          })
          .promise();

        console.log("$message >>> PutCommand.data==========", data);
      } catch (err) {
        console.log("$message >>> PutCommand.err==========", err);
      }
    } catch (err) {
      console.error(`Failed to send message to ${connectionId}: ${err}`);
    } finally {
      //DB insert
      return {
        statusCode: 200,
        body: "##########<From server message>##########",
      };
    }
  } else if (route === "join") {
    console.log("■■■■■■■■■■■■■■■■■■$join■■■■■■■■■■■■■■■■■■");
    try {
      await api
        .postToConnection({
          ConnectionId: connectionId,
          Data: JSON.stringify({ data: "join1" }), // json 데이터 응답시에는 stringify하여 보낸다.
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
