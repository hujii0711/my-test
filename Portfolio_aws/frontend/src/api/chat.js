import client from './client';

/*
  1. 채팅방 목록 조회 | /chat/selectChatRoomPagingList | get
  2. 채팅방 입장하면서 채팅 메시지 목록 조회 | /chat/selectChatRoomMessagePagingList | get
  3. 사용자 정보 조회 /chat/selectChatUserPagingList | get
  4. 기존 방 있는지 유무 체크| /chat/selectIsChatRoom | post
  
  8. 파일업로드 메시지 전송 | /chat/insertChatMessageUpload | post
*/

/********************************** 
 1. 채팅방 목록 조회 | /chat/selectChatRoomPagingList | get
**********************************/
export const selectChatRoomPagingList = async ({
  nextCreatedDt = '1',
  prevCreatedDt = '1',
  userId = '',
}) => {
  console.log('selectChatRoomPagingList >>> userId===========', userId);
  const createdDt = nextCreatedDt;
  const response = await client.get('/chat/selectChatRoomPagingList', {
    params: {createdDt, userId},
  });
  return response?.data?.Items;
};

/********************************** 
 2. 채팅방 입장하면서 채팅 메시지 목록 조회 | /chat/selectChatRoomMessagePagingList | get
**********************************/
export const selectChatRoomMessagePagingList = async ({
  nextCreatedDt = '1',
  prevCreatedDt = '1',
  roomId = '',
}) => {
  console.log('selectChatRoomMessagePagingList >>> roomId===========', roomId);
  const createdDt = nextCreatedDt;
  const response = await client.get('/chat/selectChatRoomMessagePagingList', {
    params: {createdDt, roomId},
  });
  return response?.data?.Items;
};

/********************************** 
 3. 사용자 정보 조회 /chat/selectChatUserPagingList | get
**********************************/
export const selectChatUserPagingList = async ({
  nextCreatedDt = '1',
  prevCreatedDt = '1',
}) => {
  console.log(
    'selectChatUserPagingList >>> nextCreatedDt===========',
    nextCreatedDt,
  );
  const createdDt = nextCreatedDt;
  const response = await client.get('/chat/selectChatUserPagingList', {
    params: {createdDt},
  });
  return response?.data?.Items;
};

/********************************** 
 4. 기존 방 있는지 유무 체크| /chat/selectIsChatRoom | post
**********************************/
export const selectIsChatRoom = async (userId, selectedUserId) => {
  const response = await client.post(`/chat/selectIsChatRoom`, {
    userId,
    selectedUserId,
  });
  return response?.data?.Items;
};

/********************************** 
 8. 파일업로드 메시지 전송 | /chat/insertChatMessageUpload | post
**********************************/
export const insertChatMessageUpload = async params => {
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
};
