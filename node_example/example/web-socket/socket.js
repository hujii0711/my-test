const SocketIO = require('socket.io');
const axios = require('axios');
const cookieParser = require('cookie-parser');
const cookie = require('cookie-signature');

// app.js webSocket(server, app, sessionMiddleware);와 연결되는 부분
module.exports = (server, app, sessionMiddleware) => {
  const io = SocketIO(server, { path: '/socket.io' }); //{ path: '/socket.io' } : 클라이언트와 연결할 수 있는 경로를 의미
  // 소켓 객체를 익스프레스와 연결하고, req.app.get('io')로 라우터에서 소켓 객체를 가져오는 방식
  app.set('io', io);
  // of: Socket.IO에 네임스페이스를 부여하는 메서드이다. 같이 네임스페이스끼리만 데이터를 전달한다.
  const room = io.of('/room'); // 현재 채팅방 생성 및 삭제에 관한 정보를 전달하는 /room 네임스페이스
  const chat = io.of('/chat'); // 채팅 메시지를 전달하는 /chat 네임스페이스

  // io.use 메서드에 미들웨어를 장착한다. 이 부분은 모든 웹 소켓 연결 시마다 실행된다.
  // 세션 미들웨어에 요청 객체, 응답 객체, next 함수를 인자로 넣어주면 된다.
  io.use((socket, next) => {
    cookieParser(process.env.COOKIE_SECRET)(socket.request, socket.request.res, next);
    sessionMiddleware(socket.request, socket.request.res, next);
  });

  // 클라이언트가 접속했을 때 발생하고 콜백으로 socket 객체를 제공
  room.on('connection', (socket) => { // /room 네임스페이스에 이벤트 리스너를 붙임
    console.log('room 네임스페이스에 접속');
    socket.on('disconnect', () => {
      console.log('room 네임스페이스 접속 해제');
    });
  });

  chat.on('connection', (socket) => { // /chat 네임스페이스에 이벤트 리스너를 붙임
    console.log('chat 네임스페이스에 접속');    
    const req = socket.request; //socket.request속성으로 요청 객체에 접근할 수 있다.
    ////socket.request.res로는 응답 객체에 접근할 수 있다.
    const { headers: { referer } } = req;
    const roomId = referer
      .split('/')[referer.split('/').length - 1]
      .replace(/\?.+/, '');
    socket.join(roomId); // 네임스페이스 접속시 발생
    // socket.to(방 아이디): 특정 방에 데이터를 보낼 수 있다. 세션 미들웨어와 Socket.IO를 연결했기 때문에 웹 소켓에서 세션을 사용할 수 있다.
    // 방에 참여할 때 방에 누군가가 입장했다는 시스템 메시지를 보낸다.
    socket.to(roomId).emit('join', { // 사용자 입장시 발생
      user: 'system',
      chat: `${req.session.color}님이 입장하셨습니다.`,
    });

    // 접속 해제 시에는 현재 방의 사람 수를 구해서 0명이면 방을 제거하는 HTTP 요청을 보낸다.
    socket.on('disconnect', () => {
      console.log('chat 네임스페이스 접속 해제');
      socket.leave(roomId);// 네임스페이스 접속 해제시 발생
      //socket.adapter.rooms[방 아이디]: 참여 중인 소켓 정보가 있다. 참여자 수가 0명이 아니면 방에 남아 있는 참여자에게 퇴장했다는 메시지 줌
      const currentRoom = socket.adapter.rooms[roomId];
      const userCount = currentRoom ? currentRoom.length : 0;
      if (userCount === 0) { // 유저가 0명이면 방 삭제
        const signedCookie = cookie.sign(req.signedCookies['connect.sid'], process.env.COOKIE_SECRET);
        const connectSID = `${signedCookie}`;
        axios.delete(`http://localhost:8005/room/${roomId}`, {
          headers: {
            Cookie: `connect.sid=s%3A${connectSID}`
          } 
        })
          .then(() => {
            console.log('방 제거 요청 성공');
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        socket.to(roomId).emit('exit', { // 사용자 퇴장시 발생
          user: 'system',
          chat: `${req.session.color}님이 퇴장하셨습니다.`,
        });
      }
    });
    socket.on('chat', (data) => {
      socket.to(data.room).emit(data);
    });
  });
};
