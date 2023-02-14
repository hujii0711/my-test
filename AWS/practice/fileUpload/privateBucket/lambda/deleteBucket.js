/**
 * 기존의 버킷을 삭제한다.
 */
const { S3Client, DeleteBucketCommand } = require("@aws-sdk/client-s3");
const s3Client = new S3Client({ region: "ap-northeast-2" });
exports.handler = async (event, context) => {
  // Delete the S3 bucket.
  try {
    const bucketParams = {
      Bucket: "polaris-upload-test",
      Key: "temp/test1.txt",
    };
    const data = await s3Client.send(
      new DeleteBucketCommand({
        Bucket: bucketParams.Bucket,
        Key: bucketParams.Key,
      })
    );
    return data; // For unit tests.
  } catch (err) {
    console.log("Error deleting object", err);
  }
};
