const jwt = require("jsonwebtoken");
const SECRET_KEY = "FUJII0711";
const SIGNED_TOKEN =
  "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJfaWQiOiJodWppaTA3MTEiLCJuYW1lIjoi6rmA7ZiV7KSAIn0sImlhdCI6MTY3Mjk4MTg3NywiZXhwIjoxNjcyOTgxOTM3LCJpc3MiOiJLaW0gSHl1bmcgSnVuIiwic3ViIjoidG9rZW5fdGVzdCJ9.Es8cnaaQdKLQIYlGfbriHtVoTuj7pwvMT6j27eIYA-8WCHdhctRIWH6gEf7REha4hf4OLsBQg9gVx7R0rDsg-A";

exports.handler = async function (event) {
  try {
    const decoded = jwt.verify(SIGNED_TOKEN, SECRET_KEY);
    const response = {
      isBase64Encoded: true,
      statusCode: 200,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Expose-Headers": "*",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ decoded: decoded }),
    };
    return response;
  } catch (err) {
    console.log("err===============", err);
    const response = {
      isBase64Encoded: true,
      statusCode: 200,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Expose-Headers": "*",
        "Access-Control-Allow-Origin": "*",
      },
      body: "error:invalid_token",
    };
    return response;
  }
};
