const express = require("express");
const session = require("express-session");
const FileStore = require("session-file-store")(session);

const app = express();

// 세션 미들웨어 추가
app.use(session({
    secret: 'hujii0711',	//필수적으로 설정해줘야 하는 옵션입니다. SID를 생성할 때 사용되는 비밀키
    resave: false,			//세션이 요청 중 변경되지 않아도 저장할지 말지를 저장한다. 기본값은 true인데, 보통은 false를 많이 쓴다고 한다.
    saveUninitialized: true,	//세션이 저장되기 전 uninitialized 상태로 미리 만들어 저장
    cookie: {			//세션 쿠키 설정 (세션 관리 시 클라이언트에 보내는 쿠키)
      //httpOnly: true,		//cookie는 세션 ID 쿠키 객체를 설정한다. 기본값은 path: '/', httpOnly: true, secure: false, maxAge: null 이다. 위에서 본 것과 같이 domain, expires, httpOnly 등 쿠키의 옵션을 설정해줄 수 있다.
      //secure: true
      test: "test1",
      httpOnly: true,
      secure: false
    },
    store: new FileStore(),
    name: 'session-cookie',
}));

app.get('/',(req, res) => {
    res.send('hello world');
})

// 세션 등록
app.get('/create', (req, res) => {
    // 세션이 이미 존재
    if (req.session.num === undefined) {
        req.session.num = 1;
    // 세션 생성
    } else {
        req.session.num += 1;
    }
    res.send(`View: ${req.session.num}`);
})

// 세션 확인
app.get('/get', (req, res) => {
    if(req.session.num){
        console.log(req.session);
        res.send('세션 o');
    }
    else {
        console.log('no session');
        res.send('세션 x');
    }
})

// 세션 삭제
app.get('/delete', (req, res) => {
    if(req.session){
        req.session.destroy(()=>{
            res.redirect('/');
        });
    }
    else {
        res.send('제거할 세션이 없습니다.');
    }
})

app.set('port', process.env.PORT || 5005);

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
});