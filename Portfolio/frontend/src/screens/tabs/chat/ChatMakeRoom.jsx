import React, {useCallback, useState} from 'react';
import {Image, View} from 'react-native';
import {IconButton} from 'react-native-paper';
import {useMutation} from 'react-query';
import {insertChatMakeRoom} from '../../../api/chat';
import {useNavigation} from '@react-navigation/native';

const ChatMakeRoom = ({selectedId, setSelectedId}) => {
  const navigation = useNavigation();

  const {mutate: mutateWriteChatMakeRoom} = useMutation(insertChatMakeRoom, {
    onSuccess: chat => {
      navigation.navigate('ChattingMessge', {
        id: chat.id,
        participant_id: selectedId,
      });
    },
  });

  const onSubmitWriteChatMakeRoom = useCallback(() => {
    mutateWriteChatMakeRoom({participant_id: selectedId});
  }, [mutateWriteChatMakeRoom, selectedId]);

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
          onPress={onSubmitWriteChatMakeRoom}
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
