import { NextFunction, Request, Response } from 'express';
import * as ChatService from '../../service/chat/ChatService';
import { catchAsync } from '../../modules/error';
import httpStatus from 'http-status';

// /chat/intro | GET | getChatRoomList | 채팅방 목록 페이지
export const getChatRoomList = catchAsync(async (req: Request, res: Response) => {
  const result = await ChatService.getChatRoomList();
  res.json(result).status(httpStatus.OK);
});

// /chat/makeRoom | GET | getChatMakeRoom | 채팅방 만들기 폼 페이지
export const getChatMakeRoom = catchAsync(async (req: Request, res: Response) => {
  const body = await ChatService.getChatMakeRoom();
  res.json(body).status(httpStatus.OK);
});

// /chat/makeRoom | POST | writeChatMakeRoom | 채팅방 만들고 채팅방으로 이동
export const writeChatMakeRoom = catchAsync(async (req: Request, res: Response) => {
  const body = await ChatService.writeChatMakeRoom();
  res.json(body).status(httpStatus.OK);
});

// /chat/roomEntrance/:id | GET | getChatRoomEntrance | 채팅방 입장
export const getChatRoomEntrance = catchAsync(async (req: Request, res: Response) => {
  const result = await ChatService.getChatRoomEntrance();
  res.json(result).status(httpStatus.OK);
});

// /chat/sendMessge/:id | POST | writeChatMessage | 채팅 메시지 전송
export const writeChatMessage = catchAsync(async (req: Request, res: Response) => {
  const result = await ChatService.writeChatMessage();
  res.json(result).status(httpStatus.OK);
});

// /chat/roomExit/:id | DELETE | deleteChatRoomExit | 채팅방 나가기
export const deleteChatRoomExit = catchAsync(async (req: Request, res: Response) => {
  const result = await ChatService.deleteChatRoomExit();
  res.json(result).status(httpStatus.OK);
});
