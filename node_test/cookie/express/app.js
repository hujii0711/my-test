const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();

app.use(cookieParser("sibal"));


const value = "쿠키값";

app.get('/', function(req,res) {

    res.cookie("name", value, {maxAge: 1000*5});
    res.send(`Hello, Express Cookie!!Cookie : ${value}`);
});

// 쿠키 확인 
app.get('/get', (req, res) => {
    res.send(req.cookies);
});


app.set('port', process.env.PORT || 5004);

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
});