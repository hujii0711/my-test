const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const path = require("path");
const fileuploadRouter = require("express").Router();

AWS.config.update({
  region: "ap-northeast-2",
  accessKeyId: "",
  secretAccessKey: "",
});

const s3 = new AWS.S3();
const allowedExtensions = [".png", ".jpg", ".jpeg", ".bmp"];

const imageUploader = multer({
  storage: multerS3({
    s3: s3,
    bucket: "polaris-upload-test",
    key: (req, file, callback) => {
      const uploadDirectory = "test";
      const extension = path.extname(file.originalname);
      if (!allowedExtensions.includes(extension)) {
        return callback(new Error("wrong extension"));
      }
      callback(null, `${uploadDirectory}/${Date.now()}_${file.originalname}`);
    },
    acl: "public-read-write",
  }),
});

fileuploadRouter.get("/", async (req, res, next) => {
  next();
});

fileuploadRouter.get("/fileIntro", async (req, res, next) => {
  res.render("fileIntro");
});

fileuploadRouter.post(
  "/test/upload",
  imageUploader.single("image"),
  (req, res) => {
    res.send("good!");
  }
);

module.exports.router = fileuploadRouter;
