import { Server as SocketIO } from 'socket.io';

// new SocketIO(server, { path: '/socket.io' });
// 첫번째 인자: 익스프레스 서버와 연결, 두번째 인자 중 path: 클라이언트와 연결할 수 있는 경로
// socket.request; 요청 객체에 접근
// socket.request.res; 응답 객체에 접근
// socket.id; 소켓 고유의 아이디, 이 아이디로 소켓의 주인이 누군지 특정

export default (server: any, app: any) => {
  const io = new SocketIO(server, { path: '/socket.io' });
  app.set('io', io); //라우터에서 io 객체를 사용할 수 있게 저장, req.app.get("io")로 접근 가능

  io.on('connection', (socket: any) => {
    const req = socket.request;
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log('[SERVER] websocket connection....', ip, socket.id);
    socket.on('disconnect', () => {
      // 연결 종료 시
      console.log('클라이언트 접속 해제', ip, socket.id);
    });

    socket.on('error', (error: any) => {
      // 에러 시
      console.error(error);
    });
  });
};
