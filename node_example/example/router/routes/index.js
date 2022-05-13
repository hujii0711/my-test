const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('index Router___GET');
});

module.exports = router;
