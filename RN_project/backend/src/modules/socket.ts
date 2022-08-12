import { Server as SocketIO } from 'socket.io';

export default (server: any) => {
  console.log('SocketIO:::::connection1');
  const io = new SocketIO(server, { path: '/socket.io' });

  io.on('connection', (socket: any) => {
    console.log('SocketIO:::::connection2');
    // 웹소켓 연결 시
    const req = socket.request;
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log('새로운 클라이언트 접속!', ip, socket.id, req.ip);
    socket.on('disconnect', () => {
      // 연결 종료 시
      console.log('클라이언트 접속 해제', ip, socket.id);
      clearInterval(socket.interval);
    });
    socket.on('error', (error: any) => {
      // 에러 시
      console.error(error);
    });
    socket.on('reply', (data: any) => {
      // 클라이언트로부터 메시지
      console.log(data);
    });
    socket.interval = setInterval(() => {
      // 3초마다 클라이언트로 메시지 전송
      socket.emit('news', 'Hello Socket.IO');
    }, 3000);
  });
};
