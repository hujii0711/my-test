const fileUploadRouter = require("express").Router();

fileUploadRouter.get("/", async (req, res, next) => {
  next();
});

fileUploadRouter.get("/fileUpload", async (req, res, next) => {
  res.render("fileUpload");
});

fileUploadRouter.post("/fileUpload", async (req, res, next) => {
  res.render("fileUpload");
});

module.exports.router = fileUploadRouter;
