/**
 * signedUrl로 객체를 가져온다.
 * signedUrl로 브라우저에 입력하면 해당 파일이 다운로드 된다.
 */
const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const s3Client = new S3Client({ region: "ap-northeast-2" });

exports.handler = async (event, context) => {
  const bucketParams = {
    Bucket: "polaris-upload-test",
    Key: "temp/test1.txt", // s3버킷의 temp/test.txt를 가져옴
  };

  try {
    const command = new GetObjectCommand(bucketParams);

    const signedUrl = await getSignedUrl(s3Client, command, {
      expiresIn: 10, // 10초 유지
    });
    console.log("signedUrl===========", signedUrl);
  } catch (err) {
    console.log("Error creating presigned URL", err);
  }
};
