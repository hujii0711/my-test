const express = require("express");
const session = require("express-session");
const MemoryStore = require("memorystore")(session);

const app = express();

app.use(
    session({
        secret: "secret key",
        resave: false,
        saveUninitialized: true,
        store: new MemoryStore({
            checkPeriod: 86400000, // 24 hours (= 24 * 60 * 60 * 1000 ms)
        }),
        cookie: { maxAge: 86400000 },
    })
);

app.get("/", (req, res) => {
    console.log(req.session);
    if (req.session.num === undefined) {
        req.session.num = 1;
    } else {
        req.session.num += 1;
    }

    res.send(`View: ${req.session.num}`);
});

app.set('port', process.env.PORT || 5005);

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
});