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
import ChatMakeRoom from './ChatMakeRoom';
import {selectListUserInfo} from '../../../api/chat';

const ChatUserInfo = () => {
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedUserNm, setSelectedUserNm] = useState('');

  const onPressSelectUserInfo = (userId, userNm) => {
    setSelectedUserId(userId);
    setSelectedUserNm(userNm);
  };

  const {
    data,
    isFetchingNextPage,
    isFetchingPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
  } = useInfiniteQuery(
    'selectListUserInfo',
    ({pageParam}) => selectListUserInfo({...pageParam}),
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
      <>
        <FlatList
          data={items}
          style={selectedUserId ? {display: 'none'} : {display: 'flex'}}
          renderItem={({item}) => {
            const background_color =
              item.user_id === selectedUserId ? '#34ace0' : '#f7f1e3';
            const color = item.user_id === selectedUserId ? 'white' : 'black';
            return (
              <TouchableOpacity
                onPress={() =>
                  onPressSelectUserInfo(item.user_id, item.user_name)
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
                  label={item.user_name}
                />
                <Text
                  style={{
                    fontSize: 14,
                    marginLeft: 10,
                    alignSelf: 'center',
                    color: color,
                  }}>
                  {item.user_name}
                </Text>
              </TouchableOpacity>
            );
          }}
          keyExtractor={item => item.id + 1}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
        {selectedUserId && (
          <ChatMakeRoom
            selectedUserId={selectedUserId}
            selectedUserNm={selectedUserNm}
            onPressSelectUserInfo={onPressSelectUserInfo}
          />
        )}
      </>
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

export default ChatUserInfo;
