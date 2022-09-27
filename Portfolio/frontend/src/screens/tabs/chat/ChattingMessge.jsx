import React, {useState} from 'react';
import {
  Avatar,
  IconButton,
  Button,
  ActivityIndicator,
} from 'react-native-paper';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useMutation, useQuery} from 'react-query';
import {
  View,
  Text,
  KeyboardAvoidingView,
  TextInput,
  Platform,
} from 'react-native';
import io from 'socket.io-client';
import Color from '../../../commons/style/Color';
import ScreenWrapper from '../../../commons/utils/ScreenWapper';
import {
  selectListChatRoomMessage,
  insertChatMessage,
  insertChatMessageUpload,
} from '../../../api/chat';

const ChattingMessge = () => {
  // 웹소켓 통신 시작
  const socket = io('http://10.0.2.2:4000', {
    path: '/socket.io/chat',
    transports: ['websocket'],
  });

  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  const {id: roomId, participant_id: participantId} = useRoute().params;

  // 대화 내용 조회
  const selectListChatRoomMessageQuery = useQuery(
    ['selectListChatRoomMessage', roomId],
    () => selectListChatRoomMessage(roomId),
  );

  const selectListChatRoomMessageQueryData =
    selectListChatRoomMessageQuery.data;
  const initData = selectListChatRoomMessageQueryData.map((elem, index) => {
    if (elem.sender_id === currentUserId) {
      return <MyView message={elem.message} key={index} />;
    } else {
      return <YouView message={elem.message} key={index} />;
    }
  });

  // 메시지 송신
  const onSubmitSendMessage = useCallback(() => {
    mutateInsertChatMessage({roomId, message, participantId});
  }, [mutateInsertChatMessage, message]);

  const {mutate: mutateInsertChatMessage} = useMutation(insertChatMessage, {
    onSuccess: chat => {
      setMessageList(
        messageList.concat(
          <MyView message={chat.message} key={messageList.length} />,
        ),
      );
    },
  });

  //메시지 수신
  socket.on('receiveMessage', data => {
    setMessageList(
      messageList.concat(
        <YouView message={data.message} key={messageList.length} />,
      ),
    );
  });

  socket.on('join', data => {
    console.log(data.message); // XXX가 입장했습니다.
  });

  socket.on('exit', data => {
    console.log(data.message); // XXX가 퇴장했습니다.
  });

  const onSubmitSendMessageUpload = useCallback(() => {
    const localUri = '/uploads/sss/aaaa.png';
    const fileName = localUri.split('/').pop();
    const match = /\.(\w+)$/.exec(fileName ?? '');
    const type = match ? `image/${match[1]}` : 'image';

    const formData = new FormData();
    formData.append('file', {
      name: fileName, //aaaa.png
      type, //image/png
      uri: localUri, ///uploads/sss/aaaa.png
    });
    mutateInsertChatMessageUpload({formData, roomId, message, participantId});
  }, [mutateInsertChatMessage, message]);

  const {mutate: mutateInsertChatMessageUpload} = useMutation(
    insertChatMessageUpload,
    {
      onSuccess: chat => {
        setMessageList(
          messageList.concat(
            <MyView message={chat.message} key={messageList.length} />,
          ),
        );
      },
    },
  );

  // 로딩바
  if (!selectChatRoomEntranceQuery.data) {
    return <ActivityIndicator color="red" />;
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.select({ios: 'padding'})}
      style={{flex: 1}}
      keyboardVerticalOffset={80}>
      <ScreenWrapper
        style={{
          backgroundColor: Color.faint_red,
          margin: 10,
        }}>
        <Today />
        {initData}
      </ScreenWrapper>
      <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
        <TextInput
          style={{
            margin: 12,
            borderWidth: 1,
            borderColor: '#b2b2b2',
            borderRadius: 10,
            padding: 10,
            height: 40,
            flex: 5,
          }}
          onChangeText={text => setMessage(text)}
          value={message}
        />
        <IconButton
          icon="check"
          size={36}
          onPress={onSubmitSendMessage}
          style={{
            flex: 1,
          }}
        />
        <IconButton
          icon="remove"
          size={36}
          onPress={onSubmitSendMessageUpload}
          style={{
            flex: 1,
          }}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const MyView = ({message}) => {
  return (
    <View
      style={{
        marginVertical: 10,
        flexDirection: 'row-reverse',
        flexWrap: 'wrap',
        backgroundColor: 'red',
      }}>
      <Text
        style={{
          backgroundColor: 'black', //Color.black
          color: 'white', //Color.white
          padding: 10,
          borderRadius: 10,
          maxWidth: '70%',
          marginRight: 20,
        }}>
        {message}
      </Text>
      <Text
        style={{
          color: '#3a3a3a', //Color.text
          fontSize: 10,
          paddingRight: 10,
          fontSize: 11,
          alignSelf: 'flex-end',
          backgroundColor: 'green',
        }}>
        오후 09:16
      </Text>
    </View>
  );
};

const YouView = ({message}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginVertical: 10,
        backgroundColor: 'red',
      }}>
      <Avatar.Text
        size={30}
        label="너"
        style={{
          alignSelf: 'stretch',
          marginTop: 5,
          backgroundColor: 'blue', //Color.blue3
          color: 'white', //Color.white
          marginLeft: 10,
        }}
      />
      <Text
        style={{
          backgroundColor: 'white', //Color.white
          color: '#3a3a3a', //Color.text
          padding: 10,
          borderColor: '#3a3a3a', //Color.divider
          borderWidth: 1,
          borderRadius: 10,
          marginLeft: 10,
          maxWidth: '60%',
        }}>
        {message}
      </Text>
      <Text
        style={{
          color: '#3a3a3a', //Color.text
          paddingLeft: 10,
          fontSize: 11,
          alignSelf: 'flex-end',
          backgroundColor: 'green',
        }}>
        오후 09:16
      </Text>
    </View>
  );
};

const Today = () => {
  return (
    <Button
      icon="calendar-month"
      mode="text"
      onPress={() => console.log('Pressed')}
      style={{backgroundColor: Color.pink1, borderRadius: 0}}
      color={Color.white}>
      2022-09-06(수)
    </Button>
  );
};

export default ChattingMessge;
