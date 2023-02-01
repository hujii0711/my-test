const indexRouter = require("express").Router();
const testRoute = require("./test/TestRoutes");
const test2Route = require("./test/Test2Routes");
const test3Route = require("./test/Test3Routes");

indexRouter.use(testRoute.router);
indexRouter.use(test2Route.router);
indexRouter.use(test3Route.router);

module.exports = indexRouter;
