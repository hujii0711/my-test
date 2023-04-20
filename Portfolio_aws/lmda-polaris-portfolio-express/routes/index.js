const indexRouter = require("express").Router();
const articleRoute = require("./article/ArticleRoutes");
const localStrategyRoute = require("./auth/LocalStrategyRoute");

indexRouter.use(articleRoute.router);
indexRouter.use(localStrategyRoute.router);

module.exports = indexRouter;
