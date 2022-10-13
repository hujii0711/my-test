import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useRef, useCallback, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ActivityIndicator, IconButton} from 'react-native-paper';
import {useMutation, useQuery, useQueryClient} from 'react-query';
import {
  selectArticle,
  deleteArticle,
  updateArticleLookup,
  selectCommentCount,
} from '../../../api/articles';
import {useUser} from '../../../commons/hooks/useReduxState';
import Color from '../../../commons/style/Color';
import {formatDaysAgo} from '../../../commons/utils/common';
import CommentEntry from './CommentEntry';
import CommentList from './CommentList';

const ArticleView = () => {
  const refRBSheet = useRef();
  const {id: articleRef} = useRoute().params;
  // 전역 상태
  const currentUser = useUser();
  console.log('ArticleView >>>>>>> articleRef======', articleRef);

  // 조회수 증가
  useEffect(() => {
    (async () => {
      await updateArticleLookup(articleRef);
    })();
  }, [articleRef]);

  // 게시판 상세
  const selectArticleQuery = useQuery(['selectArticle', articleRef], () =>
    selectArticle(articleRef),
  );

  // 게시판 댓글 수
  const selectCommentCountQuery = useQuery(
    ['selectCommentCount', articleRef],
    () => selectCommentCount(articleRef),
  );

  //selectArticleQuery OR selectCommentCountQuery 반환값이 없으면 로딩바 출력
  if (!selectArticleQuery.data || !selectCommentCountQuery.data) {
    return (
      <ActivityIndicator size="small" style={{flex: 1}} color={Color.blue2} />
    );
  }

  const {
    title,
    contents,
    created_at,
    user_id,
    user_name,
    lookup,
    liked,
    unliked,
  } = selectArticleQuery.data;

  const {comment_cnt} = selectCommentCountQuery.data;

  return (
    <>
      <ArticleViewItems
        id={articleRef}
        title={title}
        contents={contents}
        created_at={created_at}
        user_name={user_name}
        lookup={lookup}
        liked={liked}
        unliked={unliked}
        isMyArticle={currentUser.user_id === user_id}
      />
      <CommentEntry refRBSheet={refRBSheet} commentCnt={comment_cnt} />
      <CommentList refRBSheet={refRBSheet} articleRef={articleRef} />
    </>
  );
};

const ArticleViewItems = ({
  id,
  title,
  contents,
  created_at,
  user_name,
  isMyArticle,
  lookup,
  liked,
  unliked,
}) => {
  const createdAt = formatDaysAgo(created_at);
  const navigation = useNavigation();
  const queryClient = useQueryClient();

  const onPressNaviMove = () => {
    navigation.navigate('ArticleWrite', {id});
  };

  // mutate 댓글 삭제
  const {mutate: mutateDeleteArticle} = useMutation(deleteArticle, {
    onSuccess: () => {
      queryClient.setQueryData('selectListArticle', data => {
        if (!data) {
          return {pageParams: [], pages: []};
        }
        return {
          pageParams: data.pageParams,
          pages: data.pages.map(page => page.filter(a => a.id !== id)),
        };
      });
      navigation.goBack();
    },
  });

  // submit 댓글 삭제
  const onPressDeleteArticle = useCallback(() => {
    mutateDeleteArticle(id);
  }, [mutateDeleteArticle, id]);

  return (
    <View style={styles.block}>
      <Text style={styles.title}>{title}</Text>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={styles.small_text}>
          {user_name} | {createdAt} | 조회수: {lookup}
        </Text>
        {isMyArticle ? (
          <>
            <IconButton
              icon="application-edit-outline"
              size={18}
              style={{alignSelf: 'flex-end'}}
              onPress={() => onPressNaviMove()}
            />
            <IconButton
              icon="archive-remove-outline"
              size={18}
              style={{alignSelf: 'flex-end'}}
              onPress={() => onPressDeleteArticle()}
            />
          </>
        ) : (
          <>
            <IconButton
              icon="thumb-up-outline"
              size={18}
              style={{alignSelf: 'flex-end'}}
              onPress={() => {}}
            />
            <Text style={styles.small_text}>{liked}</Text>
            <IconButton
              icon="thumb-up-outline"
              size={18}
              style={{alignSelf: 'flex-end'}}
              onPress={() => {}}
            />
            <Text style={styles.small_text}>{unliked}</Text>
          </>
        )}
      </View>
      <View style={styles.separator} />
      <Text style={styles.content}>{contents}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomColor: Color.divider,
    borderBottomWidth: 1,
    marginBottom: 16,
  },
  title: {
    fontSize: 15,
    padding: 10,
    fontWeight: 'bold',
  },
  small_text: {
    fontSize: 12,
    marginTop: 10,
    padding: 10,
  },
  content: {
    padding: 10,
  },
  separator: {
    height: 1,
    backgroundColor: Color.divider,
  },
});

export default ArticleView;
