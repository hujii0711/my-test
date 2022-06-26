import React, {useMemo} from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {useInfiniteQuery} from 'react-query';
import {getArticles} from '../api/articles';
import {Article} from '../api/types';
import Articles from '../components/Articles';
import {useUserState} from '../contexts/UserContext';

//리액트 쿼리에서 페이지네이션을 구현할 때는 useInfiniteQuery Hook을 사용합니다.
//사용 방식은 useQuery와 비슷한데요. 차이점이 있다면 함수 부분에서 pageParam을 사용하고,
//옵션 부분에서 getNextPageParam을 설정해줘야 합니다.
function ArticlesScreen() {
  const {
    data,
    isFetchingNextPage, //isFetchingNextPage: 다음 페이지를 불러오고 있는지 여부를 알려줍니다.
    fetchNextPage, //fetchNextPage: 다음 페이지를 불러오는 함수입니다.
    fetchPreviousPage,
    isFetchingPreviousPage,
  } = useInfiniteQuery(
    'articles',
    ({pageParam}) => getArticles({...pageParam}),
    {
      getNextPageParam: lastPage =>
        lastPage.length === 10
          ? {cursor: lastPage[lastPage.length - 1].id}
          : undefined,

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

  //useMemo로 감싸지 않으면 로딩 data가 변경되지 않았을 때도 다른 상태가 변할 때 불필요한 연산이 이뤄진다.
  const items = useMemo(() => {
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
