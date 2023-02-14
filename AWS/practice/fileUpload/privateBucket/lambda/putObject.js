/**
 * 버킷에 파일업로드하고 내용 또한 저장한다.
 */
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const s3Client = new S3Client({ region: "ap-northeast-2" });

exports.handler = async (event, context) => {
  const bucketParams = {
    Bucket: "polaris-upload-test",
    Key: "temp/test1.txt", // s3버킷의 temp/test.txt 안에 저장됨
    Body: "test_test", //test.txt안에 저장될 텍스트
  };

  try {
    const data = await s3Client.send(new PutObjectCommand(bucketParams));
    return data;
  } catch (err) {
    console.log("Error creating presigned URL", err);
  }
};
