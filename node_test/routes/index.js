const express = require('express');
const router = express.Router();

// <form> 태그의 method는 get, post 두가지 밖에 없다.
// put, patch, delete를 넣으면 get으로만 받는다.

router.get('/', (req, res) => {
  res.render('index', { title: 'JWT Token GET' });
});

router.post('/', (req, res) => {
  res.render('index', { title: 'JWT Token POST' });
});

//axios.create().put("/");
router.put('/', (req, res) => {
  res.render('index', { title: 'JWT Token PUT' });
});

//axios.create().patch("/");
router.patch('/', (req, res) => {
  res.render('index', { title: 'JWT Token PATCH' });
});

//axios.create().delete("/");
router.delete('/', (req, res) => {
  res.render('index', { title: 'JWT Token DELETE' });
});

module.exports = router;
