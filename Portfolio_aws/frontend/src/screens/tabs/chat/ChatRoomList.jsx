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
import {useNavigation} from '@react-navigation/native';
import {useInfiniteQuery} from 'react-query';
import {selectChatRoomPagingList} from '../../../api/chat';
import {useUser} from '../../../commons/hooks/useReduxState';

const ChatRoomList = () => {
  console.log('ChatRoomList 렌더링!!!!');
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const {user_id: userId} = useUser();
  console.log('ChatRoomList >>>> userId==========', userId);

  const navigation = useNavigation();

  const {
    data,
    isFetchingNextPage,
    isFetchingPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
  } = useInfiniteQuery(
    'selectChatRoomPagingList',
    ({pageParam}) => selectChatRoomPagingList({...pageParam, userId}),
    {
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage?.length === 10) {
          return {
            nextCreatedDt: lastPage[lastPage.length - 1].created_dt,
            userId,
          };
        } else {
          return undefined;
        }
      },
      getPreviousPageParam: (firstPage, allPages) => {
        const validPage = allPages.find(page => page.length > 0);
        if (!validPage) {
          return undefined;
        }

        return {
          prevCreatedDt:
            validPage[0].created_dt === 1 ? 0 : validPage[0].created_dt,
          userId,
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

  const moveChatSocketMessage = (roomId, receivedUserId) => {
    navigation.navigate('ChatSocketMessage', {
      roomId,
      selectedUserId: receivedUserId,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={items}
        renderItem={({item}) => {
          const background_color =
            item.id === selectedRoomId ? '#34ace0' : '#f7f1e3';
          const color = item.id === selectedRoomId ? 'white' : 'black';
          return (
            <TouchableOpacity
              onPress={() =>
                moveChatSocketMessage(item.id, item.received_user_id)
              }
              style={{
                flexDirection: 'row',
                padding: 10,
                backgroundColor: background_color,
              }}>
              <Avatar.Text
                size={30}
                labelStyle={{fontSize: 12, color: 'white'}}
                style={{backgroundColor: '#ff5252'}}
                label={item.received_user_id}
              />
              <Text
                style={{
                  fontSize: 14,
                  marginLeft: 10,
                  alignSelf: 'center',
                  color: color,
                }}>
                대화 상대방 :{item.received_user_id}
              </Text>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListHeaderComponent={
          <View style={{flexDirection: 'row', backgroundColor: 'red'}}></View>
        }
        ListFooterComponent={items => (
          <>
            {items.length > 0 ? <View style={styles.separator} /> : null}
            {isFetchingNextPage && (
              <ActivityIndicator size="small" color="blue" style={{flex: 1}} />
            )}
          </>
        )}
        onEndReachedThreshold={0.5}
        onEndReached={fetchNextPage}
        refreshControl={
          <RefreshControl
            onRefresh={fetchPreviousPage}
            refreshing={isFetchingPreviousPage}
          />
        }
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
