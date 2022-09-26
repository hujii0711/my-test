import { ChatMessages } from '../../models/chatMessages';
import { ChatRooms } from '../../models/chatRooms';
import { ChatParticipants } from '../../models/chatParticipants';
// [
//   {
//       "id": "7aceed3d-2059-43cf-8676-f1ab7e86046d",
//       "creator_id": "hujii0711",
//       "title": null,
//       "max_room": 0,
//       "password": null,
//       "created_at": "2022-09-25T01:41:43.000Z",
//       "ChatParticipant.id": 5,
//       "ChatParticipant.room_id": "7aceed3d-2059-43cf-8676-f1ab7e86046d",
//       "ChatParticipant.participant_id": "hujii0711",
//       "ChatParticipant.created_at": "2022-09-25T01:41:43.000Z"
//   }
// ]
// 메인 페이지, 채팅방 목록 보여주는 페이지
// /chat/intro | GET | getChatRoomList | 채팅방 목록 페이지
export const getChatRoomList = async (userInfo: any) => {
  console.log('ChatService >>>> getChatRoomList');
  const { user_id } = userInfo;

  const data = ChatRooms.findAll({
    //attributes: ['id', ['ChatParticipant.participant_id', 'userName']],
    include: [
      {
        model: ChatParticipants,
        required: true, // required: true --> left join | required: false --> left outer join
        where: { participant_id: user_id },
      },
    ],
    raw: true,
  });
  return data;
};

// 채팅방 생성시하고 생성한 채팅방으로 이동
// /chat/makeRoom | POST | writeChatMakeRoom | 채팅방 만들고 채팅방으로 이동
export const writeChatMakeRoom = async (userInfo: any, participant_id: string) => {
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
// /chat/roomEntrance/:id | GET | getChatRoomEntrance | 채팅방 입장
export const getChatRoomEntrance = async (userInfo: any, roomId: string) => {
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
// /chat/sendMessge/:id | POST | writeChatMessage | 채팅 메시지 전송
export const writeChatMessage = async (
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
