import jwt from 'jsonwebtoken';

const tokenConfig = {
  generateToken: (userId) => {
    console.log('########### modules > token.ts > generateToken() ###########');
    const payload = { userId };
    const options = { expiresIn: 60 * 60 * 24 * 30 }; // 60 * 60 * 24 * 30 //30 days || 30d
    return jwt.sign(payload, 'kimHyungJun', options);
  },

  verifyToken: (token) => {
    console.log('########### modules > token.ts > generateToken() ###########');
    console.log('token======', token);

    if (!token) {
      return {
        status: 'E',
        message: '토큰이 없습니다.',
      };
    }

    try {
      var decoded = jwt.verify(token, 'kimHyungJun');
      return {
        status: 'S',
        message: '토큰이 정상입니다.',
        user_id: decoded.userId,
        pwd: 'freepass',
        token,
      };
    } catch (err) {
      return {
        status: 'F',
        message: '토큰이 유효하지 않습니다.',
      };
    }
  },
};

export default tokenConfig;
