import React, {useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Avatar} from 'react-native-paper';
import ChatMakeRoom from './ChatMakeRoom';

// 임의의 100개 배열 만들기
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

const ChatRoomList = () => {
  const [selectedId, setSelectedId] = useState(null);

  return (
    <SafeAreaView style={styles.container}>
      <>
        <FlatList
          data={DATA}
          style={selectedId ? {display: 'none'} : {display: 'flex'}}
          renderItem={({item}) => {
            const background_color =
              item.id === selectedId ? '#34ace0' : '#f7f1e3';
            const color = item.id === selectedId ? 'white' : 'black';
            return (
              <TouchableOpacity
                onPress={() => setSelectedId(item.user_id)}
                style={{
                  flexDirection: 'row',
                  padding: 10,
                  backgroundColor: background_color,
                }}>
                <Avatar.Text
                  size={30}
                  labelStyle={{fontSize: 12, color: 'white'}}
                  style={{backgroundColor: '#ff5252'}}
                  label={item.user_id}
                />
                <Text
                  style={{
                    fontSize: 14,
                    marginLeft: 10,
                    alignSelf: 'center',
                    color: color,
                  }}>
                  {item.user_id}
                </Text>
              </TouchableOpacity>
            );
          }}
          keyExtractor={item => item.id + 1}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
        <ChatMakeRoom selectedId={selectedId} setSelectedId={setSelectedId} />
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

export default ChatRoomList;
