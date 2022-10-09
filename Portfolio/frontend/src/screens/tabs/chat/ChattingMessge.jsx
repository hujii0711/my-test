import React, {useState, useCallback, useEffect, useMemo} from 'react';
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
  // 폴링 연결 후, 웹 소켓을 사용할 수 있다면 웹 소켓으로 업그레이드되는 것이다.
  // 웹 소켓을 지원하지 않는 브라우저는 폴링 방식으로, 지원하는 브라우저는 웹 소켓 방식으로 사용 가능한 것이다.
  // 처음부터 웹 소켓만 사용하고 싶으면, 클라이언트에서 연결할 때 다음처럼 transport 옵션을 추가하면 된다.

  //기존 방이 있는지 여부 체크한후 콜백으로 웹소켓 통신을 시작한다.
  //웹소켓 통신시 파라미터로 roomId를 넘겨줬으면 좋겠다.
  useEffect(() => {
    const socket = io('http://10.0.2.2:4000/chat', {
      path: '/socket.io',
      transports: ['websocket'],
      query: {
        room_id: roomId,
      },
    });

    socket.on('join', data => {
      console.log(data.message); // XXX가 입장했습니다.
    });

    //메시지 수신
    socket.on('receiveMessage', data => {
      setMessageList(
        messageList.concat(<YouView message={data.message} key={data.id} />),
      );
    });

    socket.on('exit', data => {
      console.log(data.message); // XXX가 퇴장했습니다.
    });
  }, []);

  const [message, setMessage] = useState('');
  const {id: roomId, participant_id: participantId} = useRoute().params;
  const [messageList, setMessageList] = useState([]);
  console.log('ChattingMessge >>>>>> roomId=====', roomId);
  console.log('ChattingMessge >>>>>> participantId=====', participantId);

  // 대화 내용 조회
  const selectListChatRoomMessageQuery = useQuery(
    ['selectListChatRoomMessage', roomId],
    () => selectListChatRoomMessage(roomId),
  );

  useMemo(() => {
    if (
      selectListChatRoomMessageQuery.data &&
      selectListChatRoomMessageQuery.data.length > 0
    ) {
      const data = selectListChatRoomMessageQuery.data.reduce(
        (accVal, curVal) => {
          accVal.push(<MyView message={curVal.message} key={curVal.id} />);
          return accVal;
        },
        [],
      );
      setMessageList(data);
    }
  }, [selectListChatRoomMessageQuery.data]);

  // 메시지 송신
  const onSubmitSendMessage = useCallback(() => {
    mutateInsertChatMessage({roomId, message, participantId});
  }, [mutateInsertChatMessage]);

  const {mutate: mutateInsertChatMessage} = useMutation(insertChatMessage, {
    onSuccess: chat => {
      setMessageList(
        messageList.concat(<MyView message={chat.message} key={chat.id} />),
      );
    },
  });

  // const onSubmitSendMessageUpload = useCallback(() => {
  //   const localUri = '/uploads/sss/aaaa.png';
  //   const fileName = localUri.split('/').pop();
  //   const match = /\.(\w+)$/.exec(fileName ?? '');
  //   const type = match ? `image/${match[1]}` : 'image';

  //   const formData = new FormData();
  //   formData.append('file', {
  //     name: fileName, //aaaa.png
  //     type, //image/png
  //     uri: localUri, ///uploads/sss/aaaa.png
  //   });
  //   mutateInsertChatMessageUpload({formData, roomId, message, participantId});
  // }, [mutateInsertChatMessage, message]);

  // const {mutate: mutateInsertChatMessageUpload} = useMutation(
  //   insertChatMessageUpload,
  //   {
  //     onSuccess: chat => {
  //       setMessageList(
  //         messageList.concat(
  //           <MyView message={chat.message} key={messageList.length} />,
  //         ),
  //       );
  //     },
  //   },
  // );

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
        {messageList}
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
        {/* <IconButton
          icon="cancel"
          size={36}
          onPress={onSubmitSendMessageUpload}
          style={{
            flex: 1,
          }}
        /> */}
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
        //backgroundColor: 'red',
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
          //backgroundColor: 'green',
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
          //backgroundColor: 'green',
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
