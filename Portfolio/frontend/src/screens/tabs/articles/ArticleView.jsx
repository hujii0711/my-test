import {useRoute, useNavigation} from '@react-navigation/native';
import React, {useRef} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ActivityIndicator, IconButton} from 'react-native-paper';
import {useQuery} from 'react-query';
import Color from '../../../commons/style/Color';
import {formatDaysAgo} from '../../../commons/utils/common';
import {selectArticle} from '../../../api/articles';
import CommentEntry from './CommentEntry';
import CommentList from './CommentList';
import {useUser} from '../../../commons/hooks/useReduxState';
import {modifyComment, removeComment} from '../../../api/comments';

const ArticleView = () => {
  const refRBSheet = useRef();
  const {id: articleRef} = useRoute().params;

  // 전역 상태
  const currentUser = useUser();

  // 게시판 상세
  const selectArticleQuery = useQuery(['selectArticle', articleRef], () =>
    selectArticle(articleRef),
  );

  const [selectedCommentId, setSelectedCommentId] = useState(0);
  const [askDialogVisible, setAskDialogVisible] = useState(false);
  const [commentModifyModalVisible, setCommentModifyModalVisible] =
    useState(false);

  const {mutate: mutateModifyComment} = useMutation(modifyComment, {
    onSuccess: comment => {
      queryClient.setQueryData('selectListComment', data => {
        if (!data) {
          return {
            pageParams: [undefined],
            pages: [[comment]],
          };
        }
        const [firstPage, ...rest] = data.pages;
        return {
          ...data,
          pages: [[comment, ...firstPage], ...rest],
        };
      });
    },
  });

  const {mutate: mutateRemoveComment} = useMutation(removeComment, {
    onSuccess: comment => {
      queryClient.setQueryData('selectListComment', data => {
        if (!data) {
          return {
            pageParams: [undefined],
            pages: [[comment]],
          };
        }
        const [firstPage, ...rest] = data.pages;
        return {
          ...data,
          pages: [[comment, ...firstPage], ...rest],
        };
      });
    },
  });

  //commentModifyModal
  // 댓글 수정 모달 띄움
  const onVisibleModify = commentId => {
    setSelectedCommentId(commentId);
    setCommentModifyModalVisible(true);
  };

  // 댓글 수정
  const onSubmitModify = message => {
    setCommentModifyModalVisible(false);
    mutateModifyComment({
      id: selectedCommentId,
      articleRef,
      message,
    });
  };

  // 댓글 수정 취소
  const onCancelModify = () => {
    setCommentModifyModalVisible(false);
  };

  //CustomDialog
  // 댓글 삭제 dialog 띄움
  const onVisibleRemove = commentId => {
    setSelectedCommentId(commentId);
    setAskDialogVisible(true);
  };

  // 댓글 삭제
  const onConfirmRemove = () => {
    setAskDialogVisible(false);
    mutateRemoveComment({
      id: selectedCommentId,
    });
  };

  // 댓글 삭제 취소
  const onCancelRemove = () => {
    setAskDialogVisible(false);
  };

  //selectArticleQuery 반환값이 없으면 로딩바 출력
  if (!selectArticleQuery.data) {
    return <ActivityIndicator color="red" />;
  }

  const {
    title,
    contents,
    created_at,
    user_id,
    user_name,
    lookup,
    comment_cnt,
    liked,
    unliked,
  } = selectArticleQuery.data;
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
      <CommentEntry refRBSheet={refRBSheet} lookup={0} />
      <CommentList
        refRBSheet={refRBSheet}
        articleRef={articleRef}
        comment_cnt={comment_cnt}
        onVisibleModify={onVisibleModify}
        onVisibleRemove={onVisibleRemove}
      />
      <CommentModifyModal
        visible={commentModifyModalVisible}
        commentId={selectedCommentId}
        articleRef={articleRef}
        onSubmit={onSubmitModify}
        onClose={onCancelModify}
      />
      <CustomDialog
        visible={askDialogVisible}
        title="댓글 삭제"
        message="댓글을 삭제하시겠습니까?"
        confirmText="삭제"
        onConfirm={onConfirmRemove}
        onClose={onCancelRemove}
      />
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

  const onPressMove = () => {
    navigation.navigate('ArticleWrite', {id});
  };

  return (
    <View style={styles.block}>
      <Text style={styles.title}>{title}</Text>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={styles.small_text}>
          {user_name} | {createdAt} | 조회수: {lookup}
        </Text>
        {isMyArticle ? (
          <IconButton
            icon="application-edit-outline"
            size={18}
            style={{alignSelf: 'flex-end'}}
            onPress={() => onPressMove()}
          />
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
