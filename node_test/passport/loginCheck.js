export const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    const err = new Error('로그인한 이후에 이용하시기 바랍니다.');
    next(err);
  }
};

export const isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    const err = new Error('이미 로그인 상태입니다.');
    next(err);
  }
};
