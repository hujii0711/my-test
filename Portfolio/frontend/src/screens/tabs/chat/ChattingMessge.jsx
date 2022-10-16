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
import io from 'socket.io-client';
import Color from '../../../commons/style/Color';
import {
  selectListChatRoomMessage,
  insertChatMessage,
  insertChatMessageUpload,
} from '../../../api/chat';
import {useUser} from '../../../commons/hooks/useReduxState';

const ChattingMessge = () => {
  console.log('ChattingMessge 렌더링##################');
  const currentUser = useUser();
  const {id: roomId, participant_id: participantId} = useRoute().params;
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  //const queryClient = useQueryClient();
  // 웹소켓 통신 시작
  // 폴링 연결 후, 웹 소켓을 사용할 수 있다면 웹 소켓으로 업그레이드되는 것이다.
  // 웹 소켓을 지원하지 않는 브라우저는 폴링 방식으로, 지원하는 브라우저는 웹 소켓 방식으로 사용 가능한 것이다.
  // 처음부터 웹 소켓만 사용하고 싶으면, 클라이언트에서 연결할 때 다음처럼 transport 옵션을 추가하면 된다.

  //기존 방이 있는지 여부 체크한후 콜백으로 웹소켓 통신을 시작한다.
  //웹소켓 통신시 파라미터로 roomId를 넘겨줬으면 좋겠다.
  useEffect(() => {
    console.log('소켓 연동!!!!!!!!!!!!!!!');
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
    socket.on('receiveMessage', resp => {
      console.log('receiveMessage >>> resp=====', resp);
      setMessageList(
        messageList.concat(
          resp?.sender_id === currentUser.user_id ? (
            <MyView message={resp.message} key={resp.id} />
          ) : (
            <YouView message={resp.message} key={resp.id} />
          ),
        ),
      );
      // resp==== {"created_at": "2022-10-16T09:07:47.183Z", "id": 38, "message": "asdasdad", "receiver_id": "20555f6b-6134-4190-a873-2b645dc1b0be", "room_id": "177308a6-1242-4733-8526-d6cfab6c347f", "sender_id": "2bc11da5-b1e4-48b9-af2d-605f4bda9af3"}
      // queryClient.setQueryData('selectListChatRoomMessage', chat => {
      //   if (!chat) {
      //     return {pageParams: [], pages: []};
      //   }
      //   console.log('resp====', resp);
      //   //return {
      //   //pageParams: chat.pageParams,
      //   const pages = chat.pages.map(page =>
      //     page.find(a => a.id === resp.id)
      //       ? page.map(a => (a.id === resp.id ? resp : a))
      //       : page,
      //   );
      //   console.log('pages====', pages);
      //   //};
      // });

      //lastIndexToScrollMove(data.id);
    });

    socket.on('exit', data => {
      console.log(data.message); // XXX가 퇴장했습니다.
    });
    //isFirstRender.current = isFirstRender.current + 1;
  }, []);

  //const [lastIndexToScroll, setLastIndexToScroll] = useState(null);
  //const isFirstRender = useRef(0);

  // const lastIndexToScrollMove = index => {
  //   lastIndexToScroll.scrollToIndex({
  //     animated: true,
  //     index: index,
  //     viewPosition: 0,
  //   });
  // };

  // 대화 내용 조회
  const {
    data,
    isFetchingNextPage,
    isFetchingPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
  } = useInfiniteQuery(
    'selectListChatRoomMessage',
    ({pageParam}) => selectListChatRoomMessage({...pageParam, roomId}),
    {
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.length === 20) {
          return {
            nextOffset: lastPage[lastPage.length - 1].row_num,
            roomId,
          };
        } else {
          return undefined;
        }
      },
      getPreviousPageParam: (firstPage, allPages) => {
        const validPage = allPages.find(page => page?.length > 0);
        if (!validPage) {
          return undefined;
        }
        return {
          prevOffset: validPage[0].row_num === 1 ? 0 : validPage[0].row_num,
          roomId,
        };
      },
    },
  );

  const items = useMemo(() => {
    if (!data) {
      return null;
    }
    return [].concat(...data.pages);
  }, [data]);

  // 메시지 송신
  const onSubmitSendMessage = () => {
    mutateInsertChatMessage({roomId, message, participantId});
  };

  const {mutate: mutateInsertChatMessage} = useMutation(insertChatMessage, {
    onSuccess: message => {
      console.log('message======', message);
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
        <FlatList
          data={items}
          // ref={ref => {
          //   setLastIndexToScroll(ref);
          // }}
          renderItem={({item, index}) => {
            if (!items) {
              return (
                <ActivityIndicator size="large" style={{flex: 1}} color="red" />
              );
            }

            //if (isFirstRender.current === 1 && index + 1 === items.length) {
            //  isFirstRender.current = isFirstRender.current - 1;
            //  setTimeout(() => lastIndexToScrollMove(index), 500);
            //}
            return <MyView message={item.message} key={item.id} />;
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
          // refreshControl={
          //   <RefreshControl
          //     onRefresh={fetchPreviousPage}
          //     refreshing={isFetchingPreviousPage}
          //   />
          // }
        />
        {messageList}
      </SafeAreaView>
      {/* <ScreenWrapper
        style={{
          backgroundColor: Color.faint_red,
          margin: 10,
        }}>
        <Today />
        {messageList}
      </ScreenWrapper> */}

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
