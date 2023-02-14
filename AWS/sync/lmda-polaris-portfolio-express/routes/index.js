const indexRouter = require("express").Router();
const testRoute = require("./test/TestRoutes");
const testRoute2 = require("./test2/Test2Routes");

indexRouter.use(testRoute.router);
indexRouter.use(testRoute2.router);

module.exports = indexRouter;