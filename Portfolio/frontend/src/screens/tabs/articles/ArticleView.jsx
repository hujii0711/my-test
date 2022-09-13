import React, {useRef} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {useMutation, useQuery, useQueryClient} from 'react-query';
import {useSelector} from 'react-redux';
import Color from '../../../commons/style/Color';
import CommentBanner from './CommentBanner';
import CommentList from './CommentList';
import CommentModifyModal from './CommentModifyModal';
import CustomDialog from '../../../commons/utils/CustomDialog';

// const DATA = {
//   id: '1',
//   title: 'title1',
//   contents:
//     'content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1',
//   published_at: '2020-01-01',
//   user_name: '김형준',
// };

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
  //const {id, title, contents, published_at, user_name} = DATA;
  // 1-1: 기본 변수
  const refRBSheet = useRef();
  const {params} = useRoute();
  const {id: idf} = params;

  // 1-2: 전역 상태
  const {users: currentUser} = useSelector(({userReducer}) => ({
    users: userReducer.users,
  }));
  const isMyArticle = currentUser?.user_id === user_id;

  // 1-3: 게시판 페이지
  const articleQuery = useQuery(['article', id], () => getArticle(id));
  const {title, contents, published_at, user_id, user_name} = articleQuery.data;

  // 1-4: 댓글 목록
  const commentsQuery = useQuery(['comments', id], () => getComments(id));
  const selectedComment = commentsQuery.data?.find(
    comment => comment.id === selectedCommentId,
  );

  // 1-5: reactQuery 조회 값
  const queryClient = useQueryClient();
  const {mutate: modify} = useMutation(modifyComment, {
    onSuccess: comment => {
      queryClient.setQueryData(['comments', id], comments =>
        comments
          ? comments.map(c => (c.id === selectedCommentId ? comment : c))
          : [],
      );
    },
  });
  const {mutate: remove} = useMutation(deleteComment, {
    onSuccess: () => {
      queryClient.setQueryData(['comments', id], comments =>
        comments ? comments.filter(c => c.id !== selectedCommentId) : [],
      );
    },
  });

  // 1-6: state 값
  const [selectedCommentId, setSelectedCommentId] = useState(null);
  const [askDialogVisible, setAskDialogVisible] = useState(false);
  const [commentModifyModalVisible, setCommentModifyModalVisible] =
    useState(false);

  /**********************************
   * 댓글 수정: <CommentItem/>
   **********************************/
  const onModify = commentId => {
    setSelectedCommentId(commentId);
    setCommentModifyModalVisible(true);
  };

  /**********************************
   * 댓글 삭제 : <CommentItem/>
   **********************************/
  const onRemove = commentId => {
    setSelectedCommentId(commentId);
    setAskDialogVisible(true);
  };

  /**********************************
   * 댓글 삭제 확인: <AskDialog/>
   **********************************/
  const onConfirmRemove = () => {
    setAskDialogVisible(false);
    remove({
      id: selectedCommentId,
      articleId: id,
    });
  };

  /**********************************
   * 댓글 삭제 취소: <AskDialog/>
   **********************************/
  const onCancelRemove = () => {
    setAskDialogVisible(false);
  };

  /**********************************
   * 댓글 관련 모달 수정 취소: <CommentModal/>
   **********************************/
  const onCancelModify = () => {
    setCommentModifyModalVisible(false);
  };

  /**********************************
   * 댓글 관련 모달 수정: <CommentModal/>
   **********************************/
  const onSubmitModify = message => {
    setCommentModifyModalVisible(false);
    modify({
      id: selectedCommentId,
      articleId: id,
      message,
    });
  };
  return (
    <>
      <ArticleViewItems
        title={title}
        contents={contents}
        publishedAt={published_at}
        username={user_name}
        id={id}
      />
      <CommentBanner refRBSheet={refRBSheet} />
      <CommentList
        refRBSheet={refRBSheet}
        onRemove={onRemove}
        onModify={onModify}
      />
      <CommentModifyModal
        visible={commentModifyModalVisible}
        initialMessage="message"
        onClose={onCancelModify}
        onSubmit={onSubmitModify}
      />
      <CustomDialog
        visible={askDialogVisible}
        onConfirm={onConfirmRemove}
        onClose={onCancelRemove}
      />
    </>
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
