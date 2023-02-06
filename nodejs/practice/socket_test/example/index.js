const AWS = require("aws-sdk");

const api = new AWS.ApiGatewayManagementApi({
  endpoint: "jbglmgd174.execute-api.ap-northeast-2.amazonaws.com/dev",
});

exports.handler = async (event) => {
  const route = event.requestContext.routeKey;
  const connectionId = event.requestContext.connectionId;

  switch (route) {
    case "$connect":
      console.log("connect:::::::::::::::::::::::::");
      return {
        isBase64Encoded: true,
        statusCode: 200,
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Access-Control-Expose-Headers": "*",
          "Access-Control-Allow-Origin": "*",
        },
        body: "connection occurred",
      };
    case "$disconnect":
      console.log("disconnect:::::::::::::::::::::::::");
      return {
        statusCode: 200,
        body: "Disconnection occurred",
      };
    case "message":
      const postData = JSON.parse(event.body).msg;
      const params = {
        ConnectionId: connectionId,
        Data: postData,
      };
      await api.postToConnection(params).promise();
      return { statusCode: 200, body: "Data sent." };
    default:
      console.log("Received unknown route:", route);
  }
  console.log("#######################");
};

// async function replyToMessage(response, connectionId) {
//   const data = { message: response };
//   const params = {
//     ConnectionId: connectionId,
//     Data: Buffer.from(JSON.stringify(data)),
//   };

//   return api.postToConnection(params).promise();
// }
