import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import ChatRoomList from './ChatRoomList';
import ChattingMessge from './ChattingMessge';
import ChatUserInfo from './ChatUserInfo';

const Tabs = createMaterialTopTabNavigator();

const ChatMain = () => {
  return (
    <Tabs.Navigator>
      {/* <Tabs.Screen name="접속한 사용자 목록" component={ChatUserInfo} /> */}
      {/* <Tabs.Screen name="채팅 개설방 목록" component={ChatRoomList} /> */}
      <Tabs.Screen name="웹소켓 통신" component={ChattingMessge} />
    </Tabs.Navigator>
  );
};

export default ChatMain;
