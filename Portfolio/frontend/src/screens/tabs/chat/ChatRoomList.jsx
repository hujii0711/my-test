import React, {useState, useMemo} from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  RefreshControl,
} from 'react-native';
import {Avatar, ActivityIndicator} from 'react-native-paper';
import {useInfiniteQuery} from 'react-query';
import {selectListChatRoom} from '../../../api/chat';

const ChatRoomList = () => {
  const [selectedId, setSelectedId] = useState(null);
  // const {
  //   data,
  //   isFetchingNextPage,
  //   isFetchingPreviousPage,
  //   fetchNextPage,
  //   fetchPreviousPage,
  // } = useInfiniteQuery(
  //   'selectListChatRoom',
  //   ({pageParam}) => selectListChatRoom({...pageParam}),
  //   {
  //     getNextPageParam: (lastPage, allPages) => {
  //       if (lastPage?.length === 10) {
  //         return {
  //           nextOffset: lastPage[lastPage.length - 1].id,
  //         };
  //       } else {
  //         return undefined;
  //       }
  //     },
  //     getPreviousPageParam: (firstPage, allPages) => {
  //       const validPage = allPages.find(page => page.length > 0);
  //       if (!validPage) {
  //         return undefined;
  //       }
  //       return {
  //         prevOffset: validPage[0].id,
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

  // if (!items) {
  //   return <ActivityIndicator size="large" style={{flex: 1}} color="red" />;
  // }
  //dc35ca80-cc36-4926-a5f1-ca8c4cbd696f
  //xxyyxxyy-ccyy-yyyy-xyxy-xxyxyxxxyyyx
  const uuidv4 = () => {
    return 'xyxyxyxy'.replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };
  const DATA = Array(100)
    .fill()
    .map((elem, idx) => (elem = {user_id: uuidv4(), id: idx}));
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
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
                user_id :{item.user_id}
                {item['ChatParticipant.participant_id']}
              </Text>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={
          <View style={{flexDirection: 'row', backgroundColor: 'red'}}></View>
        }
        // ListFooterComponent={items => (
        //   <>
        //     {items.length > 0 ? <View style={styles.separator} /> : null}
        //     {isFetchingNextPage && (
        //       <ActivityIndicator size="small" color="blue" style={{flex: 1}} />
        //     )}
        //   </>
        // )}
        // onEndReachedThreshold={0.5}
        // onEndReached={fetchNextPage}
        // refreshControl={
        //   <RefreshControl
        //     onRefresh={fetchPreviousPage}
        //     refreshing={isFetchingPreviousPage}
        //   />
        // }
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
