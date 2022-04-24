const express = require('express');
const User = require('../models/user');

const router = express.Router();

// 시퀄라이즈는 프로미스를 기본적으로 지원하므로 then과 catch를 사용해서 각각 조회 성공시 와 실패시의 정보를 얻을 수 있다.
router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.render('sequelize', { users }); //view 폴더의 sequelize.html이 렌더링할 때 결과값을 보내줌
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
