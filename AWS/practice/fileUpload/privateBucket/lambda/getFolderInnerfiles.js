const {
  S3Client,
  GetObjectCommand,
  ListObjectsV2Command,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

// AWS 구성
const s3Client = new S3Client({
  region: "ap-northeast-2",
});

exports.handler = async (event, context) => {
  try {
    const fileList = await getSignedUrlsForFilesInFolder();
    const response = {
      isBase64Encoded: true,
      statusCode: 200,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Expose-Headers": "*",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(fileList),
    };
    console.log("response=====", response);
    return response;
  } catch (err) {
    console.log("err=====", err);
  }
};

const getSignedUrlsForFilesInFolder = async () => {
  const listObjectsCommand = new ListObjectsV2Command({
    Bucket: "srg-polaris-portfolio-repository",
    Prefix: "images/original",
  });

  const data = await s3Client.send(listObjectsCommand);

  const signedUrls = [];
  for (const object of data.Contents) {
    const getObjectCommand = new GetObjectCommand({
      Bucket: "srg-polaris-portfolio-repository",
      Key: object.Key,
    });

    const url = await getSignedUrl(s3Client, getObjectCommand, {
      expiresIn: 3600,
    });
    signedUrls.push(url);
  }
  return signedUrls;

  // data.Contents.forEach(async (elem) => {
  //   const command = new GetObjectCommand({
  //     Bucket: "srg-polaris-portfolio-repository",
  //     Key: elem.Key,
  //   });

  //   const url = await getSignedUrl(s3Client, command, {
  //     expiresIn: 3600,
  //   });
  //   resultArr.push(url);
  // });
  // return resultArr;
};
