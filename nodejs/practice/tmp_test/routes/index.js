const indexRouter = require("express").Router();
const testRoute = require("./test/TestRoutes");
const fileUploadRoute = require("./test/FileUploadRoutes");

indexRouter.use(testRoute.router);
indexRouter.use(fileUploadRoute.router);

module.exports = indexRouter;
