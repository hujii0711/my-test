const express = require('express');
const cookieParser = require('cookie-parser'); //쿠키를 다루기 위한 미들웨어
//이 미들웨어는 req.cookies에 들어있는 String을 parsing해 객체로 바꿔주고, res에서 cookie 메소드를 통해 쿠키를 생성, 관리해줄 수 있게 해줍니다.

const app = express();

app.use(cookieParser("secret-code"));//string은 쿠키의 변형을 감지할 때 사용

const value = "쿠키값";

//응답 객체에 cookie라는 property를 이용해 손쉽게 쿠키를 등록
app.get('/', function(req,res) {
    // 쿠키 생성 & 변경
    res.cookie("name", "바보", {maxAge: 1000*5});

    // 쿠키 생성 + 옵션
    res.cookie('test-cookie','1234',{
      maxAge: 60*60*24,
      httpOnly: true,
      secure: true
    });
    res.send(`Hello, Express Cookie!!Cookie : ${value}`);
});

// 쿠키 읽기 
app.get('/get', (req, res) => {
    const cookies = req.cookies;
    res.send(cookies);
});

//쿠키 변경
app.get('/update', (req, res) => {
  res.cookie('name', "똥개");
  res.send('name updated.');
});

//쿠키 삭제
app.get('/delete', (req, res) => {
  res.clearCookie('test-cookie');
});

app.set('port', process.env.PORT || 5004);

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
});