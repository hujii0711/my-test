const indexRouter = require("express").Router();
const articleRoute = require("./article/ArticleRoutes");
const localStrategyRoute = require("./auth/LocalStrategyRoute");
const googleStrategyRoute = require("./auth/GoogleStrategyRoute");
const chatRoute = require("./chat/ChatRoutes");
const imageRoute = require("./image/ImageRoutes");

indexRouter.use(articleRoute.router);
indexRouter.use(localStrategyRoute.router);
indexRouter.use(googleStrategyRoute.router);
indexRouter.use(chatRoute.router);
indexRouter.use(imageRoute.router);

module.exports = indexRouter;
