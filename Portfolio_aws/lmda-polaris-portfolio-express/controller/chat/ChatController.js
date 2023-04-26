const { catchAsync } = require("../../modules/error");
const ChatService = require("../../service/auth/ChatService");
const httpStatus = require("http-status");
const com = require("../../modules/common");

/*
  1. 채팅방 목록 조회 | /chat/selectChatRoomPagingList | get
  2. 채팅 메시지 목록 조회 | /chat/selectChatRoomMessagePagingList | get
  3. 사용자 정보 조회 /chat/selectUserPagingList | get
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
 2. 채팅 메시지 목록 조회
**********************************/
exports.selectChatRoomMessagePagingList = catchAsync(async (req, res) => {
  const query = req.query;
  const result = await ChatService.selectChatRoomMessagePagingList(query);
  res.status(httpStatus.OK).json(result);
});

/********************************** 
 3. 사용자 정보 조회
**********************************/
exports.selectUserPagingList = catchAsync(async (req, res) => {
  const query = req.query;
  const result = await ChatService.selectUserPagingList(query);
  res.status(httpStatus.OK).json(result);
});
