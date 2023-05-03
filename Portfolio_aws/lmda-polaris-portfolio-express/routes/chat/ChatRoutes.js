const chatRouter = require("express").Router();
const ChatController = require("../../controller/chat/ChatController");

chatRouter.use("/chat", (req, res, next) => {
  console.log("chat 라우터 호출!!!!");
  next();
});

/*
  1. 채팅방 목록 조회 | /chat/selectChatRoomPagingList | get
  2. 채팅 메시지 목록 조회 | /chat/selectChatRoomMessagePagingList | get
  3. 사용자 정보 조회 | /chat/selectUserPagingList | get
  4. 사용자와 선택된 사용자에 대해 채팅방이 있는지 유무 체크 | /chat/selectIsChatRoom | post
*/

chatRouter.get(
  "/chat/selectChatRoomPagingList",
  ChatController.selectChatRoomPagingList
);
chatRouter.get(
  "/chat/selectChatRoomMessagePagingList",
  ChatController.selectChatRoomMessagePagingList
);
chatRouter.get(
  "/chat/selectChatUserPagingList",
  ChatController.selectChatUserPagingList
);
chatRouter.post("/chat/selectIsChatRoom", ChatController.selectIsChatRoom);

module.exports.router = chatRouter;
