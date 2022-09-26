import client from './client';

/*
  Chat 방 목록
*/
export async function selectListChatRoomList({cursor = 0, prevCursor = 0}) {
  const offset = cursor + prevCursor;
  const response = await client.get('/chat/intro', {
    params: {offset},
    headers: {returnType: 'list'},
  });
  return response.data;
}

/*
  채팅방 개설
*/
export async function insertChatMakeRoom(params) {
  const config = {headers: {returnType: 'map'}};
  const response = await client.post('/chat/makeRoom ', params, config);
  return response.data;
}

/*
  채팅방 입장
*/
export async function selectListChatRoomEntrance(room_id) {
  const response = await client.get(`/chat/roomEntrance/${room_id}`, {
    headers: {returnType: 'list'},
  });
  return response.data;
}

/*
  채팅방 메시지 전송
*/

export async function insertChatMessage(params) {
  const {room_id, receiver_id, message} = params;
  const config = {headers: {returnType: 'map'}};
  const response = await client.post(
    `/chat/sendMessge/${room_id}`,
    {receiver_id, message},
    config,
  );
  return response.data;
}
