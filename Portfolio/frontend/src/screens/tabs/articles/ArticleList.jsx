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
    data,
    isFetchingNextPage,
    isFetchingPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
  } = useInfiniteQuery(
    'selectListArticle',
    ({pageParam}) => selectListArticle({...pageParam}),
    {
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage?.length === 10) {
          return {
            cursor: lastPage[lastPage.length - 1].id,
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
