const { PutCommand } = require("@aws-sdk/lib-dynamodb");
const { ddbClient } = require("../ddbClient.js");

exports.handler = (event) => {
  const uuidv4 = () => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        var r = (Math.random() * 16) | 0,
          v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  };

  const krDate = () => {
    //const date = new Date(Date.now() + 1000 * 60 * 60 * 9);
    //return JSON.stringify(date); //"2022-12-30T16:51:39.228Z"
    //return new Date().toString(); //Fri Dec 30 2022 16:34:26 GMT+0900 (한국 표준시)
    return new Date(Date.now() + 1000 * 60 * 60 * 9).toJSON(); //2022-12-30T16:51:39.228Z
  };

  //insert
  const insert = async () => {
    const params = {
      TableName: "testTable",
      Item: {
        id: uuidv4(),
        user_id: "fujii0711",
        user_name: "김형준",
        age: 37,
        created_date: krDate(),
      },
    };

    try {
      const data = await ddbClient.send(new PutCommand(params));
      console.log("Success >>>> insert :::::::::::::::::::::::::::", data);
    } catch (err) {
      console.log("Error", err);
    }
  };
  insert();
};
