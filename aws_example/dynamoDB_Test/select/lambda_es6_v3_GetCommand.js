const { GetCommand } = require("@aws-sdk/lib-dynamodb");
const { ddbClient } = require("./ddbClient.js");
const { format } = require("date-fns");

exports.handler = (event) => {
  const formatDate = (date, fmt) => {
    return format(new Date(date), fmt);
  };

  const select = async () => {
    const params = {
      TableName: "testTable",
      Key: {
        id: "d1cea4fd-82d7-450e-8a7e-ba97d221c045",
      },
    };

    try {
      const data = await ddbClient.send(new GetCommand(params));
      const createDate = data.Item.created_date;
      const formatedDate = formatDate(createDate, "yyyy-MM-dd HH:mm:ss");
      console.log("formatedDate=====", formatedDate);
    } catch (err) {
      console.log("Error", err);
    }
  };
  select();
};
