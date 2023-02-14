/*
    form에서 파일 업로드하여 s3 버킷에 업로드
*/
const AWS = require("aws-sdk");
const multipart = require("parse-multipart");
const s3 = new AWS.S3();
const bluebird = require("bluebird");
const UPLOAD_URL = `https://${process.env.API_GATEWAY_UPLOAD_URL}`;
const BUCKET_NAME = "srg-polaris-portfolio-repository";
const UPLOAD_FOLDER = "temp";

exports.handler = (event, context) => {
  const result = [];
  const bodyBuffer = Buffer.from(event["body-json"].toString(), "base64");
  const boundary = multipart.getBoundary(event.params.header["content-type"]); //content-type | Content-Type
  const parts = multipart.Parse(bodyBuffer, boundary);
  const files = getFiles(parts);

  return bluebird
    .map(files, (file) => {
      return upload(file).then(
        (data) => {
          result.push({ data, file_url: file.uploadFile.full_path });
          console.log(`data=> ${JSON.stringify(data, null, 2)}`);
        },
        (err) => {
          console.log(`s3 upload err => ${err}`);
        }
      );
    })
    .then((_) => {
      return context.succeed(result);
    });
};

const upload = (file) => {
  return s3.upload(file.params).promise();
};

const getFiles = (parts) => {
  const files = [];
  parts.forEach((part) => {
    const buffer = part.data;
    const fileFullName = `${UPLOAD_FOLDER}/${part.filename}`; //temp/part.filename
    const filefullPath = `${UPLOAD_URL}/${fileFullName}`; //https://srg-polaris-portfolio-repository.s3.ap-northeast-2.amazonaws.com/temp/XXX.jpg

    const params = {
      Bucket: BUCKET_NAME,
      Key: fileFullName,
      Body: buffer,
    };

    const uploadFile = {
      size: buffer.toString("ascii").length,
      type: part.type,
      name: fileFullName,
      full_path: filefullPath,
    };

    files.push({ params, uploadFile });
  });
  return files;
};
