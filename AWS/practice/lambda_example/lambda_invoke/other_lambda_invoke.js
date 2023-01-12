const aws = require("aws-sdk");

exports.handler = (event) => {
  const lambda = new aws.Lambda({
    region: "ap-northeast-2", //change to your region
  });

  const paramEvent = { cal1: "1", cal2: "2" };
  lambda.invoke(
    {
      FunctionName: "lambda-test",
      Payload: JSON.stringify(paramEvent, null, 2), // pass params
    },
    function (error, data) {
      if (error) {
        console.info(error);
      } else {
        console.info(data);
      }
    }
  );
};
