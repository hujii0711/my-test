const AWS = require("aws-sdk");
const multipart = require("parse-multipart");
const s3 = new AWS.S3();
const bluebird = require("bluebird");

exports.handler = function (event, context) {
  const result = [];

  const bodyBuffer = new Buffer(event["body-json"].toString(), "base64");
  const boundary = multipart.getBoundary(event.params.header["Content-Type"]);
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

const upload = function (file) {
  return s3.upload(file.params).promise();
};

const getFiles = function (parts) {
  const files = [];

  parts.forEach((part) => {
    const buffer = part.data;
    const fileName = part.filename; //20221227_151033.png
    const fileFullName = "temp/" + fileName; // /temp/20221227_151033.png

    const filefullPath =
      "https://s3-fujii0711-temp.s3.ap-northeast-2.amazonaws.com" +
      fileFullName;

    const params = {
      Bucket: "s3-fujii0711-temp",
      Key: fileFullName,
      Body: buffer,
    };

    const uploadFile = {
      size: buffer.toString("ascii").length,
      type: part.type,
      name: fileName,
      full_path: filefullPath,
    };

    files.push({ params, uploadFile });
  });
  return files;
};
