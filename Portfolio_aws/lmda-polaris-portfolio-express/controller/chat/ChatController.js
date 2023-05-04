const { catchAsync } = require("../../modules/error");
const ChatService = require("../../service/chat/ChatService");
const httpStatus = require("http-status");
const com = require("../../modules/common");

/*
  1. 채팅방 목록 조회 | /chat/selectChatRoomPagingList | get
  2. 채팅 메시지 목록 조회 | /chat/selectChatRoomMessagePagingList | get
  3. 사용자 정보 조회 | /chat/selectChatUserPagingList | get
  4. 사용자와 선택된 사용자에 대해 채팅방이 있는지 유무 체크 | /chat/selectIsChatRoom | post
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
exports.selectChatUserPagingList = catchAsync(async (req, res) => {
  const query = req.query;
  const result = await ChatService.selectChatUserPagingList(query);
  res.status(httpStatus.OK).json(result);
});

/********************************** 
 4. 사용자와 선택된 사용자에 대해 채팅방이 있는지 유무 체크
**********************************/
exports.selectIsChatRoom = catchAsync(async (req, res) => {
  const body = req.body;
  const result = await ChatService.selectIsChatRoom(body);
  res.status(httpStatus.OK).json(result);
});
