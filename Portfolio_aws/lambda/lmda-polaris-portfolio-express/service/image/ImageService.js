// const com = require("../../modules/common");
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

/********************************** 
 1. 이미지 조회 20230710
**********************************/
exports.selectImageList = async (query) => {
  //const { aaa } = query;
  try {
    const fileList = await getSignedUrlsForFilesInFolder();
    return fileList;
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
};
