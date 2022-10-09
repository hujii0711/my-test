import React, {useCallback, useState, useRef, useEffect} from 'react';
import {Image, View} from 'react-native';
import {IconButton, ActivityIndicator} from 'react-native-paper';
import {useMutation, useQuery} from 'react-query';
import {insertChatMakeRoom, selectExistRoomCheck} from '../../../api/chat';
import {useNavigation} from '@react-navigation/native';
import {useUser} from '../../../commons/hooks/useReduxState';

const ChatMakeRoom = ({selectedId, setSelectedId}) => {
  const roomId = useRef('');
  const navigation = useNavigation();
  const currentUser = useUser();

  // 채팅 상대방에 대해 기존 방이 있는지 유무 체크
  const selectExistRoomCheckQuery = useQuery(
    ['selectExistRoomCheck', currentUser.user_id],
    () => selectExistRoomCheck(currentUser.user_id, selectedId),
  );

  if (
    selectExistRoomCheckQuery.data &&
    selectExistRoomCheckQuery.data.length === 0
  ) {
    roomId.current = '';
  } else if (
    selectExistRoomCheckQuery.data &&
    selectExistRoomCheckQuery.data.length > 0
  ) {
    roomId.current = selectExistRoomCheckQuery.data[0].room_id;
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
    if (roomId.current) {
      moveChattingMessage(roomId.current);
    } else {
      mutateInsertChatMakeRoom({participant_id: selectedId});
    }
  }, [selectedId]);

  const moveChattingMessage = room_id => {
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
          icon="undo"
          iconColor="#227093"
          size={50}
          onPress={() => setSelectedId(null)}
        />
      </View>
    </View>
  );
};

export default ChatMakeRoom;
