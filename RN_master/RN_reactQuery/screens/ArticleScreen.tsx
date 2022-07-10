import React, {useState} from 'react';
import {StyleSheet, ActivityIndicator, FlatList} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/core';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useMutation, useQuery, useQueryClient} from 'react-query';
import {RootStackParamList} from './types';
import {getArticle} from '../api/articles';
import {deleteComment, getComments, modifyComment} from '../api/comments';
import {Comment} from '../api/types';
import {useUserState} from '../contexts/UserContext';

import ArticleView from '../components/ArticleView';
import CommentItem from '../components/CommentItem';
import CommentInput from '../components/CommentInput';
import AskDialog from '../components/AskDialog';
import CommentModal from '../components/CommentModal';

// type ArticleScreenRouteProp = Readonly<{
//   key: string;
//   name: "Article";
//   path?: string | undefined;
// }> & Readonly<{
//   params: Readonly<{
//       id: number;
//   }>;
// }>

// type RootStackParamList = {
//   MainTab: MainTabNavigationScreenParams;
//   Article: {
//       id: number;
//   };
//   Register: undefined;
//   Login: undefined;
//   MyArticles: undefined;
//   Write: {
//       articleId?: number;
//   };
// }

type ArticleScreenRouteProp = RouteProp<RootStackParamList, 'Article'>;

function ArticleScreen() {
  const {params} = useRoute<ArticleScreenRouteProp>();
  const {id} = params;

  const articleQuery = useQuery(['article', id], () => getArticle(id));
  const commentsQuery = useQuery(['comments', id], () => getComments(id));

  const {bottom} = useSafeAreaInsets();
  const [currentUser] = useUserState();

  const {mutate: modify} = useMutation(modifyComment, {
    onSuccess: comment => {
      // 캐시 데이터 조회
      //const articles = queryClient.getQueryData<Article[]>('articles') ?? [];
      // 캐시 데이터 업데이트
      //queryClient.setQueryData('articles', articles.concat(article));

      //setQueryData는 캐시 데이터를 업데이트하는 메서드입니다. setQueryData를 사용할 때는 위와 같이 데이터를 두 번째 인자로 넣어도 되고, //업데이터 함수 형태의 값을 인자로 넣을 수도 있습니다. 만약 업데이터 함수 형태를 인자로 넣는다면 getQueryData를 생략할 수 있습니다.
      //데이터 캐시 업데이트(queryClient이 뒤부분에 선언되어 있으나 오류가 안나는 이유??)
      //const comment_ = queryClient.getQueryData<Comment[]>(['comments', id]) ?? [];
      queryClient.setQueryData<Comment[]>(['comments', id], comments =>
        comments
          ? comments.map(c => (c.id === selectedCommentId ? comment : c))
          : [],
      );

      // 방금 데이터 캐시한 값 조회
      //const tmpCache = queryClient.getQueryData<Comment[]>(['comments', id]) ?? [];
      //console.log('tmpCache [3]====', tmpCache);
    },
  });

  const [selectedCommentId, setSelectedCommentId] =
    useState<number | null>(null);
  const [askRemoveComment, setAskRemoveComment] = useState(false);
  const [modifying, setModifying] = useState(false);

  const queryClient = useQueryClient();

  const {mutate: remove} = useMutation(deleteComment, {
    onSuccess: () => {
      queryClient.setQueryData<Comment[]>(['comments', id], comments =>
        comments ? comments.filter(c => c.id !== selectedCommentId) : [],
      );
    },
  });

  /**********************************
   * 댓글 삭제 : <CommentItem/>
   **********************************/
  const onRemove = (commentId: number) => {
    setSelectedCommentId(commentId);
    setAskRemoveComment(true);
  };

  /**********************************
   * 댓글 삭제 확인: <AskDialog/>
   **********************************/
  const onConfirmRemove = () => {
    setAskRemoveComment(false);
    remove({
      id: selectedCommentId!, // null이 아님을 지정하기 위하여 ! 사용
      articleId: id,
    });
  };

  /**********************************
   * 댓글 삭제 취소: <AskDialog/>
   **********************************/
  const onCancelRemove = () => {
    setAskRemoveComment(false);
  };

  /**********************************
   * 댓글 수정: <CommentItem/>
   **********************************/
  const onModify = (commentId: number) => {
    setSelectedCommentId(commentId);
    setModifying(true);
  };

  /**********************************
   * 댓글 관련 모달 수정 취소: <CommentModal/>
   **********************************/
  const onCancelModify = () => {
    setModifying(false);
  };

  /**********************************
   * 댓글 관련 모달 수정: <CommentModal/>
   **********************************/
  const onSubmitModify = (message: string) => {
    setModifying(false);
    modify({
      id: selectedCommentId!,
      articleId: id,
      message,
    });
  };

  const selectedComment = commentsQuery.data?.find(
    comment => comment.id === selectedCommentId,
  );

  // 둘 중 하나라도 준비되지 않은 데이터가 있으면 스피너 보여주기
  if (!articleQuery.data || !commentsQuery.data) {
    return (
      <ActivityIndicator size="large" style={styles.spinner} color="black" />
    );
  }

  const {title, body, published_at, user} = articleQuery.data;
  const isMyArticle = currentUser?.id === user.id;

  return (
    <>
      <FlatList
        style={styles.flatList}
        contentContainerStyle={[
          styles.flatListContent,
          {paddingBottom: bottom},
        ]}
        data={commentsQuery.data}
        renderItem={({item}) => (
          <CommentItem
            id={item.id}
            message={item.message}
            publishedAt={item.published_at}
            username={item.user.username}
            onRemove={onRemove}
            onModify={onModify}
            isMyComment={item.user.id === currentUser?.id}
          />
        )}
        keyExtractor={item => item.id.toString()}
        ListHeaderComponent={
          <>
            <ArticleView
              title={title}
              body={body}
              publishedAt={published_at}
              username={user.username}
              id={id}
              isMyArticle={isMyArticle}
            />
            <CommentInput articleId={id} />
          </>
        }
      />
      <AskDialog
        visible={askRemoveComment}
        title="댓글 삭제"
        message="댓글을 삭제하시겠습니까?"
        isDestructive
        confirmText="삭제"
        onConfirm={onConfirmRemove}
        onClose={onCancelRemove}
      />
      <CommentModal
        visible={modifying}
        initialMessage={selectedComment?.message}
        onClose={onCancelModify}
        onSubmit={onSubmitModify}
      />
    </>
  );
}

const styles = StyleSheet.create({
  spinner: {
    flex: 1,
  },
  flatList: {
    backgroundColor: 'white',
    flex: 1,
  },
  flatListContent: {
    paddingHorizontal: 12,
  },
});

export default ArticleScreen;
