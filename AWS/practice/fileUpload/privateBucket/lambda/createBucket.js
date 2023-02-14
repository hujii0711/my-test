/**
 * 새로운 버킷을 생성한다.
 */
const { S3Client, CreateBucketCommand } = require("@aws-sdk/client-s3");
const s3Client = new S3Client({ region: "ap-northeast-2" });

exports.handler = async (event, context) => {
  const bucketParams = {
    Bucket: "polaris-upload-test1",
  };
  // Create an S3 bucket.
  try {
    const data = await s3Client.send(
      new CreateBucketCommand({ Bucket: bucketParams.Bucket })
    );
    return data;
  } catch (err) {
    console.log("Error creating bucket", err);
  }
};
