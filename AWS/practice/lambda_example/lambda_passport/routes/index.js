const indexRouter = require("express").Router();
const googleStrategyRoute = require("./login/GoogleStrategyRoute");
const localStrategyRoute = require("./login/LocalStrategyRoute");

indexRouter.use(googleStrategyRoute.router);
indexRouter.use(localStrategyRoute.router);

module.exports = indexRouter;
