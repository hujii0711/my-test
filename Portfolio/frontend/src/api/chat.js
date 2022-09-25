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
export async function writeChatMakeRoom(params) {
  const config = {headers: {returnType: 'map'}};
  const response = await client.post('/chat/makeRoom ', params, config);
  return response.data;
}
