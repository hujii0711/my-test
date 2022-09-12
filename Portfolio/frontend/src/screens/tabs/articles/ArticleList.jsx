import React, {useRef, useEffect, useMemo} from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  StatusBar,
  RefreshControl,
} from 'react-native';
import ArticleItem from './ArticleItem';
import {FAB, ActivityIndicator} from 'react-native-paper';
import {useInfiniteQuery} from 'react-query';
import {getArticles} from '../../../api/articles';
import Color from '../../../commons/style/Color';

const ArticleList = ({navigation}) => {
  console.log('ArticlesScreen intro!!!');
  const dataLoadCnt = useRef(0);
  const renderCount = useRef(0);

  useEffect(() => {
    renderCount.current = renderCount.current + 1; //ref는 리렌더링을 발생시키지 않는다.
    console.log('렌더링 횟수====', renderCount.current);
  });

  const {
    data,
    isFetchingNextPage,
    isFetchingPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
  } = useInfiniteQuery(
    'articles',
    ({pageParam}) => getArticles({...pageParam}),
    {
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.length === 10) {
          return {
            cursor: dataLoadCnt.current * 10,
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
          prevCursor: validPage[0].id,
        };
      },
    },
  );

  const items = useMemo(() => {
    if (!data) {
      return null;
    }
    dataLoadCnt.current = dataLoadCnt.current + 1;
    return [].concat(...data.pages);
  }, [data]);

  if (!items) {
    return <ActivityIndicator size="large" style={{flex: 1}} color="red" />;
  }
  return (
    <SafeAreaView style={styles.block}>
      <FlatList
        data={items}
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
