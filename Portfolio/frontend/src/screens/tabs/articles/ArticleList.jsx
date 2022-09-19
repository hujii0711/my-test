import React, {useRef, useEffect, useMemo} from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  StatusBar,
  RefreshControl,
  Animated,
} from 'react-native';
import ArticleItem from './ArticleItem';
import {FAB, ActivityIndicator} from 'react-native-paper';
import {useInfiniteQuery} from 'react-query';
import {selectListArticle} from '../../../api/articles';
import Color from '../../../commons/style/Color';

const ArticleList = ({navigation}) => {
  const animation = useRef(new Animated.Value(1)).current;

  const {
    data, //data.pages: useInfiniteQuery를 이용해 호출되는 데이터들은 page별로 배열의 요소에 담기게 됩니다.
    isFetchingNextPage,
    isFetchingPreviousPage,
    fetchNextPage, //fetchNextPage는 다음 페이지의 데이터를 호출할 때 사용됩니다.
    fetchPreviousPage, //fetchPreviousPage는 이전 페이지의 데이터를 호출할 때 사용됩니다.
  } = useInfiniteQuery(
    'selectListArticle',
    ({pageParam}) => selectListArticle({...pageParam}),
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
    <SafeAreaView style={styles.block}>
      <FlatList
        data={items}
        renderItem={({item}) => (
          <ArticleItem
            navigation={navigation}
            id={item.id}
            title={item.title}
            created_at={item.created_at}
            user_name={item.user_name}
            comment_cnt={item.comment_cnt}
            lookup={item.lookup}
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
