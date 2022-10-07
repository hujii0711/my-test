import { Router } from 'express';
import * as ChatController from '../../controller/chat/ChatController';
import { upload } from '../../modules/multer';

export const path = ''; //chat
export const router = Router();

router.get('/chat/intro', ChatController.selectListChatRoom); //채팅방 목록 페이지
router.post('/chat/makeRoom', ChatController.insertChatMakeRoom); //채팅방 만들고 채팅방으로 이동
router.get('/chat/roomEntrance/:room_id', ChatController.selectListChatRoomMessage); //채팅방 입장
router.post('/chat/sendMessge/:room_id', ChatController.insertChatMessage); //채팅 메시지 전송
router.delete('/chat/roomExit/:id', ChatController.deleteChatRoomExit); //채팅방 나가기
router.post('/chat/sendMessgeUpload/:id', upload.single('fileUpload'), ChatController.insertFileUpload); //파입업로드
router.post('/chat/existRoomCheck', ChatController.selectExistRoomCheck); //선택 유저와 기존 채팅방이 있는지 여부

export default router;
