var http = require('http');
var cookie = require('cookie');
http.createServer(function(request, response) {

    console.log("cookie=======",request.headers.cookie);

    var cookies = {};

    if(request.headers.cookie !== undefined) {
        cookies = cookie.parse(request.headers.cookie); //yummy_cookie=choco; tasty_cookie=strawberry; Permanent=cookies; Secure=Secure; HttpOnly=HttpOnly
    }
    
    response.writeHead(200, {
        'Set-Cookie':[
            'yummy_cookie=choco',
            'tasty_cookie=strawberry',
            `Permanent=cookies; Max-Age=${60*60*24*30}`,
            'Secure=Secure; Secure',
            'HttpOnly=HttpOnly; HttpOnly',
            'Path=Path; Path=/cookie',
            'Domain=Domain; Domain=o2.org'
        ]
    });
    response.end('Cookie!!');
}).listen(5002);