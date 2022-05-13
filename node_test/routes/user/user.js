const express = require('express');
const {dbSelect, dbInsert, dbUpdate, dbDelete}  = require('./userCtrl');
const User = require('../../models/user');
const router = express.Router();

// user 로 호출되는 모든 라우터 실행전에 호출되는 미들웨어
router.use((req, res, next) => {
    console.log('Time: ', Date.now());
    next();
});

// 라우터 호출 후 다음 미들웨어 실행
router.get('/nextTest', function (req, res, next) {
    console.log('next1');
    //throw new Error("aaa"); // app.js 에러처리 라우터 호출
    //next(err);// app.js 에러처리 라우터 호출
    next();
}, (req, res) => { // next() 호출시 실행
    console.log('next2');
    res.send('Hello ');
});

//---------------------------------------------------------------------------------------

// 조회: GET
router.get('/select', async(req, res) => { // /user/select
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

// 등록 : POST
router.get('/insert', async(req, res) => { // /user/insert
    try {
        const user = await User.create({
            id : 1,
            name: "김형준",
            profile: "개발자",
        });
        res.status(201).json(user);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

// 수정 : PUT
router.get('/update', async(req, res) => { // /user/update
    try {
        const result = await User.update({
            profile: "디자이너",
        }, 
        {
            where: { id: 1 },
        });
        res.json(result);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

// 삭제 : DELETE
router.get('/delete', async(req, res) => { // /user/delete
    try {
        const result = await User.destroy({ where: { id: 1 } });
        res.json(result);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.get('/', (req, res) => { // /user
    console.log('user Router___GET');
    res.send('user Router___GET');
});

router.post('/', (req, res) => { // /user
    console.log('user Router___POST');
    res.send('user Router___POST');
});

module.exports = router;