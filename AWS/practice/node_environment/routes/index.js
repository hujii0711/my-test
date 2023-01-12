const express = require("express");
const router = express.Router();
//const AWS = require("aws-sdk"); //S3을 사용하기 위한 AWS 객체

// 메인 페이지, 채팅방 목록 보여주는 페이지
router.get("/", async (req, res, next) => {
  try {
    res.render("main", { title: "Release S3 웹호스팅" });
  } catch (error) {
    console.error(error);
    next(error);
  }
  // var s3 = new AWS.S3();
  // var params = {
  //   Bucket: "",
  //   Key: files.userfile.name,
  //   ACL: "public-read",
  //   Body: require('fs').createReadStream(files.userfile.path)
  // }
  // s3.upload(params, function(err, data){
  //   if(err){

  //   } else {

  //   }
  // });
});

module.exports = router;
