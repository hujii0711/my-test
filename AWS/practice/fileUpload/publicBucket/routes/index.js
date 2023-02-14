const indexRouter = require("express").Router();
const filteuploadRoute = require("./test/FileUploadRoutes");
const filteupload2Route = require("./test/FileUpload2Routes");

indexRouter.use(filteuploadRoute.router);
indexRouter.use(filteupload2Route.router);

module.exports = indexRouter;
