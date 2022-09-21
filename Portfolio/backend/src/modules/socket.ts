import { Server as SocketIO } from 'socket.io';
import cookieParser from 'cookie-parser';
import { NextFunction } from 'express';
import env from '../modules/env';
// new SocketIO(server, { path: '/socket.io' });
// 첫번째 인자: 익스프레스 서버와 연결, 두번째 인자 중 path: 클라이언트와 연결할 수 있는 경로
// socket.request; 요청 객체에 접근
// socket.request.res; 응답 객체에 접근
// socket.id; 소켓 고유의 아이디, 이 아이디로 소켓의 주인이 누군지 특정

export default (server: any, app: any, sessionMiddleware: any) => {
  const io = new SocketIO(server, { path: '/socket.io' }); //익스프레스 서버와 연결
  app.set('io', io); //라우터에서 io 객체를 사용할 수 있게 저장, req.app.get("io")로 접근 가능

  // io.use((socket: any, next: NextFunction) => {
  //   cookieParser(env.cookie.secret)(socket.request, socket.request.res, next);
  //   sessionMiddleware(socket.request, socket.request.res, next);
  // });

  io.on('connection', (socket: any) => {
    // 클라이언트와 서버가 웹소켓 연결될 때 실행되는 이벤트
    const req = socket.request; //socket.request로 요청 객체에 접근 가능
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress; //클라이언트의 IP를 알아내는 유명한 방법
    console.log('[SERVER] websocket connection....', ip, socket.id); //socket.id로 소켓 고유 아이디 확인 가능
    socket.on('disconnect', () => {
      // 연결 종료 시
      console.log('클라이언트 접속 해제', ip, socket.id);
    });

    socket.on('reply', (data: any) => {
      // 사용자가 직접 만들 이벤트로 클라이언트에서 reply 이벤트 발생 시 서버에 전달됨
      console.log(data);
    });

    socket.on('error', (error: any) => {
      // 에러 시
      console.error(error);
    });
  });
};
