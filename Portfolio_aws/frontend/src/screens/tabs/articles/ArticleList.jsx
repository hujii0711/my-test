import React, {useState, useMemo, useRef, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  StatusBar,
  RefreshControl,
} from 'react-native';
import ArticleListItem from './ArticleListItem';
import {FAB, ActivityIndicator} from 'react-native-paper';
import {useInfiniteQuery, useQueryClient} from 'react-query';
import {selectArticlePagingList} from '../../../api/articles';
import Color from '../../../commons/style/Color';
import FloatingButton from '../../../commons/component/FloatingButton';

const ArticleList = ({navigation}) => {
  console.log('&&&&&&&&&&&&&&&&&ArticleList 렌더링&&&&&&&&&&&&&&&&');
  const queryClient = useQueryClient();
  const [floatButtonHidden, setFloatButtonHidden] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const onScrollVisibleFloatButtom = e => {
    const {contentSize, layoutMeasurement, contentOffset} = e.nativeEvent;
    const distanceFromBottom =
      contentSize.height - layoutMeasurement.height - contentOffset.y;
    if (
      contentSize.height > layoutMeasurement.height &&
      distanceFromBottom < 72
    ) {
      setFloatButtonHidden(true);
    } else {
      setFloatButtonHidden(false);
    }
  };

  const onPressFloatButton = () => {
    navigation.navigate('ArticleWrite');
  };

  const onRefresh = () => {
    setRefreshing(true);
    const articleData = queryClient.getQueryData('selectArticlePagingList');
    const [rest] = articleData.pages;
    var refreshData = rest.filter((_, idx) => idx < 10);
    queryClient.setQueryData('selectArticlePagingList', () => {
      setRefreshing(false);
      return {
        pageParams: undefined,
        pages: [refreshData],
      };
    });
  };

  const {
    data, //data.pages: useInfiniteQuery를 이용해 호출되는 데이터들은 page별로 배열의 요소에 담기게 됩니다.
    isFetchingNextPage,
    isFetchingPreviousPage,
    fetchNextPage, //fetchNextPage는 다음 페이지의 데이터를 호출할 때 사용됩니다.
    fetchPreviousPage, //fetchPreviousPage는 이전 페이지의 데이터를 호출할 때 사용됩니다.
  } = useInfiniteQuery(
    'selectArticlePagingList',
    ({pageParam}) => selectArticlePagingList({...pageParam}),
    {
      //getNextPageParam은 다음 api를 요청할 때 사용될 pageParam값을 정할 수 있습니다.
      getNextPageParam: (lastPage, allPages) => {
        //lastPage는 useInfiniteQuery를 이용해 호출된 가장 마지막에 있는 페이지 데이터를 의미합니다.
        //allPages는 useInfiniteQuery를 이용해 호출된 모든 페이지 데이터를 의미합니다.
        if (lastPage.length === 10) {
          return {
            nextCreatedDt: lastPage[lastPage.length - 1].created_dt, // 다음 페이지를 호출할 때 사용 될 pageParam
            //{nextCreatedDt = 15, prevCreatedDt = undefined}
          };
        } else {
          return undefined; //{nextCreatedDt = undefined, prevCreatedDt = undefined}
          // return 값이 undefined일 때 getNextPageParam을 더 이상 수행하지 않음
        }
      },
      getPreviousPageParam: (firstPage, allPages) => {
        //firstPage는 useInfiniteQuery를 이용해 호출된 가장 처음에 있는 페이지 데이터를 의미합니다.
        //allPages는 useInfiniteQuery를 이용해 호출된 모든 페이지 데이터를 의미합니다.

        // find로 인해 [[{0},{1},{2}]]의 데이터가 [{0},{1},{2}]으로 변경하여 검증
        const validPage = allPages.find(page => page.length > 0); //allPages에 데이터가 있는지 확인

        if (!validPage) {
          return undefined; //{nextCreatedDt = undefined, prevCreatedDt = undefined}
        }

        return {
          prevCreatedDt:
            validPage[0].created_dt === 1 ? 0 : validPage[0].created_dt, //allPages 데이터중 첫번째 값
          //{nextCreatedDt = undefined, prevCreatedDt = 11}
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
    return (
      <ActivityIndicator size="small" style={{flex: 1}} color={Color.blue2} />
    );
  }

  return (
    <SafeAreaView style={styles.block}>
      <FlatList
        data={items}
        renderItem={({item}) => {
          return (
            <ArticleListItem
              _navigation={navigation}
              _id={item.id}
              _title={item.title}
              _createdDt={item.created_dt}
              _userName={item.user_name}
              _lookup={item.lookup}
            />
          );
        }}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListFooterComponent={items => (
          <>
            {items.length > 0 ? <View style={styles.separator} /> : null}
            {isFetchingNextPage && (
              <ActivityIndicator
                size="small"
                style={{flex: 1}}
                color={Color.blue2}
              />
            )}
          </>
        )}
        // FlatList에서 무한 스크롤은 onEndReachedThreshold와 onEndReached prop을 통해 구현 한다.
        // 스크롤이 onEndReachedThreshold에 설정한 값에 도달하면 onEndReachd 메서드가 실행된다.
        // onEndReachedThreshold 는 스크롤 목록이 보이는 가장자리 길이 기준으로 목록의 아래쪽 가장자리가
        // 콘텐츠이 끝에서부터 onEndReached 콜백을 트리거한다.
        // 이 값이 0.5인경우 목록이 보이는 길이의 절반내에 있을때 onEndReached 메서드를 실행한다.
        onEndReachedThreshold={0.5}
        onEndReached={fetchNextPage}
        onScroll={onScrollVisibleFloatButtom}
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
        }
      />
      <FloatingButton
        hidden={floatButtonHidden}
        onPressFloatButton={onPressFloatButton}
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
});

export default ArticleList;
