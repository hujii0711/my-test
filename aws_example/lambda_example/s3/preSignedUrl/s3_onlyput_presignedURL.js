/**
 * 미리 서명된 URL을 생성하여 버킷에 객체를 업로드 합니다.
 */
const { PutObjectCommand } = require("@aws-sdk/client-s3");
const { s3Client } = require("./s3Client.js");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

// Set parameters
// Create a random name for the Amazon Simple Storage Service (Amazon S3) bucket and key
const bucketParams = {
  Bucket: `test-bucket-${Math.ceil(Math.random() * 10 ** 10)}`,
  Key: `test-object-${Math.ceil(Math.random() * 10 ** 10)}`,
  Body: "BODY",
};

const run = async () => {
  // 버킷에 object 넣기
  try {
    // Create a command to put the object in the S3 bucket.
    const command = new PutObjectCommand(bucketParams);
    // Create the presigned URL.
    const signedUrl = await getSignedUrl(s3Client, command, {
      expiresIn: 3600,
    });
    console.log(
      `\nPutting "${bucketParams.Key}" using signedUrl with body "${bucketParams.Body}" in v3`
    );
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
run();
