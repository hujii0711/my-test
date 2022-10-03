import { NextFunction, Request, Response } from 'express';
import * as ChatService from '../../service/chat/ChatService';
import { catchAsync } from '../../modules/error';
import httpStatus from 'http-status';

// console.log("req.session=========", req.session);
// console.log("req.sessionID=========", req.sessionID);
// console.log("req.cookies=========", req.cookies);
// console.log("req.params==================", req.params);
// console.log("req.query==================", req.query);
// console.log("req.body==================", req.body);
// console.log("req.headers==================", req.headers);

// /chat/intro | GET | selectListChatRoom | 채팅방 목록 페이지
export const selectListChatRoom = catchAsync(async (req: Request, res: Response) => {
  const userInfo = req.user;
  const query = req.query;
  const result = await ChatService.selectListChatRoom(userInfo, query);
  res.json(result).status(httpStatus.OK);
});

// /chat/makeRoom | POST | insertChatMakeRoom | 채팅방 만들고 채팅방으로 이동
export const insertChatMakeRoom = catchAsync(async (req: Request, res: Response) => {
  const userInfo = req.user;
  const participant_id = req.body.participant_id;
  const result = await ChatService.insertChatMakeRoom(userInfo, participant_id);
  res.json(result).status(httpStatus.OK);
});

// /chat/roomEntrance/:id | GET | selectListChatRoomMessage | 채팅방 입장
export const selectListChatRoomMessage = catchAsync(async (req: Request, res: Response) => {
  const { room_id } = req.params;

  const result = await ChatService.selectListChatRoomMessage(room_id);
  res.json(result).status(httpStatus.OK);
});

// /chat/sendMessge/:id | POST | insertChatMessage | 채팅 메시지 전송
export const insertChatMessage = catchAsync(async (req: Request, res: Response) => {
  const userInfo = req.user;
  const { room_id } = req.params;
  const { message, receiver_id } = req.body;
  const data = {
    room_id,
    message,
    receiver_id,
  };

  const result = await ChatService.insertChatMessage(userInfo, data);
  console.log('ChatController >>> insertChatMessage >>>> room_id------', room_id);
  req.app.get('io').of('/chat').to(room_id).emit('receiveMessage', result);
  res.json(result).status(httpStatus.OK);
});

// /chat/roomExit/:id | DELETE | deleteChatRoomExit | 채팅방 나가기
export const deleteChatRoomExit = catchAsync(async (req: Request, res: Response) => {
  const { roomId } = req.params;
  const result = await ChatService.deleteChatRoomExit(roomId);
  res.json(result).status(httpStatus.OK);
});

// /chat/sendMessgeUpload/:id | POST | insertFileUpload | 채팅방 나가기
export const insertFileUpload = catchAsync(async (req: Request, res: Response) => {
  //req.params.id
  //req.user.user_id
  //req.file.filename
  const result = await ChatService.insertFileUpload();
  res.json(result).status(httpStatus.OK);
});
