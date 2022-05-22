const express = require('express');
const { test, greet } = require('./postFunc');
const router = express.Router();

router.get('/test', (req, res) => {
  // 객체 받기
  console.log('greet===', greet);
  // 함수 받기
  test(1);
  res.send('post_test Router___GET');
});

router.get('/', (req, res) => {
  res.send('post Router___GET');
});

router.post('/', (req, res) => {
  res.send('post Router___POST');
});

module.exports = router;
