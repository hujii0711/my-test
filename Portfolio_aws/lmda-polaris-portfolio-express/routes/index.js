const indexRouter = require("express").Router();
const articleRoute = require("./article/ArticleRoutes");
//const googleStrategyRoute = require("./auth/GoogleStrategyRoute");
const localStrategyRoute = require("./auth/LocalStrategyRoute");

indexRouter.use(articleRoute.router);
indexRouter.use(localStrategyRoute.router);
//indexRouter.use(googleStrategyRoute.router);

module.exports = indexRouter;
