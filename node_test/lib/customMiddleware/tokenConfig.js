const jwt = require('jsonwebtoken');
const User = require('../../models/user');

module.exports = {
  // 토큰 생성
  generateToken: (id, username) => {
    console.log('tokenConfig >>>>> generateToken!!');
    const payload = { id: id, username: username };
    const secretKey = process.env.JWT_SECRET;
    const options = { expiresIn: 60 * 60 }; //현재 1분 셋팅 | 60 * 60 * 24 * 30 //30 days
    return jwt.sign(payload, secretKey, options);
  },

  // 토큰 검증
  verifyToken: (req, res, next) => {
    console.log('tokenConfig >>>>> verifyToken!!');
    const token = req.cookies.access_token; //쿠키에 access_token 키의 쿠키값 취득

    if (!token) {
      const error = new Error('토큰이 없습니다.');
      next(error);
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET); //{ id: 1, userId: 'hj', iat: 1653361884, exp: 1653365484 }
      req.tokenUserInfo = {
        id: decoded.id,
        username: decoded.username
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

  // 토큰 갱신
  tokenRenewal: async (req, res, next) => {
    console.log('tokenRenewal====모든 라우터에 사용되어 쿠키에 토큰이 있으면 재발급 갱신한다.====');
    const token = req.cookies.access_token;
    console.log("token====", token);
    // 토큰이 없는 경우 다음 미들웨이 진행
    if (!token || token === "undefined") {
      console.log("토큰이 없습니다.");
      res.cookie('access_token','',{maxAge:0});
      //next()와 return next() 차이 있음
      return next();
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.tokenUserInfo = {
        id: decoded.id,
        username: decoded.username
      };

      // 토큰 1분 미만 남으면 재발급
      const now = Math.floor(Date.now() / 1000);

      if (decoded.exp - now < 60 * 60 ) {
        const userInfo = await User.findByUserInfo(decoded.username);
        const token = tokenConfig.generateToken(userInfo.id, userInfo.username);
        res.cookie('access_token', token, {
          maxAge: 1000 * 60, // 1분
          httpOnly: true,
        });
      }
      return next();
    } catch (err) {
      next(err);
    }
  },
};

// const checkLoggedIn = (req, res, next) => {
//   console.log('checkLoggedIn===', res.status);

//   // 로그인 성공시
//   return next();

//   // 로그인 실패시
//   // 1) 에러 처리 라우터로 전달
//   //throw new Error('에러는 에러 처리 미들웨어로 갑니다.');
//   // 2) 에러 메시지 자체 처리
//   //res.status(401).send('로그인하지 않은 사용자만 접근 가능합니다.');
// };
