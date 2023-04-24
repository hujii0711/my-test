const chatRouter = require("express").Router();
const ChatController = require("../../controller/chat/ChatController");

chatRouter.use("/chat", (req, res, next) => {
  console.log("chat 라우터 호출!!!!");
  next();
});

/*
  1. 채팅방 목록 조회 | /chat/selectChatRoomPagingList | get
  2. 채팅방 개설 | /chat/insertChatRoomRegister | post
  3. 기존 방 있는지 유무 체크| /chat/selectIsChatRoom | post
  4. 채팅방 입장하면서 채팅 메시지 목록 조회 | /chat/selectChatRoomMessagePagingList | get
  5. 채팅방 메시지 전송 | /chat/insertSendMessge | post
  6. 채팅방 나가기 | /chat/deleteChatRoom | delete
  7. 사용자 정보 조회 /chat/selectUserPagingList | get
*/

chatRouter.get(
  "/chat/selectChatRoomPagingList",
  ChatController.selectChatRoomPagingList
);
chatRouter.post(
  "/chat/insertChatRoomRegister",
  ChatController.insertChatRoomRegister
);
chatRouter.post("/chat/selectIsChatRoom", ChatController.selectIsChatRoom);
chatRouter.get(
  "/chat/selectChatRoomMessagePagingList",
  ChatController.selectChatRoomMessagePagingList
);
chatRouter.post("/chat/insertSendMessge", ChatController.insertSendMessge);
chatRouter.delete("/chat/deleteChatRoom", ChatController.deleteChatRoom);
chatRouter.get(
  "/chat/selectUserPagingList",
  ChatController.selectUserPagingList
);

module.exports.router = chatRouter;
