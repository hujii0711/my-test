const jwt = require('jsonwebtoken');
const User = require('../../models/user');

const tokenConfig = {
  // 토큰 생성
  generateToken: (id, username) => {
    const payload = { id, username };
    const secretKey = process.env.JWT_SECRET;
    const options = { expiresIn: 60 * 60 * 24 * 30 }; // 60 * 60 * 24 * 30 //30 days
    return jwt.sign(payload, secretKey, options);
  },

  // 토큰 검증 : 실제 프로젝트 내부에서 사용하지 않음
  verifyToken: (req, res, next) => {
    const token = req.cookies.access_token; //쿠키에 access_token 키의 쿠키값 취득

    if (!token) {
      const error = new Error('토큰이 없습니다.');
      return next(error);
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET); //{ id: 1, username: 'test', iat: 1653361884, exp: 1653365484 }
      req.tokenUserInfo = {
        id: decoded.id,
        username: decoded.username,
      };
    } catch (err) {
      next(error);
    } finally {
      if (!decoded) {
        return -1;
      } else {
        next();
      }
    }
  },

  // 로그인 체크
  checkLoggedIn: (req, res, next) => {
    console.log('tokenConfig >>>>>>>>>>>>>>>> checkLoggedIn!!!!!!!!!!');
    if (!req.tokenUserInfo) {
      const error = new Error('로그인이 수행되지 않았습니다.');
      next(error);
    }
    next();
  },

  // 토큰 갱신
  tokenRenewal: async (req, res, next) => {
    console.log('########### 모든 라우터 공용 : 토큰 갱신 ###########');
    //console.log('req.params======', req.params); // localhost/auth/post/userId
    //console.log('req.query======', req.query); // localhost/auth/post?userId
    //console.log('req.url======', req.url); // /api/posts?
    //console.log('req.method======', req.method);
    const token = req.cookies.access_token;

    // 토큰이 없는 경우 다음 미들웨이 진행
    if (!token) {
      res.clearCookie('access_token', '', { httpOnly: true });
      //next()와 return next() 차이 있음
      return next();
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.tokenUserInfo = {
        id: decoded.id,
        username: decoded.username,
      };

      // 토큰 3.5일 미만 남으면 재발급
      const now = Math.floor(Date.now() / 1000);

      if (decoded.exp - now < 60 * 60 * 24 * 3.5) {
        const userInfo = await User.findByUserInfo(decoded.username);
        const token = tokenConfig.generateToken(userInfo.id, userInfo.username);
        res.cookie('access_token', token, {
          maxAge: 1000 * 60 * 60 * 24 * 7, // 7일
          httpOnly: true,
        });
      }
      next();
    } catch (err) {
      next(err);
    }
  },
};

module.exports = tokenConfig;
