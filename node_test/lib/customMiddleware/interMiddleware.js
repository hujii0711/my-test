const interMiddleware = async (ctx, next) => {
  console.log('interMiddleware!!!!!!!!!');
  try {
    return next();
  } catch (e) {
    // 토큰 검증 실패
    return next();
  }
};

module.exports = interMiddleware;
