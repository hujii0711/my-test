const indexRouter = require("express").Router();
const testRoute = require("./test/TestRoutes");

indexRouter.use(testRoute.router);

module.exports = indexRouter;
