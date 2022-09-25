import React, {useState, useMemo} from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Avatar, ActivityIndicator} from 'react-native-paper';
import {useInfiniteQuery} from 'react-query';
import {selectListChatRoomList} from '../../../api/chat';

// 임의의 100개 배열 만들기
// const uuidv4 = () => {
//   return 'xy'.replace(/[xy]/g, function (c) {
//     var r = (Math.random() * 16) | 0,
//       v = c == 'x' ? r : (r & 0x3) | 0x8;
//     return v.toString(16);
//   });
// };
// const DATA = Array(100)
//   .fill()
//   .map((elem, idx) => (elem = {user_name: uuidv4(), id: idx}));

const ChatRoomList = () => {
  const [selectedId, setSelectedId] = useState(null);
  const {
    data, //data.pages: useInfiniteQuery를 이용해 호출되는 데이터들은 page별로 배열의 요소에 담기게 됩니다.
    isFetchingNextPage,
    isFetchingPreviousPage,
    fetchNextPage, //fetchNextPage는 다음 페이지의 데이터를 호출할 때 사용됩니다.
    fetchPreviousPage, //fetchPreviousPage는 이전 페이지의 데이터를 호출할 때 사용됩니다.
  } = useInfiniteQuery(
    'selectListChatRoomList',
    ({pageParam}) => selectListChatRoomList({...pageParam}),
    {
      //getNextPageParam은 다음 api를 요청할 때 사용될 pageParam값을 정할 수 있습니다.
      getNextPageParam: (lastPage, allPages) => {
        //lastPage는 useInfiniteQuery를 이용해 호출된 가장 마지막에 있는 페이지 데이터를 의미합니다.
        //allPages는 useInfiniteQuery를 이용해 호출된 모든 페이지 데이터를 의미합니다.
        if (lastPage?.length === 10) {
          return {
            cursor: lastPage[lastPage.length - 1].id, // 다음 페이지를 호출할 때 사용 될 pageParam
          };
        } else {
          return undefined;
        }
      },
      //getPreviousPageParam은 이전 api를 요청할 때 사용될 pageParam값을 정할 수 있습니다.
      getPreviousPageParam: (firstPage, allPages) => {
        //firstPage는 useInfiniteQuery를 이용해 호출된 가장 처음에 있는 페이지 데이터를 의미합니다.
        //allPages는 useInfiniteQuery를 이용해 호출된 모든 페이지 데이터를 의미합니다.

        const validPage = allPages.find(page => page.length > 0);
        if (!validPage) {
          return undefined;
        }

        return {
          prevCursor: validPage[0].id,
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

  if (!items) {
    return <ActivityIndicator size="large" style={{flex: 1}} color="red" />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={items}
        renderItem={({item}) => {
          const background_color =
            item.id === selectedId ? '#34ace0' : '#f7f1e3';
          const color = item.id === selectedId ? 'white' : 'black';
          return (
            <TouchableOpacity
              onPress={() => setSelectedId(item.id)}
              style={{
                flexDirection: 'row',
                padding: 10,
                backgroundColor: background_color,
              }}>
              <Avatar.Text
                size={30}
                labelStyle={{fontSize: 12, color: 'white'}}
                style={{backgroundColor: '#ff5252'}}
                label={item['ChatParticipant.participant_id']}
              />
              <Text
                style={{
                  fontSize: 14,
                  marginLeft: 10,
                  alignSelf: 'center',
                  color: color,
                }}>
                {' '}
                index : {item.id} | user_name :{' '}
                {item['ChatParticipant.participant_id']}
              </Text>
            </TouchableOpacity>
          );
        }}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </SafeAreaView>
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

export default ChatRoomList;
