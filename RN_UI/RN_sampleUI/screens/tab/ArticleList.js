import React from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  Pressable,
} from 'react-native';

const json = [
  {
    id: '1',
    title: 'title1',
    published_at: '2020-01-01',
    user_name: 'kim',
  },
  {
    id: '2',
    title: 'title2',
    published_at: '2020-01-01',
    user_name: 'kim',
  },
  {
    id: '3',
    title: 'title3',
    published_at: '2020-01-01',
    user_name: 'kim',
  },
  {
    id: '4',
    title: 'title4',
    published_at: '2020-01-01',
    user_name: 'kim',
  },
];

function ArticleItem({id, title, published_at, user_name}) {
  return (
    <Pressable style={({pressed}) => [styles.block, pressed && styles.pressed]}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.footer}>
        <Text style={styles.smallText}>{`id: ${id}`}</Text>
        <Text style={styles.smallText}>{user_name}</Text>
        <Text style={styles.smallText}>{published_at}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  block: {
    paddingVertical: 16,
    paddingHorizontal: 12,
    backgroundColor: '#4aa4f2',
    marginTop: 5,
  },
  pressed: {
    backgroundColor: '#b0f24a',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 10,
  },
  smallText: {
    fontSize: 14,
    color: '#546e7a',
  },
  list: {
    flex: 1,
    backgroundColor: '#e0e2e5',
  },
  separator: {
    width: '100%',
    height: 2,
    backgroundColor: '#444445',
  },
});

const App = () => {
  /*
[id]: 고유 값은 문자열 타입이어야 하므로 고유 값이 숫자라면 .toString()을 호출해 문자열로 변환해야
[data]: data Props를 설정하면 renderItem이라는 함수를 통해 배열 안의 각 원소들 데이터를 가리키는 뷰를 보여줄 수 있습니다.
[renderItem]: 배열 안의 각 원소들 데이터를 가리키는 뷰를 보여줄 수 있습니다.
[ItemSeparatorComponent]: 컴포넌트 사이에 구분선을 설정할 수 있습니다.
[keyExtractor]: keyExtractor Props는 각 항목의 고유 값을 추출해주는 함수
 */
  return (
    <SafeAreaView style={{marginTop: 0}}>
      <View style={{paddingHorizontal: 10}}>
        <FlatList
          data={json}
          renderItem={({item}) => (
            <ArticleItem
              id={item.id}
              title={item.title}
              published_at={item.published_at}
              user_name={item.user_name}
            />
          )}
          keyExtractor={item => item.id.toString()}
          //style={styles.list}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </View>
    </SafeAreaView>
  );
};

export default App;
