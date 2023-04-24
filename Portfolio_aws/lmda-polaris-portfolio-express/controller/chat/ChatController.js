const { catchAsync } = require("../../modules/error");
const ChatService = require("../../service/auth/ChatService");
const httpStatus = require("http-status");
const com = require("../../modules/common");

/*
  1. 채팅방 목록 조회 | /chat/selectChatRoomPagingList | get
  2. 채팅방 개설 | /chat/insertChatRoomRegister | post
  3. 기존 방 있는지 유무 체크| /chat/selectIsChatRoom | post
  4. 채팅방 입장하면서 채팅 메시지 목록 조회 | /chat/selectChatRoomMessagePagingList | get
  5. 채팅방 메시지 전송 | /chat/insertSendMessge | post
  6. 채팅방 나가기 | /chat/deleteChatRoom | delete
  7. 사용자 정보 조회 /chat/selectUserPagingList | get
*/

/********************************** 
 1. 채팅방 목록 조회
**********************************/
exports.selectChatRoomPagingList = catchAsync(async (req, res) => {
  const query = req.query;
  const result = await ChatService.selectChatRoomPagingList(query);
  res.status(httpStatus.OK).json(result);
});

/********************************** 
 2. 채팅방 개설
**********************************/
exports.insertChatRoomRegister = catchAsync(async (req, res) => {
  const query = req.query;
  const result = await ChatService.insertChatRoomRegister(query);
  res.status(httpStatus.OK).json(result);
});

/********************************** 
 3. 기존 방 있는지 유무 체크
**********************************/
exports.selectIsChatRoom = catchAsync(async (req, res) => {
  const query = req.query;
  const result = await ChatService.selectIsChatRoom(query);
  res.status(httpStatus.OK).json(result);
});

/********************************** 
 4. 채팅방 입장하면서 채팅 메시지 목록 조회
**********************************/
exports.selectChatRoomMessagePagingList = catchAsync(async (req, res) => {
  const query = req.query;
  const result = await ChatService.selectChatRoomMessagePagingList(query);
  res.status(httpStatus.OK).json(result);
});

/********************************** 
 5. 채팅방 메시지 전송
**********************************/
exports.insertSendMessge = catchAsync(async (req, res) => {
  const query = req.query;
  const result = await ChatService.insertSendMessge(query);
  res.status(httpStatus.OK).json(result);
});

/********************************** 
 6. 채팅방 나가기
**********************************/
exports.deleteChatRoom = catchAsync(async (req, res) => {
  const query = req.query;
  const result = await ChatService.deleteChatRoom(query);
  res.status(httpStatus.OK).json(result);
});

/********************************** 
 7. 사용자 정보 조회
**********************************/
exports.selectUserPagingList = catchAsync(async (req, res) => {
  const query = req.query;
  const result = await ChatService.selectUserPagingList(query);
  res.status(httpStatus.OK).json(result);
});
