const express = require('express');

const router = express.Router();

// /user 로 호출되는 모든 라우터 실행전에 호출되는 미들웨어
router.use((req, res, next) => {
    console.log('Time: ', Date.now());
    next();
});

// 라우터 호출 후 다음 미들웨어 실행
router.get('/test', function (req, res, next) {
    console.log('hi');
    next();
}, (req, res) => {
    res.send('Hello ');
});

router.get('/', (req, res) => {
    console.log('user Router___GET');
    res.send('user Router___GET');
});

router.post('/', (req, res) => {
    console.log('user Router___POST');
    res.send('user Router___POST');
});

module.exports = router;