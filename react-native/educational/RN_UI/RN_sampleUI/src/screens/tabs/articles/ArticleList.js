import React from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  StatusBar,
} from 'react-native';
import ArticleItem from './ArticleItem';
import {FAB} from 'react-native-paper';
import Color from '../../../commons/Color';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
    published_at: '2020-02-01',
    user_name: '김형준',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
    published_at: '2020-02-01',
    user_name: '김형준',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item1',
    published_at: '2020-02-01',
    user_name: '김형준',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d73',
    title: 'Third Item2',
    published_at: '2020-02-01',
    user_name: '김형준',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d74',
    title: 'Third Item3',
    published_at: '2020-02-01',
    user_name: '김형준',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d75',
    title: 'Third Item2',
    published_at: '2020-02-01',
    user_name: '김형준',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d76',
    title: 'Third Item3',
    published_at: '2020-02-01',
    user_name: '김형준',
  },
];

const ArticleList = ({navigation}) => {
  return (
    <SafeAreaView style={styles.block}>
      <FlatList
        data={DATA}
        renderItem={({item}) => (
          <ArticleItem
            navigation={navigation}
            id={item.id}
            title={item.title}
            published_at={item.published_at}
            user_name={item.user_name}
          />
        )}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.navigate('ArticleWrite')}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  block: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  separator: {
    height: 1,
    backgroundColor: Color.divider,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: Color.sub_main,
  },
});

export default ArticleList;
