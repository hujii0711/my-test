import React, {memo} from 'react';
import {View, StyleSheet, FlatList, ActivityIndicator, RefreshControl} from 'react-native';
import {Article} from '../api/types';
import ArticleItem from './ArticleItem';
import WriteButton from './WriteButton';

export interface ArticlesProps {
  articles: Article[];
  showWriteButton?: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage(): void;
  refresh(): void;
  isRefreshing: boolean;
}

function Articles({
  articles, // type []
  showWriteButton, // type boolean
  isFetchingNextPage, // type boolean
  fetchNextPage, // type function void
  refresh, // type function void
  isRefreshing, // type boolean
}: ArticlesProps) {
  // TODO: renderItem 구현 예정
  return (
    <FlatList
      data={articles}
      renderItem={({item}) => (
        <ArticleItem
          id={item.id}
          title={item.title}
          published_at={item.published_at}
          user_name={item.user_name}
        />
      )}
      keyExtractor={item => item.id.toString()}
      style={styles.list}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      ListHeaderComponent={() => (showWriteButton ? <WriteButton /> : null)}
      ListFooterComponent={() => (
        <>
          {articles.length > 0 ? <View style={styles.separator} /> : null}
          {isFetchingNextPage && (
            <ActivityIndicator size="small" color="black" style={styles.spinner} />
          )}
        </>
      )}
      onEndReachedThreshold={0.5}
      onEndReached={fetchNextPage}
      refreshControl={<RefreshControl onRefresh={refresh} refreshing={isRefreshing} />}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: '#cfd8dc',
  },
  spinner: {
    backgroundColor: 'white',
    paddingTop: 32,
    paddingBottom: 32,
  },
});

export default memo(Articles);
