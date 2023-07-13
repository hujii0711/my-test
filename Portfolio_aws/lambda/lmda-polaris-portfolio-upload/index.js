/*
    react-native 앱에서 이미지 업로드
    이미지 파일을 base64로 인코딩하여서 base64 자체를 s3에 저장하면 이미지 파일이 들어간다.
    ContentEncoding: "base64" 이 옵션이 핵심이다.
*/
const AWS = require("aws-sdk");
const s3 = new AWS.S3();
const Promise = require("bluebird");
const UPLOAD_URL = `${process.env.API_GATEWAY_UPLOAD_URL}`;
const BUCKET_NAME = "srg-polaris-portfolio-repository";

exports.handler = async (event) => {
  const result = [];
  const body = JSON.parse(event.body);
  const fileJson = body.fileInfo; //[{"base64": asdasdasdasdasdasdasd, "mime": "image/png", "fileName": "1688877043000.png", "size":16888}]
  const key = body.key;
  const files = getFiles(fileJson, key);
  // files=========== [
  //   {
  //     params: {
  //       Bucket: 'srg-polaris-portfolio-repository',
  //       Key: 'images/original/20230713012048_1689211248391.png',
  //       Body: <Buffer 89 50 4e 47 0d 0a 1a 0a 00 00 00 0d 49 48 44 52 00 00 03 60 00 00 06 00 08 02 00 00 00 9f 3c bc 0e 00 00 00 f5 65 58 49 66 4d 4d 00 2a 00 00 00 08 00 ... 181890 more bytes>,
  //       ContentEncoding: 'base64',
  //       ContentType: 'image/png'
  //     },
  //     uploadFiles: {
  //       size: 181940,
  //       type: 'image/png',
  //       name: '20230713012048_1689211248391.png',
  //       full_path: 'https://7k5z63s4tk.execute-api.ap-northeast-2.amazonaws.com/images/original/20230713012048_1689211248391.png'
  //     }
  //   }
  // ]
  return Promise.map(files, (file) => {
    // file=========== [
    //   {
    //     params: {
    //       Bucket: 'srg-polaris-portfolio-repository',
    //       Key: 'images/original/2023_07_13 01:09:06__1689210546822.png',
    //       Body: <Buffer 89 50 4e 47 0d 0a 1a 0a 00 00 00 0d 49 48 44 52 00 00 03 60 00 00 06 00 08 02 00 00 00 9f 3c bc 0e 00 00 00 f5 65 58 49 66 4d 4d 00 2a 00 00 00 08 00 ... 181890 more bytes>,
    //       ContentEncoding: 'base64',
    //       ContentType: 'image/png'
    //     },
    //     uploadFiles: {
    //       size: 181940,
    //       type: 'image/png',
    //       name: '2023_07_13 01:09:06__1689210546822.png',
    //       full_path: 'https://7k5z63s4tk.execute-api.ap-northeast-2.amazonaws.com/2023_07_13 01:09:06__1689210546822.png'
    //     }
    //   }
    // ]
    return upload(file)
      .then((data) => {
        // data========= {
        //   ETag: '"b1222aef629d41b78b2ed40fdd1a8a66"',
        //   ServerSideEncryption: 'AES256',
        //   Location: 'https://srg-polaris-portfolio-repository.s3.ap-northeast-2.amazonaws.com/images/original/20230713012048_1689211248391.png',
        //   key: 'images/original/20230713012048_1689211248391.png',
        //   Key: 'images/original/20230713012048_1689211248391.png',
        //   Bucket: 'srg-polaris-portfolio-repository'
        // }
        result.push({ data, file_url: file.uploadFiles.full_path });
      })
      .catch((err) => {
        console.log(`s3 upload err => ${err}`);
      });
  })
    .then((_) => {
      return {
        statusCode: 200,
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Access-Control-Expose-Headers": "*",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(result),
      };
    })
    .catch((err) => {
      console.log(`Promise.map==================> ${err}`);
    });
};

const upload = (file) => {
  return s3.upload(file.params).promise();
};

const getFiles = (fileJson, key) => {
  return fileJson.reduce((returnObj, cur) => {
    const imageBase64 = Buffer.from(cur.base64, "base64");

    const params = {
      Bucket: BUCKET_NAME, //srg-polaris-portfolio-repository
      Key: `${key}/${cur.fileName}`, //images/original/test.png
      Body: imageBase64,
      ContentEncoding: "base64",
      ContentType: cur.mime,
    };

    const uploadFiles = {
      size: cur.size,
      type: cur.mime,
      name: cur.fileName,
      full_path: `${UPLOAD_URL}/${key}/${cur.fileName}`,
    };

    returnObj.push({ params, uploadFiles });
    return returnObj;
  }, []);
};
