/**
 * 기존의 객체를 삭제한다.
 */
const { S3Client, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const s3Client = new S3Client({ region: "ap-northeast-2" });
exports.handler = async (event, context) => {
  // Delete the object.
  try {
    const bucketParams = {
      Bucket: "polaris-upload-test",
      Key: "temp/test1.txt",
    };

    const data = await s3Client.send(
      new DeleteObjectCommand({
        Bucket: bucketParams.Bucket,
        Key: bucketParams.Key,
      })
    );
    return data;
  } catch (err) {
    console.log("Error deleting object", err);
  }
};
