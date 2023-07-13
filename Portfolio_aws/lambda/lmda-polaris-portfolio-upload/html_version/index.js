/*
    html에서 form에서 파일 업로드하여 s3 버킷에 업로드
    react-native 앱에서는 multipart/form-data 형식으로 인코딩된 이진 데이터가 html 에서 처럼 생성되지 않아
    S3 저장하고 이미지 다운로드시 이미지가 보이지 않는 증상 있음
*/
const AWS = require("aws-sdk");
const multipart = require("parse-multipart");
const s3 = new AWS.S3();
const bluebird = require("bluebird");
const UPLOAD_URL = `${process.env.API_GATEWAY_UPLOAD_URL}`;
const BUCKET_NAME = "srg-polaris-portfolio-repository";
const UPLOAD_FOLDER = "images/original";

exports.handler = (event, context) => {
  const result = [];
  //event["body-json"]: multipart/form-data 형식으로 인코딩된 이진 데이터
  const bodyBuffer = Buffer.from(event["body-json"].toString(), "base64");
  const boundary = multipart.getBoundary(event.params.header["content-type"]); //content-type | Content-Type
  const parts = multipart.Parse(bodyBuffer, boundary);
  // parts=========== [
  //   {
  //     filename: '1689004994981_image.png',
  //     type: 'image/jpeg',
  //     data: <Buffer 0d 0a 89 50 4e 47 0d 0a 1a 0a 00 00 00 0d 49 48 44 52 00 00 03 60 00 00 06 00 08 02 00 00 00 9f 3c bc 0e 00 00 00 f5 65 58 49 66 4d 4d 00 2a 00 00 00 ... 181892 more bytes>
  //   }
  // ]
  const files = getFiles(parts);
  // files=========== [
  //   {
  //     params: {
  //       Bucket: 'srg-polaris-portfolio-repository',
  //       Key: 'images/original/1689004994981_image.png',
  //       Body: <Buffer 0d 0a 89 50 4e 47 0d 0a 1a 0a 00 00 00 0d 49 48 44 52 00 00 03 60 00 00 06 00 08 02 00 00 00 9f 3c bc 0e 00 00 00 f5 65 58 49 66 4d 4d 00 2a 00 00 00 ... 181892 more bytes>
  //     },
  //     uploadFile: {
  //       size: 181942,
  //       type: 'image/jpeg',
  //       name: 'images/original/1689004994981_image.png',
  //       full_path: 'https://awxk4u2rc7.execute-api.ap-northeast-2.amazonaws.com/images/original/1689004994981_image.png'
  //     }
  //   }
  // ]

  return bluebird
    .map(files, (file) => {
      // bluebird >>>>> file=========== {
      //   params: {
      //     Bucket: 'srg-polaris-portfolio-repository',
      //     Key: 'images/original/1689004994981_image.png',
      //     Body: <Buffer 0d 0a 89 50 4e 47 0d 0a 1a 0a 00 00 00 0d 49 48 44 52 00 00 03 60 00 00 06 00 08 02 00 00 00 9f 3c bc 0e 00 00 00 f5 65 58 49 66 4d 4d 00 2a 00 00 00 ... 181892 more bytes>
      //   },
      //   uploadFile: {
      //     size: 181942,
      //     type: 'image/jpeg',
      //     name: 'images/original/1689004994981_image.png',
      //     full_path: 'https://awxk4u2rc7.execute-api.ap-northeast-2.amazonaws.com/images/original/1689004994981_image.png'
      //   }
      // }
      return upload(file).then(
        (data) => {
          result.push({ data, file_url: file.uploadFile.full_path });
          console.log(`data => ${JSON.stringify(data, null, 2)}`);
          // {
          //   "ETag": "\"c7da340ffb36c3b42e98cd2e640f367d\"",
          //   "ServerSideEncryption": "AES256",
          //   "Location": "https://srg-polaris-portfolio-repository.s3.ap-northeast-2.amazonaws.com/images/original/1689004994981_image.png",
          //   "key": "images/original/1689004994981_image.png",
          //   "Key": "images/original/1689004994981_image.png",
          //   "Bucket": "srg-polaris-portfolio-repository"
          // }
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
  // getFiles >>>>> parts======= [
  //   {
  //     filename: '1689004994981_image.png',
  //     type: 'image/jpeg',
  //     data: <Buffer 0d 0a 89 50 4e 47 0d 0a 1a 0a 00 00 00 0d 49 48 44 52 00 00 03 60 00 00 06 00 08 02 00 00 00 9f 3c bc 0e 00 00 00 f5 65 58 49 66 4d 4d 00 2a 00 00 00 ... 181892 more bytes>
  //   }
  // ]
  const files = [];
  parts.forEach((part) => {
    const buffer = part.data;
    const fileFullName = `${UPLOAD_FOLDER}/${part.filename}`;
    const filefullPath = `${UPLOAD_URL}/${fileFullName}`;

    const params = {
      Bucket: BUCKET_NAME,
      Key: fileFullName,
      Body: buffer,
      ContentType: part.type,
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
