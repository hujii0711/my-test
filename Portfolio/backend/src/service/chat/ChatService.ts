import { ChatMessages } from '../../models/chatMessages';
import { ChatRooms } from '../../models/chatRooms';

export const getChatRoomList = async () => {
  console.log('ChatService >>>> getChatRoomList');
  const data = await ChatRooms.findAll({});
  return data;
};

export const getChatMakeRoom = async () => {
  console.log('ChatService >>>> getChatMakeRoom');
};

export const writeChatMakeRoom = async () => {
  console.log('ChatService >>>> writeChatMakeRoom');
};

export const getChatRoomEntrance = async () => {
  console.log('ChatService >>>> getChatRoomEntrance');
};

export const writeChatMessage = async () => {
  console.log('ChatService >>>> writeChatMessage');
};

export const deleteChatRoomExit = async () => {
  console.log('ChatService >>>> deleteChatRoomExit');
};
