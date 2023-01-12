/**
 * 클라이언트를 생성합니다.
 */
// Create service client module using ES6 syntax.
const { S3Client } = require("@aws-sdk/client-s3");
const REGION = "ap-northeast-2";
// Create an Amazon S3 service client object.
const s3Client = new S3Client({ region: REGION });
//export { s3Client };
module.exports = { s3Client };
