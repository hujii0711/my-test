exports.handler = async (event) => {
  console.log("event-----------", event);
  const response = {
    isBase64Encoded: true,
    statusCode: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Access-Control-Expose-Headers": "*",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify("HELLO LAMBDA!!!!!!!!!!!!!!!!"),
  };
  return response;
};
