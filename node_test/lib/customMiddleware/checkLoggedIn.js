const checkLoggedIn = (req, res, next) => {
  console.log("req.tokenUserInfo=====", req.tokenUserInfo);
  if (!req.tokenUserInfo) {
    const error = new Error('로그인이 수행되지 않았습니다.');
    next(error);
  }
  next();
};

module.exports = checkLoggedIn;
