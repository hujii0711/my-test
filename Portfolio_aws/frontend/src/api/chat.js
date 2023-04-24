import client from './client';

/*
  1. 채팅방 목록 조회 | /chat/selectChatRoomPagingList | get
  2. 채팅방 개설 | /chat/insertChatRoomRegister | post
  3. 기존 방 있는지 유무 체크| /chat/selectIsChatRoom | post
  4. 채팅방 입장하면서 채팅 메시지 목록 조회 | /chat/selectChatRoomMessagePagingList | get
  5. 채팅방 메시지 전송 | /chat/insertSendMessge | post
  6. 채팅방 나가기 | /chat/deleteChatRoom | delete
  7. 사용자 정보 조회 /chat/selectUserPagingList | get
  
  8. 파일업로드 메시지 전송 | /chat/insertChatMessageUpload | post
*/

/********************************** 
 1. 채팅방 목록 조회 | /chat/selectChatRoomPagingList | get
**********************************/
export async function selectChatRoomPagingList({
  nextCreatedDt = '1',
  prevCreatedDt = '1',
}) {
  const createdDt = nextCreatedDt;
  const response = await client.get('/chat/selectChatRoomPagingList', {
    params: {createdDt},
  });

  return response?.data?.Items;
}

/********************************** 
 2. 채팅방 개설 | /chat/insertChatRoomRegister | post
**********************************/
export async function insertChatRoomRegister(params) {
  const {} = params;
  const response = await client.post('/chat/insertChatRoomRegister', params);
  return response?.data;
}

/********************************** 
 3. 기존 방 있는지 유무 체크| /chat/selectIsChatRoom | post
**********************************/
export async function selectIsChatRoom(userId, selectedId) {
  const response = await client.post(`/chat/selectIsChatRoom`, {
    userId,
    selectedId,
  });
  return response?.data;
}

/********************************** 
 4. 채팅방 입장하면서 채팅 메시지 목록 조회 | /chat/selectChatRoomMessagePagingList | get
**********************************/
export async function selectChatRoomMessagePagingList({
  nextCreatedDt = '1',
  prevCreatedDt = '1',
  roomId = '',
}) {
  const createdDt = nextCreatedDt;
  const response = await client.get('/chat/selectChatRoomMessagePagingList', {
    params: {createdDt, roomId},
  });
  return response?.data;
}

/********************************** 
 5. 채팅방 메시지 전송 | /chat/insertSendMessge | post
**********************************/
export async function insertSendMessge(params) {
  const {roomId, participantId: receiverId, message} = params;
  const response = await client.post('/chat/insertSendMessge', {
    roomId,
    receiverId,
    message,
  });
  return response.data;
}

/********************************** 
 6. 채팅방 나가기 | /chat/deleteChatRoom | delete
**********************************/
export async function deleteChatRoom(params) {
  const {createdDt} = params;
  const response = await client.delete('/chat/deleteChatRoom', {
    data: {createdDt},
  });
  return response?.data;
}

/********************************** 
 7. 사용자 정보 조회 /chat/selectUserPagingList | get
**********************************/
export async function selectUserPagingList() {
  const response = await client.get('/chat/selectUserPagingList');
  return response?.data;
}

/********************************** 
 8. 파일업로드 메시지 전송 | /chat/insertChatMessageUpload | post
**********************************/
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
  return response?.data;
}
