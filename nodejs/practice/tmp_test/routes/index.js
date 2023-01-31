const indexRouter = require("express").Router();
const testRoute = require("./test/TestRoutes");
const test2Route = require("./test/Test2Routes");

indexRouter.use(testRoute.router);
indexRouter.use(test2Route.router);

module.exports = indexRouter;
