const imageRouter = require("express").Router();
const ImageController = require("../../controller/image/ImageController");

imageRouter.use("/images", (req, res, next) => {
  console.log("images 라우터 호출!!!!");
  next();
});

/*
  1. 이미지 조회: selectImageList | /images/viewer | get
*/
imageRouter.get("/images/viewer", ImageController.selectImageList);

module.exports.router = imageRouter;
