import { ChatMessages } from '../../models/chatMessages';
import { ChatRooms } from '../../models/chatRooms';
import { ChatParticipants } from '../../models/chatParticipants';

// 메인 페이지, 채팅방 목록 보여주는 페이지
// /chat/intro | GET | selectListChatRoom | 채팅방 목록 페이지
export const selectListChatRoom = async (userInfo: any, params: any) => {
  const { user_id } = userInfo;
  const { offset } = params;

  const data = ChatRooms.findAll({
    //attributes: ['id', ['ChatParticipant.participant_id', 'userName']],
    include: [
      {
        model: ChatParticipants,
        required: true, // required: true --> left join | required: false --> left outer join
        where: { participant_id: user_id },
      },
    ],
    order: [['id', 'DESC']],
    limit: 10,
    offset: Number(offset),
    raw: true,
  });
  return data;
};

// 채팅방 생성시하고 생성한 채팅방으로 이동
// /chat/makeRoom | POST | insertChatMakeRoom | 채팅방 만들고 채팅방으로 이동
export const insertChatMakeRoom = async (userInfo: any, participant_id: string) => {
  const { user_id } = userInfo;

  const chatRoomInsertData = await ChatRooms.create({
    creator_id: user_id,
  });

  const participantsArr = [user_id, participant_id];

  participantsArr.forEach(async (elem) => {
    await ChatParticipants.create({
      room_id: chatRoomInsertData.id,
      participant_id: elem,
    });
  });

  return chatRoomInsertData;
};

// 방 입장
// /chat/roomEntrance/:id | GET | selectListChatRoomMessage | 채팅방 입장
export const selectListChatRoomMessage = async (userInfo: any, roomId: string) => {
  // chat_rooms와 chat_participants 조인한뒤 다시 chat_messages를 조인

  const { user_id } = userInfo;
  const data = ChatMessages.findAll({
    include: [
      {
        model: ChatRooms,
        required: true,
        where: { id: roomId },
        include: [
          {
            model: ChatParticipants,
            where: { participant_id: user_id },
          },
        ],
      },
    ],
    raw: true,
  });
  return data;
};

// 채팅 글 작성 submit
// /chat/sendMessge/:id | POST | insertChatMessage | 채팅 메시지 전송
export const insertChatMessage = async (
  userInfo: any,
  params: { room_id: string; receiver_id: string; message: string },
) => {
  const { room_id, receiver_id, message } = params;
  const data = await ChatMessages.create({
    room_id,
    receiver_id,
    message,
    sender_id: userInfo.user_id,
  });
  return data;
};

// 방나가기시 수행
// /chat/roomExit/:id | DELETE | deleteChatRoomExit | 채팅방 나가기
export const deleteChatRoomExit = async (roomId: string) => {
  console.log('ChatService >>>> deleteChatRoomExit');

  await ChatParticipants.destroy({
    where: { room_id: roomId },
  });
  await ChatMessages.destroy({
    where: { room_id: roomId },
  });
  await ChatRooms.destroy({
    where: { id: roomId },
  });

  return null;
};

// 파일업로드 수행
// /chat/sendMessgeUpload/:id | POST | insertFileUpload | 채팅방 나가기
export const insertFileUpload = async () => {
  return null;
};
