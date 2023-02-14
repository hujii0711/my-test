const AWS = require("aws-sdk");
const sharp = require("sharp");

const s3 = new AWS.S3();

exports.handler = async (event, context, callback) => {
  const Bucket = event.Records[0].s3.bucket.name; // 버켓명 polaris-upload-test
  const Key = event.Records[0].s3.object.key; // 업로드된 키명 images/original/XXXX.jpg
  const s3obj = { Bucket, Key };

  const filename = Key.split("/")[Key.split("/").length - 1]; // 경로 없애고 뒤의 파일명만 XXXX.jpg
  const ext = Key.split(".")[Key.split(".").length - 1].toLowerCase(); // 파일 확장자만 XXXX
  const requiredFormat = ext === "jpg" ? "jpeg" : ext; // sharp에서는 jpg 대신 jpeg 사용 jpeg
  const resizeFolder = "images/resize";
  const now = Date.now();

  try {
    //* 객체 불러오기
    const s3Object = await s3.getObject(s3obj).promise(); // 버퍼로 가져오기

    //* 리사이징
    const resizedImage = await sharp(s3Object.Body)
      .resize(400, 400, { fit: "inside" }) // 400x400 꽉 차게
      .toFormat(requiredFormat)
      .toBuffer();

    //* 객체 넣기
    await s3
      .putObject({
        Bucket,
        Key: `${resizeFolder}/${now}_${filename}`, // 리사이징 된 이미지를 images/resize 폴더에 새로저장
        Body: resizedImage,
      })
      .promise();

    // Lambda 함수 내부에서 모든 작업을 수행한 후에는 그에 대한 결과(또는 오류)와 함께 callback 함수를 호출하고 이를 AWS가 HTTP 요청에 대한 응답으로 처리한다.
    return callback(null, `${resizeFolder}/${now}_${filename}`);
  } catch (error) {
    console.error(error);
    return callback(error);
  }
};
