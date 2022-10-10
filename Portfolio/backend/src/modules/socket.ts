import { Server as SocketIO } from 'socket.io';
import cookieParser from 'cookie-parser';
import env from '../modules/env';
import cookie from 'cookie-signature';

// var cookie = require('cookie-signature');

// var val = cookie.sign('hello', 'tobiiscool');
// val.should.equal('hello.DGDUkGlIkCzPz+C0B064FNgHdEjox7ch8tOBGslZ5QI');

// var val = cookie.sign('hello', 'tobiiscool');
// cookie.unsign(val, 'tobiiscool').should.equal('hello');
// cookie.unsign(val, 'luna').should.be.false;
// new SocketIO(server, { path: '/socket.io' });
// 첫번째 인자: 익스프레스 서버와 연결, 두번째 인자 중 path: 클라이언트와 연결할 수 있는 경로
// socket.request; 요청 객체에 접근
// socket.request.res; 응답 객체에 접근
// socket.id; 소켓 고유의 아이디, 이 아이디로 소켓의 주인이 누군지 특정

export default (server: any, app: any, sessionMiddleware: any) => {
  const io = new SocketIO(server, { path: '/socket.io' }); //익스프레스 서버와 연결
  app.set('io', io); //라우터에서 io 객체를 사용할 수 있게 저장, req.app.get("io")로 접근 가능
  const chat = io.of('/chat');

  //const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);
  const wrap = (middleware: any) => (socket: any, next: any) =>
    middleware(socket.request, socket.request.res || {}, next);
  chat.use(wrap(cookieParser(env.cookie.secret)));
  chat.use(wrap(sessionMiddleware));

  // io.use((socket: any, next: any) => {
  //   cookieParser(env.cookie.secret)(socket.request, socket.request.res, next);
  //   //sessionMiddleware(socket.request, socket.request.res, next);
  // });

  chat.on('connection', (socket: any) => {
    console.log('chat 네임스페이스에 접속');
    const req = socket.request;
    // console.log('req.cookies========', req.cookies);
    // console.log('req.user========', req.user);
    // console.log('req.session========', req.session);
    // console.log('req.sessionID========', req.sessionID);
    // req.cookies======== {}
    // req.user======== undefined
    // req.session======== Session {
    //   cookie: { path: '/', _expires: null, originalMaxAge: null, httpOnly: true },
    //   passport: { user: '2bc11da5-b1e4-48b9-af2d-605f4bda9af3' }
    // }
    // req.sessionID======== fB44quwSGxmjqI9cXz13KWxkbjVxeGFe

    const roomId = req._query.room_id; //클라이언트에서 접속시 보낸 room_id 파라미터

    socket.join(roomId);

    socket.to(roomId).emit('join', {
      message: `테스터님이 입장하셨습니다.`,
    });

    socket.on('disconnect', () => {
      console.log('chat 네임스페이스 접속 해제');
      socket.leave(roomId);
      const currentRoom = socket.adapter.rooms[roomId];
      const userCount = currentRoom ? currentRoom.length : 0;
      console.log('userCount====', userCount);
      // if (userCount === 0) {
      //   // 유저가 0명이면 방 삭제
      //   const signedCookie = cookie.sign(req.signedCookies['connect.sid'], env.cookie.secret);

      //   const connectSID = `${signedCookie}`;

      //   const config = {
      //     headers: {
      //       Cookie: `connect.sid=s%3A${connectSID}`,
      //     },
      //   };

      //   try {
      //     await axios.delete(`/chat/roomExit/${roomId}`, config);
      //   } catch (err) {
      //     console.log(err);
      //   }
      // } else {
      //   socket.to(roomId).emit('exit', {
      //     message: `${req.user}님이 퇴장하셨습니다.`,
      //   });
      // }
    });
  });
};

// io.on('connection', (socket: any) => {
//   // 클라이언트와 서버가 웹소켓 연결될 때 실행되는 이벤트
//   const req = socket.request; //socket.request로 요청 객체에 접근 가능
//   const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress; //클라이언트의 IP를 알아내는 유명한 방법
//   console.log('[SERVER] websocket connection....', ip, socket.id); //socket.id로 소켓 고유 아이디 확인 가능
//   socket.on('disconnect', () => {
//     // 연결 종료 시
//     console.log('클라이언트 접속 해제', ip, socket.id);
//   });

//   socket.on('reply', (data: any) => {
//     // 사용자가 직접 만들 이벤트로 클라이언트에서 reply 이벤트 발생 시 서버에 전달됨
//     console.log(data);
//   });

//   socket.on('error', (error: any) => {
//     // 에러 시
//     console.error(error);
//   });
// });
//};
