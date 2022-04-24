var http = require('http');
var cookie = require('cookie'); // 쿠키 정보 깔끔하게 객체화된 것을 볼 수 있습니다.
// const parseCookies = (cookie = '' ) => 
//     cookie.split(';')
//         .map( v => v.split('='))
//         .map( ( [k, ...vs] ) => [k, vs.join('=')] )
//         .reduce ( (acc, [ k, v ]) =>  {
//             acc[k.trim()] = decodeURIComponent(v);
//             return acc;
//         }, {}
// );

http.createServer(function(request, response) {

    console.log("cookie=======",request.headers.cookie);

    var cookies = {};

    if(request.headers.cookie !== undefined) {
        cookies = cookie.parse(request.headers.cookie); 
        //cookies = parseCookies(request.headers.cookie);
    }
    
    // 쿠키 만들기
    response.writeHead(200, {
        'Set-Cookie':[
            'test=test1',
            `max_age=바보; Max-Age=${5}`,
            'Secure=Secure; Secure',
            //'HttpOnly=HttpOnly; HttpOnly',
            //'Path=Path; Path=/cookie',
            //'Domain=Domain; Domain=o2.org'
        ]
    });
    response.end('Cookie!!');

}).listen(5002);