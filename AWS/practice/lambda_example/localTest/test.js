var AWS = require("aws-sdk");

AWS.config.update({
  region: "ap-northeast-2",
  accessKeyId: "AKIAWUEQNUC6A6WEKEXP",
  secretAccessKey: "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",
});

const lambda = new AWS.Lambda();
const paramEvent = { cal1: "1", cal2: "2" };

lambda.invoke(
  {
    FunctionName: "Lambda-simple",
    Payload: JSON.stringify(paramEvent, null, 2), // pass params
  },
  function (error, data) {
    if (error) {
      console.info("error============", error);
    } else {
      console.info("date=========", data);
    }
  }
);
