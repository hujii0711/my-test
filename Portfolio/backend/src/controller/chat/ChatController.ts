import { NextFunction, Request, Response } from 'express';
import * as ChatService from '../../service/chat/ChatService';
import { catchAsync } from '../../modules/error';
import httpStatus from 'http-status';

// /chat/chatRoomList | GET | selectListChatRoom | 채팅방 목록 페이지
export const selectListChatRoom = catchAsync(async (req: Request, res: Response) => {
  const userInfo = req.user;
  const query = req.query; //offset
  const result = await ChatService.selectListChatRoom(userInfo, query);
  res.json(result).status(httpStatus.OK);
});

// /chat/insert/makeRoom | POST | insertChatMakeRoom | 채팅방 만들고 채팅방으로 이동
export const insertChatMakeRoom = catchAsync(async (req: Request, res: Response) => {
  const userInfo = req.user;
  const body = req.body;
  const result = await ChatService.insertChatMakeRoom(userInfo, body);
  res.json(result).status(httpStatus.OK);
});

// /chat/chatRoomMessage/:room_id | GET | selectListChatRoomMessage | 채팅방 입장
export const selectListChatRoomMessage = catchAsync(async (req: Request, res: Response) => {
  const offset = req.query.offset as unknown as string;
  const roomId = req.params.roomId;
  const paramPack = { offset, roomId };
  const result = await ChatService.selectListChatRoomMessage(paramPack);
  res.json(result).status(httpStatus.OK);
});

// /chat/sendMessge/:room_id | POST | insertChatMessage | 채팅 메시지 전송
export const insertChatMessage = catchAsync(async (req: Request, res: Response) => {
  const userInfo = req.user;
  const paramPack = { ...req.params, ...req.body };

  const result = await ChatService.insertChatMessage(userInfo, paramPack);
  req.app.get('io').of('/chat').to(paramPack.room_id).emit('receiveMessage', result);
  res.json(result).status(httpStatus.OK);
});

// /chat/delete/roomExit/:id| DELETE | deleteChatRoomExit | 채팅방 나가기
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

// /chat/existRoomCheck | POST | selectExistRoomCheck | 선택 유저와 기존 채팅방이 있는지 여부
export const selectExistRoomCheck = catchAsync(async (req: Request, res: Response) => {
  const body = req.body;
  const result = await ChatService.selectExistRoomCheck(body);
  res.json(result).status(httpStatus.OK);
});
