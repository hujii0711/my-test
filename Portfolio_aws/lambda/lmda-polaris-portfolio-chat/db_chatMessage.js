const { PutCommand } = require("@aws-sdk/lib-dynamodb");
const { ddbClient } = require("./commons/ddbClient");
const com = require("./commons/commonUtils");

/*
 1. 메시지 저장 : insertSendMessge
*/

/********************************** 
 1. 메시지 저장
**********************************/
exports.insertSendMessge = async (roomId, userId, message) => {
  try {
    const params = {
      TableName: "chat_messages",
      Item: {
        id: com.uuidv4(),
        room_id: roomId,
        message,
        send_user_id: userId,
        created_dt: com.krDate(),
      },
    };

    const result = await ddbClient.send(new PutCommand(params)); //result.$metadata.httpStatusCode === 200

    // insert 수행이 정상이면 방금 등록한 내용 리턴
    if (result.$metadata.httpStatusCode === 200) {
      return params.Item;
    }
  } catch (err) {
    console.log("Error", err);
  }
};
