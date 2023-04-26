const chatRouter = require("express").Router();
const ChatController = require("../../controller/chat/ChatController");

chatRouter.use("/chat", (req, res, next) => {
  console.log("chat 라우터 호출!!!!");
  next();
});

/*
  1. 채팅방 목록 조회 | /chat/selectChatRoomPagingList | get
  2. 채팅 메시지 목록 조회 | /chat/selectChatRoomMessagePagingList | get
  3. 사용자 정보 조회 /chat/selectUserPagingList | get
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
  "/chat/selectUserPagingList",
  ChatController.selectUserPagingList
);

module.exports.router = chatRouter;
