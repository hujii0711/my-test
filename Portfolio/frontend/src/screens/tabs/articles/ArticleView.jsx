import React, {useRef} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import CommentWrite from './CommentWrite';
import CommentList from './CommentList';
import Color from '../../../commons/style/Color';
import {useRoute} from '@react-navigation/native';
import {useMutation, useQuery, useQueryClient} from 'react-query';
import {useSelector} from 'react-redux';

const DATA = {
  id: '1',
  title: 'title1',
  contents:
    'content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1',
  published_at: '2020-01-01',
  user_name: '김형준',
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

const ArticleViewItems = ({title, contents, publishedAt, username}) => {
  return (
    <View style={styles.block}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.small_text}>
        {username} | {publishedAt} | 조회수: 12
      </Text>
      <View style={styles.separator} />
      <Text style={styles.content}>{contents}</Text>
    </View>
  );
};

const ArticleView = () => {
  const {id, title, contents, published_at, user_name} = DATA;
  const refRBSheet = useRef();
  const {params} = useRoute();
  const {id: idf} = params;
  console.log('ArticleView >>> idf ====', idf);
  // const queryClient = useQueryClient();

  // const [selectedCommentId, setSelectedCommentId] = useState(null);
  // const [askRemoveComment, setAskRemoveComment] = useState(false);
  // const [modifying, setModifying] = useState(false);

  // const articleQuery = useQuery(['article', id], () => getArticle(id));
  // const commentsQuery = useQuery(['comments', id], () => getComments(id));

  // const {users: currentUser} = useSelector(({userReducer}) => ({
  //   users: userReducer.users,
  // }));

  // /***********************************
  //  * 댓글 수정
  //  *********************************/
  // const {mutate: modify} = useMutation(modifyComment, {
  //   onSuccess: comment => {
  //     queryClient.setQueryData(['comments', id], comments =>
  //       comments
  //         ? comments.map(c => (c.id === selectedCommentId ? comment : c))
  //         : [],
  //     );
  //   },
  // });

  // /***********************************
  //  * 댓글 삭제
  //  *********************************/
  // const {mutate: remove} = useMutation(deleteComment, {
  //   onSuccess: () => {
  //     queryClient.setQueryData(['comments', id], comments =>
  //       comments ? comments.filter(c => c.id !== selectedCommentId) : [],
  //     );
  //   },
  // });

  // /**********************************
  //  * 댓글 삭제 : <CommentItem/>
  //  **********************************/
  // const onRemove = commentId => {
  //   setSelectedCommentId(commentId);
  //   setAskRemoveComment(true);
  // };

  // /**********************************
  //  * 댓글 삭제 확인: <AskDialog/>
  //  **********************************/
  // const onConfirmRemove = () => {
  //   setAskRemoveComment(false);
  //   remove({
  //     id: selectedCommentId, // null이 아님을 지정하기 위하여 ! 사용
  //     articleId: id,
  //   });
  // };

  // /**********************************
  //  * 댓글 삭제 취소: <AskDialog/>
  //  **********************************/
  // const onCancelRemove = () => {
  //   setAskRemoveComment(false);
  // };

  // /**********************************
  //  * 댓글 수정: <CommentItem/>
  //  **********************************/
  // const onModify = commentId => {
  //   setSelectedCommentId(commentId);
  //   setModifying(true);
  // };

  // /**********************************
  //  * 댓글 관련 모달 수정 취소: <CommentModal/>
  //  **********************************/
  // const onCancelModify = () => {
  //   setModifying(false);
  // };

  // /**********************************
  //  * 댓글 관련 모달 수정: <CommentModal/>
  //  **********************************/
  // const onSubmitModify = message => {
  //   setModifying(false);
  //   modify({
  //     id: selectedCommentId,
  //     articleId: id,
  //     message,
  //   });
  // };

  // const selectedComment = commentsQuery.data?.find(
  //   comment => comment.id === selectedCommentId,
  // );

  // // 둘 중 하나라도 준비되지 않은 데이터가 있으면 스피너 보여주기
  // if (!articleQuery.data || !commentsQuery.data) {
  //   return (
  //     <ActivityIndicator size="large" style={styles.spinner} color="black" />
  //   );
  // }

  // const {title, contents, published_at, user_id, user_name} = articleQuery.data;
  // const isMyArticle = currentUser?.user_id === user_id;

  return (
    <>
      <ArticleViewItems
        title={title}
        contents={contents}
        publishedAt={published_at}
        username={user_name}
        id={id}
      />
      <CommentWrite refRBSheet={refRBSheet} />
      <CommentList refRBSheet={refRBSheet} />
    </>
  );
};

export default ArticleView;
