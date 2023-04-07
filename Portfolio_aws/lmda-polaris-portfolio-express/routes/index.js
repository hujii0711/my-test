const indexRouter = require("express").Router();
const testRoute = require("./test/TestRoutes");
const testRoute2 = require("./test2/Test2Routes");
const articleRoute = require("./article/ArticleRoutes");

indexRouter.use(testRoute.router);
indexRouter.use(testRoute2.router);
indexRouter.use(articleRoute.router);

module.exports = indexRouter;