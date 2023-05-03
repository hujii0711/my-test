const indexRouter = require("express").Router();
const articleRoute = require("./article/ArticleRoutes");
const localStrategyRoute = require("./auth/LocalStrategyRoute");
const chatRoute = require("./chat/ChatRoutes");

indexRouter.use(articleRoute.router);
indexRouter.use(localStrategyRoute.router);
indexRouter.use(chatRoute.router);

module.exports = indexRouter;
