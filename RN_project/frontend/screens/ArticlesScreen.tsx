import React, {useMemo} from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {useInfiniteQuery} from 'react-query';
import {getArticles} from '../api/articles';
import {Article} from '../api/types';
import {useSelector} from 'react-redux';
import {User} from '../api/types';
import Articles from '../components/Articles';

//리액트 쿼리에서 페이지네이션을 구현할 때는 useInfiniteQuery Hook을 사용합니다.
//사용 방식은 useQuery와 비슷한데요. 차이점이 있다면 함수 부분에서 pageParam을 사용하고,
//옵션 부분에서 getNextPageParam을 설정해줘야 합니다.
//isFetchingNextPage, isFetchingPreviousPage, fetchNextPage, fetchPreviousPage 모두 <FlatList> 컴포넌트와 연관 있음
function ArticlesScreen() {
  const {
    data, // {pageParams: 각 페이지에서 사용된 파라미터 배열, pages: 각 페이지들을 배열 타입으로 나타냄 } 타입을 가지고 있다.
    isFetchingNextPage, // 다음 페이지를 불러오고 있는지 여부를 알려줌
    isFetchingPreviousPage, //이전 페이지를 불러오고 있는지 여부를 알려줌
    fetchNextPage, //다음 페이지를 불러오는 함수입니다.
    fetchPreviousPage,
    //hasNextPage //다음 페이지의 존재 유무를 알려준다. 만약 getNextPageParam에서 undefined를 반환했다면 이 값을 false가 된다.
    //pageParam : {limit = 10, cursor, prevCursor}
  } = useInfiniteQuery('articles', ({pageParam}) => getArticles({...pageParam}), {
    //lastPage: 가장 마지막으로 불러온 페이지를 가리킨다. Article[] 타입
    //allPages: 지금까지 불러온 모든 페이지를 가리킨다. Article[][] 타입
    getNextPageParam: lastPage => {
      if (lastPage.length === 10) {
        //console.log('getNextPageParam >>>> cursor====', lastPage[lastPage.length - 1].id);
        return {
          cursor: lastPage[lastPage.length - 1].id,
          // 마지막으로 불러온 항목을 cursor 파라미터로 사용
          // 가장 마지막으로 불러온 lastPage의 마지막 원소의 id값을 반환
        };
      } else {
        return undefined; //// 더 이상 조회할 수 있는 데이터가 없을 때는 undefined를 반환
      }
    },
    // 따라서 이 코드에서 마지막으로 불러온 페이지에 항목이 10개 있으면 다음 페이지가 존재할 수 있으니
    // 마지막 항목의 id를 반환하고, 10개 미만이면 다음 페이지가 존재하지 않으니 undefined를 반환한다.
    // lastPage===== [{"body": "test2", "created_at": "2022-06-26T03:29:28.480Z", "id": 2, "published_at": "2022-06-26T03:29:28.470Z", "title": "test1", "updated_at": "2022-06-26T03:29:28.492Z", "user": {"blocked": null, "confirmed": true, "created_at": "2022-06-26T03:29:10.824Z", "email": "hujii0711@gmail.com", "id": 2, "provider": "local", "role": 1, "updated_at": "2022-06-26T03:29:10.831Z", "username": "fujii0711"}}]
    // allPages===== [[{"body": "test2", "created_at": "2022-06-26T03:29:28.480Z", "id": 2, "published_at": "2022-06-26T03:29:28.470Z", "title": "test1", "updated_at": "2022-06-26T03:29:28.492Z", "user": [Object]}]]

    // 페이지 내비게이션은 반대 방향으로도 할 수 있기 때문에 getPreviousPageParam를 이용하여 구현
    getPreviousPageParam: (_, allPages) => {
      const validPage = allPages.find(page => page.length > 0);
      if (!validPage) {
        return undefined;
      }

      return {
        prevCursor: validPage[0].id,
      };
    },
  });

  //useMemo로 감싸지 않으면 로딩 data가 변경되지 않았을 때도 다른 상태가 변할 때 불필요한 연산이 이뤄진다.
  const items = useMemo(() => {
    //console.log('items!!!!!!!!!!!!!!!!!!');

    if (!data) {
      //data는 useInfiniteQuery의 반환값
      //{"pageParams": [undefined], "pages": [[[Object]]]}
      // pageParams : 각 페이지에서 사용된 파라미터 배열을 나타낸다.
      // pages : 각 페이지들을 배열 타입으로 나타낸다.(현재 pages는 Article[][] 타입이다.)
      return null;
    }
    //console.log('data.pageParams==========', data.pageParams);
    //console.log('data.pages==========', data.pages);
    //as Article[]: Articles 컴포넌트는 props의 타입이 Article[]이기 때문에 Article[][]로 이뤄져 있는 data.pages를 Article[]로 명시해줘야 한다.
    return ([] as Article[]).concat(...data.pages);
  }, [data]);

  const user = useSelector((state: {users: User}) => state.users);
  //console.log('data====', data);
  //console.log('items====', items);
  //console.log('user====', user);
  if (!items) {
    return <ActivityIndicator size="large" style={styles.spinner} color="black" />;
  }

  return (
    <Articles
      articles={items}
      showWriteButton={!!user} // 값이 있으면 true로 없으면 false로
      isFetchingNextPage={isFetchingNextPage}
      fetchNextPage={fetchNextPage}
      // refresh Props: 게시글을 작성하고 나서 항목을 갱신하는 것이 아니라 사용자가 인터렉션을 통하여 직접 새로고침하는 기능을 제공하는 것이 refresh이다.
      refresh={fetchPreviousPage}
      // isRefreshing Props: isRefreshing의 조건은 요청이 진행 중인데, 다음 페이지에 대한 요청은 진행 중이지 않을 때이다.
      // 만약, !isFetchingNextPage 조건을 확인하지 않으면 다음 페이지를 불러오고 있을 때도 상단에 로딩 표시가 나타난다.
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
