import client from './client';

// router.get('/chat/chatRoomList', ChatController.selectListChatRoom); //채팅방 목록 페이지
// router.post('/chat/insert/makeRoom', ChatController.insertChatMakeRoom); //채팅방 만들고 채팅방으로 이동
// router.post('/chat/existRoomCheck', ChatController.selectExistRoomCheck); //선택 유저와 기존 채팅방이 있는지 여부
// router.get('/chat/chatRoomMessage/:room_id', ChatController.selectListChatRoomMessage); //채팅방 입장
// router.post('/chat/sendMessge/:room_id', ChatController.insertChatMessage); //채팅 메시지 전송
// router.delete('/chat/delete/roomExit/:id', ChatController.deleteChatRoomExit); //채팅방 나가기
// router.post('/chat/sendMessgeUpload/:id', upload.single('fileUpload'), ChatController.insertFileUpload); //파입업로드
/*
  1. 채팅방 목록 조회 | /chat/chatRoomList
*/
export async function selectListChatRoom({nextOffset = 0, prevOffset = 0}) {
  const offset = nextOffset + prevOffset;
  const response = await client.get('/chat/chatRoomList', {
    params: {offset},
    headers: {returnType: 'list'},
  });
  return response.data;
}

/*
  2. 채팅방 개설 | /chat/insert/makeRoom
*/
export async function insertChatMakeRoom(params) {
  const config = {headers: {returnType: 'map'}};
  const response = await client.post('/chat/insert/makeRoom', params, config);
  return response.data;
}

/*
  3. 기존 방 있는지 유무 체크| /chat/existRoomCheck
*/
export async function selectExistRoomCheck(userId, selectedId) {
  const config = {headers: {returnType: 'map'}};
  const response = await client.post(
    `/chat/existRoomCheck`,
    {userId, selectedId},
    config,
  );
  return response.data;
}

/*
  4. 채팅방 입장하면서 채팅 메시지 목록 조회 | /chat/chatRoomMessage/:room_id
*/
export async function selectListChatRoomMessage({
  nextOffset = 0,
  prevOffset = 0,
  roomId = '',
}) {
  const offset = nextOffset + prevOffset;
  const response = await client.get(`/chat/chatRoomMessage/${roomId}`, {
    params: {offset},
    headers: {returnType: 'list'},
  });
  return response.data;
}

/*
  5. 채팅방 메시지 전송 | /chat/sendMessge/:room_id
*/
//mutateInsertChatMessage({roomId, message, participantId});
export async function insertChatMessage(params) {
  const {roomId, participantId: receiverId, message} = params;
  const config = {headers: {returnType: 'map'}};
  const response = await client.post(
    `/chat/sendMessge/${roomId}`,
    {receiverId, message},
    config,
  );
  return response.data;
}

/*
  6. 채팅방 나가기 | /chat/delete/roomExit/:id
*/
export async function deleteChatRoomExit(params) {
  const {room_id} = params;
  await client.delete(`/chat/delete/roomExit/${room_id}`);
  return null;
}

/*
  7. 파일업로드 메시지 전송 | /chat/sendMessgeUpload/:id
*/
//mutateInsertChatMessageUpload({formData, roomId, message, participantId});
export async function insertChatMessageUpload(params) {
  const {
    formData,
    roomId: room_id,
    participantId: receiver_id,
    message,
    file,
  } = params;
  const config = {
    headers: {returnType: 'map', 'content-type': 'multipart/form-data'},
    data: formData,
  };
  const response = await client.post(
    `/chat/sendMessgeUpload/${room_id}`,
    {receiver_id, message, file},
    config,
  );
  return response.data;
}

/*
  8. 사용자 정보 조회 /select
*/
export async function selectListUserInfo() {
  const config = {headers: {returnType: 'list'}};
  const response = await client.get(`/select`, config);
  return response.data;
}
