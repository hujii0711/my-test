import { ChatMessages } from '../../models/chatMessages';
import { ChatRooms } from '../../models/chatRooms';

// 메인 페이지, 채팅방 목록 보여주는 페이지
// /chat/intro | GET | getChatRoomList | 채팅방 목록 페이지
export const getChatRoomList = async () => {
  console.log('ChatService >>>> getChatRoomList');
  // userInfo 세션에서 chat_room.where user_id 으로 방목록 추출
  const data = await ChatRooms.findAll({});
  return data;
};

// 채팅 생성해주는 폼 페이지 : 생성 방법이 다름
// /chat/makeRoom | GET | getChatMakeRoom | 채팅방 만들기 폼 페이지
export const getChatMakeRoom = async () => {
  console.log('ChatService >>>> getChatMakeRoom');
};

// 채팅방 생성시하고 생성한 채팅방으로 이동
// /chat/makeRoom | POST | writeChatMakeRoom | 채팅방 만들고 채팅방으로 이동
export const writeChatMakeRoom = async () => {
  // 수집 정보
  // 1. owner_id
  // 2. 참여자 정보
  console.log('ChatService >>>> writeChatMakeRoom');
};

// 방 입장
// /chat/roomEntrance/:id | GET | getChatRoomEntrance | 채팅방 입장
export const getChatRoomEntrance = async () => {
  // 수집 정보
  // 1. room_id
  // 2. 참여자 정보
  console.log('ChatService >>>> getChatRoomEntrance');
};

// 채팅 글 작성 submit
// /chat/sendMessge/:id | POST | writeChatMessage | 채팅 메시지 전송
export const writeChatMessage = async () => {
  // 수집 정보
  // 1. room_id
  // 2. 참여자 정보
  // 3. message
  console.log('ChatService >>>> writeChatMessage');
};

// 방나가기시 수행
// /chat/roomExit/:id | DELETE | deleteChatRoomExit | 채팅방 나가기
export const deleteChatRoomExit = async () => {
  // 수집 정보
  // 1. room_id
  console.log('ChatService >>>> deleteChatRoomExit');
};
