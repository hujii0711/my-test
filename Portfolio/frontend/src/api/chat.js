import client from './client';

// 1. router.get('/chat/intro', ChatController.selectListChatRoom); //채팅방 목록 페이지
// 2. router.post('/chat/makeRoom', ChatController.insertChatMakeRoom); //채팅방 만들고 채팅방으로 이동
// 3. router.get('/chat/roomEntrance/:id', ChatController.selectListChatRoomMessage); //채팅방 입장
// 4. router.post('/chat/sendMessge/:id', ChatController.insertChatMessage); //채팅 메시지 전송
// 5. router.delete('/chat/roomExit/:id', ChatController.deleteChatRoomExit); //채팅방 나가기
// 6. router.post('/chat/sendMessgeUpload/:id', upload.single('fileUpload'), ChatController.insertFileUpload); //파입업로드
/*
  1. 채팅방 목록 조회 | /chat/intro
*/
export async function selectListChatRoom({nextOffset = 0, prevOffset = 0}) {
  const offset = nextOffset + prevOffset;
  const response = await client.get('/chat/intro', {
    params: {offset},
    headers: {returnType: 'list'},
  });
  return response.data;
}

/*
  2. 채팅방 개설 | /chat/makeRoom
*/
export async function insertChatMakeRoom(params) {
  const config = {headers: {returnType: 'map'}};
  const response = await client.post('/chat/makeRoom ', params, config);
  return response.data;
}

/*
  3. 채팅방 입장하면서 채팅 메시지 목록 조회 | /chat/roomEntrance/:id
*/
export async function selectListChatRoomMessage(room_id) {
  const response = await client.get(
    `/chat/roomEntrance/0732236e-f0bf-478b-92d0-35fd0a0afeb7`,
    {
      headers: {returnType: 'list'},
    },
  );
  return response.data;
}

/*
  4. 채팅방 메시지 전송 | /chat/sendMessge/:id
*/
//mutateInsertChatMessage({roomId, message, participantId});
export async function insertChatMessage(params) {
  const {roomId: room_id, participantId: receiver_id, message} = params;
  const config = {headers: {returnType: 'map'}};
  const response = await client.post(
    `/chat/sendMessge/0732236e-f0bf-478b-92d0-35fd0a0afeb7`,
    {receiver_id, message},
    config,
  );
  return response.data;
}

/*
  5. 채팅방 나가기 | /chat/roomExit/:id
*/
export async function deleteChatRoomExit(params) {
  const {room_id} = params;
  await client.delete(`/chat/roomExit/${room_id}`);
  return null;
}

/*
  6. 파일업로드 메시지 전송 | /chat/sendMessgeUpload/:id
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
  7. 기존 방 있는지 유무 체크| /chat/existRoom
*/
export async function selectExistRoomCheck(params) {
  const {userId, selectedId} = params;
  const config = {headers: {returnType: 'map'}};
  const response = await client.post(
    `/chat/existRoomCheck`,
    {userId, selectedId},
    config,
  );
  return response.data;
}
