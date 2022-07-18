import React, {useMemo} from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {useInfiniteQuery} from 'react-query';
import {getArticles} from '../api/articles';
import {Article} from '../api/types';
import Articles from '../components/Articles';
import {useUserState} from '../contexts/UserContext';

function ArticlesScreen() {
  const {
    data,
    isFetchingNextPage,
    fetchNextPage,

    fetchPreviousPage,
    isFetchingPreviousPage,
  } = useInfiniteQuery(
    'articles',
    ({pageParam}) => getArticles({...pageParam}),
    {
      getNextPageParam: lastPage => {
        if (lastPage.length === 10) {
          console.log(
            'getNextPageParam >>>> cursor====',
            lastPage[lastPage.length - 1].id,
          );
          return {
            cursor: lastPage[lastPage.length - 1].id,
          };
        } else {
          return undefined;
        }
      },
      getPreviousPageParam: (_, allPages) => {
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
    console.log('items!!!!!!!!!!!!!!!!!!');
    console.log('data==========', data);
    if (!data) {
      return null;
    }
    return ([] as Article[]).concat(...data.pages);
  }, [data]);

  const [user] = useUserState();

  if (!items) {
    return (
      <ActivityIndicator size="large" style={styles.spinner} color="black" />
    );
  }

  return (
    <Articles
      articles={items}
      showWriteButton={!!user}
      isFetchingNextPage={isFetchingNextPage}
      fetchNextPage={fetchNextPage}
      refresh={fetchPreviousPage}
      isRefreshing={isFetchingPreviousPage}
    />
  );
}

const styles = StyleSheet.create({
  spinner: {
    flex: 1,
  },
});

export default ArticlesScreen;
