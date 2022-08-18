import React, {useMemo, useRef, useEffect} from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {useInfiniteQuery} from 'react-query';
import {getArticles} from '../api/articles';
import {Article} from '../api/types';
import {useSelector} from 'react-redux';
import Articles from '../components/Articles';

function ArticlesScreen() {
  console.log('ArticlesScreen intro!!!');
  const dataLoadCnt = useRef<number>(0);
  const renderCount = useRef<number>(0);

  useEffect(() => {
    renderCount.current = renderCount.current + 1; //ref는 리렌더링을 발생시키지 않는다.
    console.log('렌더링 횟수====', renderCount.current);
  });

  // useEffect(() => {
  //   console.log('한번만 렌더링!!!!');
  //   // 컴포넌트가 언마운트(사라질때)시 실행
  //   return () => {
  //     console.log('클린업 기능!!!!');
  //     dataLoadCnt.current = 0;
  //   };
  // }, []);

  const {data, isFetchingNextPage, isFetchingPreviousPage, fetchNextPage, fetchPreviousPage} =
    useInfiniteQuery('articles', ({pageParam}) => getArticles({...pageParam}), {
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
    });

  const items = useMemo(() => {
    if (!data) {
      return null;
    }
    dataLoadCnt.current = dataLoadCnt.current + 1;
    return ([] as Article[]).concat(...data.pages);
  }, [data]);

  const {users: user} = useSelector(({userReducer}) => ({
    users: userReducer.users,
  }));

  if (!items) {
    return <ActivityIndicator size="large" style={styles.spinner} color="black" />;
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
