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
  const {
    data,
    isFetchingNextPage,
    isFetchingPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
  } = useInfiniteQuery(
    'selectListChatRoom',
    ({pageParam}) => selectListChatRoom({...pageParam}),
    {
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage?.length === 10) {
          return {
            nextOffset: lastPage[lastPage.length - 1].id,
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
          prevOffset: validPage[0].id,
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
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={
          <View style={{flexDirection: 'row'}}>
            <TextInput
              mode="outlined"
              placeholder="댓글을 입력하세요!"
              selectionColor={Color.divider}
              activeOutlineColor={Color.pink1}
              outlineColor={Color.divider}
              style={{
                backgroundColor: Color.white,
                fontSize: 11,
                margin: 10,
                width: '80%',
                height: 30,
              }}
              value={message}
              onChangeText={text => setMessage(text)}
            />
            <IconButton
              icon="send"
              size={30}
              style={{alignSelf: 'center'}}
              onPress={() => onSubmitWriteComment(message)}
            />
          </View>
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
