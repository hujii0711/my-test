const express = require("express");
const router = express.Router();

router.get("/index", (req, res) => {
  res.json({ response: true, msg: "/index 성공" });
});

router.get("/app", (req, res) => {
  res.json({ response: true, msg: "/app 성공" });
});

router.get("/test", async (req, res, next) => {
  res.json({ response: true, msg: "/test 성공" });
});

module.exports = router;
