import { ChatMessages } from '../../models/chatMessages';
import { ChatRooms } from '../../models/chatRooms';
import { ChatParticipants } from '../../models/chatParticipants';
import { sequelize } from '../../models';
import { QueryTypes } from 'sequelize';

// 메인 페이지, 채팅방 목록 보여주는 페이지
// /chat/chatRoomList | GET | selectListChatRoom | 채팅방 목록 페이지
export const selectListChatRoom = async (userInfo: any, query: any) => {
  const offset = Number(query.offset);

  const sql = `select B.room_id as room_id
                     ,B.participant_id as user_id
                     ,(select participant_id from chat_participants where participant_id != :user_id and room_id = B.room_id) opponent_id
                     ,(select participant_name from chat_participants where participant_id != :user_id and room_id = B.room_id) opponent_name
                     ,row_number() over(order by A.id desc) AS row_num
                from chat_rooms A left join chat_participants B
                  on A.id = B.room_id
                where B.participant_id = :user_id
                order by row_num asc
                limit :offset, 10`;
  const data = await sequelize.query(sql, {
    type: QueryTypes.SELECT,
    replacements: { user_id: userInfo.user_id, offset },
  });

  // const data = ChatRooms.findAll({
  //   //attributes: ['id', ['ChatParticipant.participant_id', 'userName']],
  //   include: [
  //     {
  //       model: ChatParticipants,
  //       required: true, // required: true --> left join | required: false --> left outer join
  //       where: { participant_id: user_id },
  //     },
  //   ],
  //   order: [['id', 'DESC']],
  //   limit: 10,
  //   offset: Number(offset),
  //   raw: true,
  // });
  return data;
};

// 채팅방 생성시하고 생성한 채팅방으로 이동
// /chat/insert/makeRoom | POST | insertChatMakeRoom | 채팅방 만들고 채팅방으로 이동
export const insertChatMakeRoom = async (userInfo: any, body: { participant_id: string; participant_name: string }) => {
  const { participant_id, participant_name } = body;

  const chatRoomInsertData = await ChatRooms.create({
    creator_id: userInfo.user_id,
  });

  const participantsArr = [
    { user_id: userInfo.user_id, user_name: userInfo.user_name },
    { user_id: participant_id, user_name: participant_name },
  ];

  participantsArr.forEach(async (elem) => {
    await ChatParticipants.create({
      room_id: chatRoomInsertData.id,
      participant_id: elem.user_id,
      participant_name: elem.user_name,
    });
  });

  return chatRoomInsertData;
};

// 방 입장
// /chat/chatRoomMessage/:room_id| GET | selectListChatRoomMessage | 채팅방 입장
export const selectListChatRoomMessage = async (paramPack: { roomId: string; offset: string }) => {
  const { roomId, offset } = paramPack;
  const SQL = `select A.* 
                  from (
                      select id
                          ,room_id
                          ,sender_id
                          ,message
                          ,receiver_id
                          ,file_name
                          ,created_at
                          ,row_number() over(order by id asc) as row_num
                      from chat_messages
                      where room_id = :roomId
                      order by row_num desc
                      limit :offset, 20
                      ) A
                order by row_num asc`;
  const data = await sequelize.query(SQL, {
    type: QueryTypes.SELECT,
    replacements: { offset: Number(offset), roomId },
  });
  return data;
};

// 채팅 글 작성 submit
// /chat/sendMessge/:room_id | POST | insertChatMessage | 채팅 메시지 전송
export const insertChatMessage = async (
  userInfo: any,
  paramPack: { roomId: string; receiverId: string; message: string },
) => {
  const { roomId, receiverId, message } = paramPack;
  const data = await ChatMessages.create({
    room_id: roomId,
    receiver_id: receiverId,
    sender_id: userInfo.user_id,
    message,
  });
  return data;
};

// 방나가기시 수행
// /chat/delete/roomExit/:id | DELETE | deleteChatRoomExit | 채팅방 나가기
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

// /chat/existRoomCheck | POST | selectExistRoomCheck | 채팅방 나가기
export const selectExistRoomCheck = async (body: { userId: string; selectedId: string }) => {
  // 선택한 유저중에 나와 같은 room_id가 있으면 기존 방이 있는 것이다.
  const { userId, selectedId } = body;

  const SQL = `select b.room_id room_id 
                from
                (select room_id, participant_id from chat_participants where participant_id =:selected_id) a left join
                (select room_id, participant_id from chat_participants where participant_id =:user_id) b
                  on a.room_id = b.room_id`;
  const data = await sequelize.query(SQL, {
    type: QueryTypes.SELECT,
    replacements: { user_id: userId, selected_id: selectedId },
  });

  return data;
};
