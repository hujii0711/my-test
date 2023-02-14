/**
 * 버킷에 파일업로드하고 내용 또한 저장한다.
 */
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const s3Client = new S3Client({ region: "ap-northeast-2" });

exports.handler = async (event, context) => {
  const bucketParams = {
    Bucket: "polaris-upload-test",
    Key: "temp/test12.txt", // s3버킷의 temp/test.txt 안에 저장됨
    Body: "test_test2", //test.txt안에 저장될 텍스트
  };

  // 버킷에 object 넣기
  try {
    const command = new PutObjectCommand(bucketParams);

    const signedUrl = await getSignedUrl(s3Client, command, {
      expiresIn: 100,
    });

    console.log("signedUrl================", signedUrl);

    const response = await fetch(signedUrl, {
      method: "PUT",
      body: bucketParams.Body,
    });
    console.log(
      `\nResponse returned by signed URL: ${await response.text()}\n`
    );
  } catch (err) {
    console.log("Error creating presigned URL", err);
  }
};
