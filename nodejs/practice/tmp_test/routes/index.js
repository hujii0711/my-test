const indexRouter = require("express").Router();
const testRoute = require("./test/TestRoutes");
const fileUploadRoute = require("./test/FileUploadRoutes");
const oAuthRoute = require("./test/OAuthRoutes");

indexRouter.use(testRoute.router);
indexRouter.use(fileUploadRoute.router);
indexRouter.use(oAuthRoute.router);

module.exports = indexRouter;
