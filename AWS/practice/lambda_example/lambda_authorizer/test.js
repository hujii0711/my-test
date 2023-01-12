exports.handler = async (event) => {
  const response = {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify("HELLO LAMBDA!!!!!!!!!!!!!!!!"),
  };
  return response;
};
