import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {KeyboardAvoidingView, Platform, Pressable, StyleSheet, TextInput} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/core';
import {RootStackNavigationProp, RootStackParamList} from './types';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {InfiniteData, useMutation, useQueryClient} from 'react-query';
import {writeArticle, modifyArticle} from '../api/articles';
import {Article} from '../api/types';

type WriteScreenRouteProp = RouteProp<RootStackParamList, 'Write'>;

function WriteScreen() {
  console.log('WriteScreen intro!!!');
  const {top} = useSafeAreaInsets();

  // useQueryClient Hook은 이전에 App 컴포넌트에서 QueryClientProvider에 넣었던 queryClient를 사용할 수 있게 해줍니다.
  const queryClient = useQueryClient();
  const {params} = useRoute<WriteScreenRouteProp>();

  // params.id가 존재한다면 queryClient를 통해 캐시 조회
  const cachedArticle = useMemo(
    () =>
      params.articleId
        ? queryClient.getQueryData<Article>(['article', params.articleId]) // 캐시 데이터 조회
        : null,
    [queryClient, params.articleId],
  );

  // 캐시된 데이터가 존재한다면 해당 데이터 정보를 초기값으로 사용
  const [title, setTitle] = useState(cachedArticle?.title ?? '');
  const [contents, setContents] = useState(cachedArticle?.contents ?? '');

  // 추후 게시글을 수정할 때도 useMutation을 사용할 것이기 때문에, mutate 함수를 write라는 이름으로 변경하여 구조 분해함
  const {mutate: write} = useMutation(writeArticle, {
    //const {mutate, isLoading, isError} = mutation;
    //- mutate: 요청을 시작하는 함수입니다. 이 함수의 첫 번째 인자에는 API 함수에서 사용할 인자를 넣고,
    //두 번째 인자에는 {onSuccess, onSettled, onError} 객체를 넣습니다.
    //두 번째 인자는 생략이 가능합니다. 만약 useMutation의 옵션에 이 함수들을 설정했다면 옵션에 설정한 함수가 먼저 호출되고,
    //mutate의 두 번째 파라미터에 넣은 함수들이 두 번째로 호출됩니다.
    onSuccess: article => {
      // 캐시 데이터 업데이트
      // API 재요청 없이 데이터를 업데이트(API를 새로 요청할 때는 invalidate 한다.)
      //queryClient.invalidateQueries('articles'); // articles 캐시 키를 만료시키기
      //캐시 키로 특정 데이터를 만료시키고 API를 새로 요청하는 방식으로 데이터를 갱신했습니다

      // getQueryData는 캐시 키를 사용하여 캐시 데이터를 조회하는 메서드
      //const articles = queryClient.getQueryData<Article[]>('articles') ?? [];
      // setQueryData는 캐시 데이터 업데이트하는 메서드
      //queryClient.setQueryData('articles', articles.concat(article));

      // 업데이트 함수 형태의 값을 인자로 넣는 형태를 사용하여 getQueryData를 생략
      // 게시글 작성 후 처리 로직 변경

      // 페이지네이션을 위해 useQuery 대신 useInfiniteQuery를 사용하면 기존에 작성한, 게시글을 작성한 후 반영하는 방법이 바뀐다.
      // useInfiniteQuery를 사용할 때는 setQueryData 함수의 제네릭 부분에 <InfiniteData<Article[]>>을 넣어야 한다.
      // 그리고 {pageParams, pages} 객체를 반환해야 한다.
      queryClient.setQueryData<InfiniteData<Article[]>>('articles', data => {
        //console.log('setQueryData >>>> data=====', data);
        if (!data) {
          return {
            //useInfiniteQuery의 반환값 data의 구조 분해된 객체키
            pageParams: [undefined],
            pages: [[article]],
          };
        }
        const [firstPage, ...rest] = data.pages; // 첫번째 페이지와 나머지 페이지를 구분
        return {
          ...data,
          // 첫번째 페이지에 article을 맨 앞에 추가, 그리고 그 뒤에 나머지 페이지
          pages: [[article, ...firstPage], ...rest],
        };
      });
      // 게시글 작성에 성공하면 게시글 작성 화면을 닫는다.
      navigation.goBack();
    },
  });

  const {mutate: modify} = useMutation(modifyArticle, {
    onSuccess: article => {
      // 게시글 목록 수정
      // setQueryData: 새로운 요청없이 queryClient의 기존 데이터를 갱신
      queryClient.setQueryData<InfiniteData<Article[]>>('articles', data => {
        // data의 타입이 undefined가 아님을 명시하기 위하여 추가한 코드
        // modify의 경우엔 data가 무조건 유효하기 때문에 실제로 실행될 일 없음
        if (!data) {
          return {pageParams: [], pages: []};
        }

        return {
          pageParams: data!.pageParams,
          pages: data!.pages.map(page =>
            page.find(a => a.id === params.articleId) // 우리가 수정할 항목이 있는 페이지를 찾고
              ? page.map(a => (a.id === params.articleId ? article : a)) // 해당 페이지에서 id가 일치하는 항목을 교체
              : page,
          ),
        };
      });
      // 게시글 수정
      queryClient.setQueryData(['article', params.articleId], article);
      navigation.goBack();
    },
  });

  const navigation = useNavigation<RootStackNavigationProp>();
  const onSubmit = useCallback(() => {
    if (params.articleId) {
      modify({id: params.articleId, title, contents}); //title, contents 사용자가 입력한 state값
    } else {
      write({title, contents});
    }
  }, [write, modify, title, contents, params.articleId]);

  useEffect(() => {
    navigation.setOptions({
      headerRightContainerStyle: styles.headerRightContainer,
      headerRight: () => (
        <Pressable
          hitSlop={8}
          onPress={onSubmit}
          style={({pressed}) => pressed && styles.headerRightPressed}>
          <MaterialIcons name="send" color="#2196f3" size={24} />
        </Pressable>
      ),
    });
  }, [onSubmit, navigation]);

  return (
    <SafeAreaView style={styles.block} edges={['bottom']}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoiding}
        behavior={Platform.select({ios: 'padding'})}
        keyboardVerticalOffset={Platform.select({ios: top + 60})}>
        <TextInput placeholder="제목" style={styles.input} value={title} onChangeText={setTitle} />
        <TextInput
          placeholder="내용"
          style={[styles.input, styles.contents]}
          multiline
          textAlignVertical="top"
          value={contents}
          onChangeText={setContents}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 16,
    flexDirection: 'column',
  },
  keyboardAvoiding: {
    flex: 1,
  },
  input: {
    backgroundColor: 'white',
    fontSize: 14,
    lineHeight: 18,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 4,
  },
  contents: {
    paddingTop: 12,
    paddingBottom: 12,
    marginTop: 16,
    flex: 1,
  },
  headerRightContainer: {
    marginRight: 16,
  },
  headerRightPressed: {
    opacity: 0.75,
  },
});

export default WriteScreen;
