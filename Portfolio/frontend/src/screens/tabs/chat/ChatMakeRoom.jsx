import React, {useCallback, useState} from 'react';
import {Image, View} from 'react-native';
import {IconButton, ActivityIndicator} from 'react-native-paper';
import {useMutation, useQuery} from 'react-query';
import {insertChatMakeRoom, selectExistRoomCheck} from '../../../api/chat';
import {useNavigation} from '@react-navigation/native';
import {useUser} from '../../../commons/hooks/useReduxState';

const ChatMakeRoom = ({selectedId, setSelectedId}) => {
  const [isRoom, setIsRoom] = useState(false);
  const navigation = useNavigation();
  const currentUser = useUser();

  // 채팅 상대방에 대해 기존 방이 있는지 유무 체크
  const selectExistRoomCheckQuery = useQuery(
    ['selectExistRoomCheck', userId],
    () => selectExistRoomCheck(currentUser.user_id, selectedId),
  );

  if (!selectExistRoomCheckQuery.data) {
    return <ActivityIndicator color="red" />;
  }

  // 기존방 있을 때 roomId 채번
  const {room_id} = selectExistRoomCheckQuery.data;

  if (room_id) {
    setIsRoom(true);
  }

  // 기존 방 없을 때 새로운 채팅방 생성
  const {mutate: mutateInsertChatMakeRoom} = useMutation(insertChatMakeRoom, {
    onSuccess: chat => {
      navigation.navigate('ChattingMessge', {
        id: chat.id, //chat_rooms.id (room_id에 해당)
        participant_id: selectedId,
      });
    },
  });

  const onSubmitInsertChatMakeRoom = useCallback(() => {
    if (isRoom) {
      moveChat();
    } else {
      mutateInsertChatMakeRoom({participant_id: selectedId});
    }
  }, [selectedId]);

  const moveChat = room_id => {
    navigation.navigate('ChattingMessge', {
      id: room_id,
      participant_id: selectedId,
    });
  };

  return (
    <View
      style={
        selectedId
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
          onPress={onSubmitInsertChatMakeRoom}
        />
        <IconButton
          icon="close"
          iconColor="#227093"
          size={50}
          onPress={() => setSelectedId(null)}
        />
      </View>
    </View>
  );
};

export default ChatMakeRoom;
