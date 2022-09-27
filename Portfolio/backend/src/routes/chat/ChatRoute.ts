import { Request, Response, NextFunction, Router } from 'express';
import * as ChatController from '../../controller/chat/ChatController';
import { upload } from '../../modules/multer';

export const path = '';
export const router = Router();

router.use('/', (req: Request, res: Response, next: NextFunction) => {
  next();
});

router.get('/chat/intro', ChatController.selectListChatRoom); //채팅방 목록 페이지
router.post('/chat/makeRoom', ChatController.insertChatMakeRoom); //채팅방 만들고 채팅방으로 이동
router.get('/chat/roomEntrance/:id', ChatController.selectListChatRoomMessage); //채팅방 입장
router.post('/chat/sendMessge/:id', ChatController.insertChatMessage); //채팅 메시지 전송
router.delete('/chat/roomExit/:id', ChatController.deleteChatRoomExit); //채팅방 나가기
router.post('/chat/sendMessgeUpload/:id', upload.single('fileUpload'), ChatController.insertFileUpload); //파입업로드
export default router;
