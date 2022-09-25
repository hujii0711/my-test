import React, {useMemo, useState} from 'react';
import {IconButton, TextInput, ActivityIndicator} from 'react-native-paper';
import {View, FlatList, Text, StyleSheet, RefreshControl} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {useMutation, useQueryClient, useInfiniteQuery} from 'react-query';
import CommentItem from './CommentItem';
import Color from '../../../commons/style/Color';
import {writeComment, selectListComment} from '../../../api/comments';
import {useUser} from '../../../commons/hooks/useReduxState';
import CommentModifyModal from './CommentModifyModal';
import CustomDialog from '../../../commons/utils/CustomDialog';
import {modifyComment, removeComment} from '../../../api/comments';
import {useQuery} from 'react-query';

const CommentList = ({refRBSheet, articleRef, comment_cnt}) => {
  const users = useUser();
  const [message, setMessage] = useState('');
  //const queryClient = useQueryClient();

  //console.log('CommentList >>>> articleRef======', articleRef);

  const {mutate: mutateWriteComment} = useMutation(writeComment);

  const onSubmitWriteComment = message => {
    mutateWriteComment({
      articleRef,
      message,
    });
  };

  const [selectedCommentId, setSelectedCommentId] = useState(null);
  const [askDialogVisible, setAskDialogVisible] = useState(false);
  const [commentModifyModalVisible, setCommentModifyModalVisible] =
    useState(false);

  const {mutate: mutateModifyComment} = useMutation(modifyComment, {
    onSuccess: comment => {
      console.log('mutateModifyComment >>>> onSuccess=====', comment);
    },
  });

  const {mutate: mutateRemoveComment} = useMutation(removeComment, {
    onSuccess: comment => {
      console.log('mutateRemoveComment >>>> onSuccess=====', comment);
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
      article_ref: articleRef,
      message: message,
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

  const {
    data,
    isFetchingNextPage,
    isFetchingPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
  } = useInfiniteQuery(
    'selectListComment',
    ({pageParam}) => selectListComment({...pageParam, articleId: articleRef}),
    {
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage?.length === 10) {
          return {
            cursor: lastPage[lastPage.length - 1].id,
          };
        } else {
          return undefined;
        }
      },
      getPreviousPageParam: (firstPage, allPages) => {
        const validPage = allPages.find(page => page?.length > 0);
        if (!validPage) {
          return undefined;
        }

        return {
          prevCursor: validPage[0].id,
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
    return <ActivityIndicator color="red" />;
  }

  //const selectCommentQuery = useQuery(
  //  ['selectComment', selectedCommentId],
  //  () => selectComment(articleRef, selectedCommentId),
  //);
  //console.log('selectCommentQuery====', selectCommentQuery);

  //const selectedComment = commentsQuery.data?.find(comment => comment.id === selectedCommentId);

  return (
    <RBSheet
      ref={refRBSheet}
      height={400}
      closeOnDragDown={true}
      closeOnPressMask={true}
      customStyles={{
        wrapper: {
          backgroundColor: 'transparent',
        },
        container: {
          backgroundColor: Color.pink1,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        },
        draggableIcon: {
          backgroundColor: Color.background,
        },
      }}>
      <View style={{backgroundColor: Color.background}}>
        <Text
          style={{
            padding: 15,
            backgroundColor: '#E9E9E9',
            color: Color.text,
          }}>
          댓글 목록
        </Text>
        <IconButton
          icon="close"
          iconColor={Color.background}
          style={styles.button}
          size={26}
          onPress={() => refRBSheet.current.close()}
        />
        <FlatList
          data={items}
          renderItem={({item}) => (
            <CommentItem
              commentId={item.id}
              message={item.message}
              created_at={item.created_at}
              username={item.user_id}
              articleRef={articleRef}
              isMyComment={item.user_id === users.user_id}
              onVisibleModify={onVisibleModify}
              onVisibleRemove={onVisibleRemove}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
          ListHeaderComponent={
            <View style={{flexDirection: 'row'}}>
              <TextInput
                mode="outlined"
                placeholder="댓글을 입력하세요!"
                selectionColor={Color.divider}
                activeOutlineColor={Color.pink1}
                outlineColor={Color.divider}
                style={{
                  backgroundColor: Color.white,
                  fontSize: 11,
                  margin: 10,
                  width: '80%',
                  height: 30,
                }}
                value={message}
                onChangeText={text => setMessage(text)}
              />
              <IconButton
                icon="send"
                size={30}
                style={{alignSelf: 'center'}}
                onPress={() => onSubmitWriteComment(message)}
              />
            </View>
          }
          ListFooterComponent={items => (
            <>
              {items.length > 0 ? <View style={styles.separator} /> : null}
              {isFetchingNextPage && (
                <ActivityIndicator
                  size="small"
                  color="blue"
                  style={{flex: 1}}
                />
              )}
            </>
          )}
          onEndReachedThreshold={0.5}
          onEndReached={fetchNextPage}
          refreshControl={
            <RefreshControl
              onRefresh={fetchPreviousPage}
              refreshing={isFetchingPreviousPage}
            />
          }
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </View>
      {selectedCommentId && (
        <>
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
      )}
    </RBSheet>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    right: 5,
  },
});
export default CommentList;
