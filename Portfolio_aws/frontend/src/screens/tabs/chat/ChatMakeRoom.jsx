import React, {useCallback, useRef} from 'react';
import {Image, View} from 'react-native';
import {IconButton} from 'react-native-paper';
import {useMutation, useQuery} from 'react-query';
import {useNavigation} from '@react-navigation/native';
import {useUser} from '../../../commons/hooks/useReduxState';
import {selectIsChatRoom} from '../../../api/chat';

const ChatMakeRoom = ({
  selectedUserId,
  selectedUserNm,
  onPressSelectUserInfo,
}) => {
  console.log('ChatMakeRoom 렌더링@@@@@@@@@!!!!');
  console.log('ChatMakeRoom >>>> selectedUserId======', selectedUserId);
  console.log('ChatMakeRoom >>>> selectedUserNm======', selectedUserNm);

  const roomId = useRef('');
  const navigation = useNavigation();
  const {user_id: userId} = useUser();
  console.log('ChatMakeRoom >>>> userId======', userId);

  // 채팅 상대방에 대해 기존 방이 있는지 유무 체크
  const selectIsChatRoomQuery = useQuery(['selectIsChatRoom', userId], () =>
    selectIsChatRoom(userId, selectedUserId),
  );
  console.log(
    'ChatMakeRoom >>>> selectIsChatRoomQuery======',
    selectIsChatRoomQuery,
  );

  if (selectIsChatRoomQuery.data && selectIsChatRoomQuery.data.length > 0) {
    roomId.current = selectIsChatRoomQuery.data[0].room_id;
  }

  const onPressMoveChattingMessage = useCallback(() => {
    console.log(
      'onPressMoveChattingMessage >>>> roomId.current======',
      roomId.current,
    );
    moveChattingMessage(roomId.current);
  }, [selectedUserId]);

  const moveChattingMessage = roomId => {
    navigation.navigate('ChatSocketMessage', {
      roomId,
      selectedUserId,
    });
  };

  return (
    <View
      style={
        selectedUserId
          ? {display: 'flex', backgroundColor: 'red'}
          : {display: 'none'}
      }>
      <View style={{width: '100%', height: '85%'}}>
        <Image
          source={{
            uri: 'https://avatars3.githubusercontent.com/u/17571969?s=400&v=4',
          }}
          style={{
            width: '100%',
            height: '100%',
          }}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          height: '15%',
          backgroundColor: '#b8e994',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}>
        <IconButton
          icon="chat-plus"
          iconColor="#227093"
          size={50}
          onPress={onPressMoveChattingMessage}
        />
        <IconButton
          icon="undo"
          iconColor="#227093"
          size={50}
          onPress={() => onPressSelectUserInfo(null, null)}
        />
      </View>
    </View>
  );
};

export default ChatMakeRoom;
