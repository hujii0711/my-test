const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const path = require("path");
const fileuploadMulterRouter = require("express").Router();

AWS.config.update({
  region: "ap-northeast-2",
  accessKeyId: "",
  secretAccessKey: "",
});

const uploadDirectory = "original";

const upload = multer({
  storage: multerS3({
    s3: new AWS.S3(),
    bucket: "polaris-upload-test",
    acl: "public-read-write",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key(req, file, cb) {
      // console.log("file===============", file);
      // file=============== {
      //   fieldname: 'image',
      //   originalname: '00325_HD.jpg',
      //   encoding: '7bit',
      //   mimetype: 'image/jpeg'
      // }
      cb(
        null,
        `${uploadDirectory}/${Date.now()}_${path.basename(file.originalname)}`
      ); // original 폴더안에다 파일을 저장
    },
  }),

  limits: { fileSize: 5 * 1024 * 1024 }, //용량 제한
});

fileuploadMulterRouter.get("/", async (req, res, next) => {
  next();
});

fileuploadMulterRouter.get("/fileIntro2", async (req, res, next) => {
  res.render("fileIntro2");
});

fileuploadMulterRouter.post(
  "/test/upload2",
  upload.single("image"),
  (req, res) => {
    // console.log("req.file===============", req.file);
    // req.file=============== {
    //   fieldname: 'image',
    //   originalname: '00325_HD.jpg',
    //   encoding: '7bit',
    //   mimetype: 'image/jpeg',
    //   size: 1360871,
    //   bucket: 'polaris-upload-test',
    //   key: 'original/1676299598863_00325_HD.jpg',
    //   acl: 'public-read-write',
    //   contentType: 'image/jpeg',
    //   contentDisposition: null,
    //   contentEncoding: null,
    //   storageClass: 'STANDARD',
    //   serverSideEncryption: null,
    //   metadata: null,
    //   location: 'https://polaris-upload-test.s3.ap-northeast-2.amazonaws.com/original/1676299598863_00325_HD.jpg',
    //   etag: '"d4b91f61b61b90a2b286690c43036ded"',
    //   versionId: undefined
    // }

    const originalUrl = req.file.location; //? s3 용 : multer s3에서 버킷 객체 경로를 반환함
    const url = originalUrl.replace(/\/original\//, "/thumb/");
    // 람다에서 리사이징 처리하고 새로 버킷에 압축 이미지를 저장하니, 압축된 이미지 버킷경로로 이미지url을 변경하여 클라이언트에 제공
    // 다만, 리사이징은 시간이 오래 걸리기 때문에 이미지가 일정 기간 동안 표시되지 않을 수 있으므로, 리사이징된 이미지를 로딩하는데 실패시 원본 이미지를 띄우기 위해 originalUrl도 같이 전송
    res.json({ url, originalUrl });
  }
);

module.exports.router = fileuploadMulterRouter;
