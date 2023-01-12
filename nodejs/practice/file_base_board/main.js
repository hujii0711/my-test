var express = require('express');
var app = express();
var fs = require('fs');
var sanitizeHtml = require('sanitize-html');
var bodyParser = require('body-parser');
var compression = require('compression');
var topicRouter = require('./routes/topic');
var indexRouter = require('./routes/index');
var helmet = require('helmet');

app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());
app.use(express.static('public'));

// 모든 요청이 들어왔을때 request 객체에 fileList 정보를 추가
app.get('*', (request, response, next) => {
    fs.readdir('./data', (error, filelist) => {
        request.list = filelist;
        next();
    });
});

app.use('/', indexRouter);
app.use('/topic', topicRouter);

app.use((req, res, next) => {
    res.status(404).send('Sorry cant find that!'); // 404 발생했을때 처리하는 미들웨어
});

app.use((err, req, res, next) => {
    console.log("에러 처리 미들웨어!!!")
    console.error(err.stack);
    res.status(500).send('Something broke!')
});

app.listen(3000, () => {
    console.log('Example app listening on port 3000!')
});