import { Request, Response, NextFunction, Router } from 'express';
import * as ChatController from '../../controller/chat/ChatController';

export const path = '';
export const router = Router();

router.use('/', (req: Request, res: Response, next: NextFunction) => {
  next();
});

router.get('/chat/intro', ChatController.getChatRoomList); //채팅방 목록 페이지
router.post('/chat/makeRoom', ChatController.writeChatMakeRoom); //채팅방 만들고 채팅방으로 이동
router.get('/chat/roomEntrance/:id', ChatController.getChatRoomEntrance); //채팅방 입장
router.post('/chat/sendMessge/:id', ChatController.writeChatMessage); //채팅 메시지 전송
router.delete('/chat/roomExit/:id', ChatController.deleteChatRoomExit); //채팅방 나가기

export default router;
