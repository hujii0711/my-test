import React, {useState, useEffect, useMemo, memo, useRef} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Avatar,
  IconButton,
  Button,
  ActivityIndicator,
  Appbar,
  Provider,
  Menu,
  Divider,
} from 'react-native-paper';
import {useRoute} from '@react-navigation/native';
import {useMutation, useInfiniteQuery, useQueryClient} from 'react-query';
import {
  View,
  Text,
  KeyboardAvoidingView,
  TextInput,
  Platform,
  StatusBar,
  SafeAreaView,
  RefreshControl,
  StyleSheet,
  FlatList,
} from 'react-native';
import Color from '../../../commons/style/Color';
import {
  selectChatRoomMessagePagingList,
  insertSendMessge,
  insertChatMessageUpload,
} from '../../../api/chat';
import {useUser} from '../../../commons/hooks/useReduxState';

const ChattingMessge = () => {
  console.log('ChattingMessge 렌더링##################');
  const isFirstRender = useRef(0);
  const currentUser = useUser();
  //const {id: roomId, participant_id: participantId} = useRoute().params;
  const roomId = 'room1234';
  const userId = 'chat01';

  const [message, setMessage] = useState('');
  const queryClient = useQueryClient();
  const [lastIndexToScroll, setLastIndexToScroll] = useState(null);
  const ws = useRef(null);
  const [serverState, setServerState] = useState('Loading...');

  useEffect(() => {
    console.log('소켓 연동!!!!!!!!!!!!!!!');

    ws.current = new WebSocket(
      'wss://1dn9e7min0.execute-api.ap-northeast-2.amazonaws.com/dev',
    );

    ws.current.onopen = event => {
      console.log('onopen >>>> event===========', event);
      /* 
        event.isTrusted 속성은 이벤트가 브라우저에 의해 발생된 것인지, 아니면 코드에서 명시적으로 발생시킨 것인지 여부를 나타냅니다.
        event.isTrusted 값이 true이면, 이벤트가 브라우저에 의해 자동으로 발생된 것이므로 신뢰성이 높습니다.
        반면에 event.isTrusted 값이 false이면, 이벤트가 코드에서 명시적으로 발생시킨 것이므로 신뢰성이 낮습니다.
      */
      setServerState('Connected');
      chatRoomJoin();
      chatRoomMessage();
    };

    ws.current.onmessage = event => {
      console.log('onmessage >>>> event===========', event);
      const message = event.data;
    };

    ws.current.onclose = event => {
      setServerState('Disconnected');

      //서버 측에서 close 이벤트를 발생, 클라이언트 측에서 onclose 이벤트가 발생, 클라이언트가 close() 메서드를 호출
      if (event.wasClean) {
        console.log('onclose >>>> wasClean >>>> event===========', event);
        //WebSocket 연결이 비정상적으로 닫혔음
      } else {
        console.log('onclose >>>> event===========', event);
      }

      if (ws.current) {
        ws.current.close();
      }
    };

    ws.current.onerror = error => {
      console.log('onerror >>>> error===========', error);
      setServerState(error.message);
    };

    return () => {
      console.log('=========== useEffect 언마운트 ===========');
      ws.current.close();
    };
  }, []);

  const chatRoomMessage = () => {
    ws.current.send(
      JSON.stringify({
        action: 'message',
        message: 'chatRoomMessage!!',
      }),
    );
  };

  const chatRoomJoin = () => {
    ws.current.send(
      JSON.stringify({
        action: 'message',
        roomId,
        userId,
      }),
    );
  };

  // const lastIndexToScrollMove = index => {
  //   //scrollToEnd | scrollToIndex
  //   lastIndexToScroll.scrollToIndex({
  //     animated: true,
  //     index: index,
  //     viewPosition: 0,
  //   });
  //   //lastIndexToScroll.scrollToEnd();
  // };

  // // 대화 내용 조회
  // // 메시지 전송시 캐시를 이용한다.
  // const {
  //   data,
  //   isFetchingNextPage,
  //   isFetchingPreviousPage,
  //   fetchNextPage,
  //   fetchPreviousPage,
  // } = useInfiniteQuery(
  //   'selectChatRoomMessagePagingList',
  //   ({pageParam}) => selectChatRoomMessagePagingList({...pageParam, roomId}),
  //   {
  //     getNextPageParam: (lastPage, allPages) => {
  //       if (lastPage.length === 20) {
  //         return {
  //           nextOffset: lastPage[lastPage.length - 1].row_num,
  //           roomId,
  //         };
  //       } else {
  //         return undefined;
  //       }
  //     },
  //     getPreviousPageParam: (firstPage, allPages) => {
  //       const validPage = allPages.find(page => page?.length > 0);
  //       if (!validPage) {
  //         return undefined;
  //       }
  //       return {
  //         prevOffset: (allPages.length - 1) * 20,
  //         roomId,
  //       };
  //     },
  //   },
  // );

  // const items = useMemo(() => {
  //   if (!data) {
  //     return null;
  //   }
  //   return [].concat(...data.pages);
  // }, [data]);

  // 메시지 송신
  const onSubmitSendMessage = () => {
    mutateInsertSendMessge({roomId, message, participantId});
  };

  const {mutate: mutateInsertSendMessge} = useMutation(insertSendMessge, {
    onSuccess: message => {
      setMessage('');
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
      <SafeAreaView style={styles.container}>
        {/* <FlatList
          data={items}
          ref={ref => {
            setLastIndexToScroll(ref);
          }}
          renderItem={({item, index}) => {
            if (!items) {
              return (
                <ActivityIndicator size="large" style={{flex: 1}} color="red" />
              );
            }

            if (isFirstRender.current === 0 && index + 1 === items.length) {
              setTimeout(() => lastIndexToScrollMove(index), 100);
              isFirstRender.current = isFirstRender.current - 1;
            }

            if (currentUser.user_id === item.sender_id) {
              return <MyView message={item.message} key={item.id} />;
            } else {
              return <YouView message={item.message} key={item.id} />;
            }
          }}
          keyExtractor={(item, index) => index.toString()}
          ListHeaderComponent={
            <View style={{backgroundColor: 'red'}}>
              <Text>1111111</Text>
            </View>
          }
          ListFooterComponent={items => (
            <View style={{backgroundColor: 'red'}}>
              <Text>2222222222</Text>
            </View>
          )}
          onEndReachedThreshold={0.5}
          onEndReached={fetchNextPage}
          refreshControl={
            <RefreshControl
              onRefresh={fetchPreviousPage}
              refreshing={isFetchingPreviousPage}
            />
          }
        /> */}
      </SafeAreaView>
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
          onSubmitEditing={onSubmitSendMessage}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  separator: {
    height: 1,
    backgroundColor: '#aaa69d',
  },
});

export default memo(ChattingMessge);
