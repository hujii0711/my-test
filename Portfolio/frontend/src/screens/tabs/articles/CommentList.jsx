import React, {useMemo, useState, useCallback, memo} from 'react';
import {IconButton, TextInput, ActivityIndicator} from 'react-native-paper';
import {View, FlatList, Text, StyleSheet, RefreshControl} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {
  useMutation,
  useQueryClient,
  useInfiniteQuery,
  useQuery,
} from 'react-query';
import CommentItem from './CommentItem';
import Color from '../../../commons/style/Color';
import {insertComment, selectListComment} from '../../../api/comments';
import {useUser} from '../../../commons/hooks/useReduxState';
import CommentModifyModal from './CommentModifyModal';
import CustomDialog from '../../../commons/utils/CustomDialog';
import {updateComment, deleteComment} from '../../../api/comments';

const CommentList = ({refRBSheet, articleRef, childUpdate}) => {
  console.log('CommentList 렌더링!!!');
  const users = useUser();
  const queryClient = useQueryClient();
  const [message, setMessage] = useState('');
  const [, setCommentItemUpdate] = useState(false);

  const setCommentItemState = () => {
    setCommentItemUpdate(!false);
  };

  const [selectedCommentId, setSelectedCommentId] = useState(null);
  const [askDialogVisible, setAskDialogVisible] = useState(false);
  const [commentModifyModalVisible, setCommentModifyModalVisible] =
    useState(false);

  // mutate 댓글 입력
  const {mutate: mutateInsertComment} = useMutation(insertComment, {
    onSuccess: comment => {
      //댓글 목록 리캐싱
      queryClient.setQueryData('selectListComment', data => {
        if (!data) {
          return {
            pageParams: [undefined],
            pages: [[comment]],
            articleId: articleRef,
          };
        }
        const [firstPage, ...rest] = data.pages;
        return {
          ...data,
          pages: [[comment, ...firstPage], ...rest],
          articleId: articleRef,
        };
      });
      const cacheData = queryClient.getQueryData('selectListComment');

      //ArticleView 리렌더링 시키기!!
      queryClient.invalidateQueries(['selectArticle', articleRef]);
      childUpdate();
    },
  });

  // mutate 댓글 수정
  const {mutate: mutateUpdateComment} = useMutation(updateComment, {
    onSuccess: comment => {
      // ☆ update 리턴 데이터 캐싱할 데이터 원본과 다름
      // LOG  ======= {"article_ref": 2, "created_at": "2022-10-03T05:36:37.000Z", "id": 8, "message": "test", "updated_at": "2022-10-03T05:36:37.000Z", "user_id": "f7d1176a-a503-4b4e-94cd-8d11b8eb990c"}
      // LOG  ======= {"id": 8, "message": "test1"}
      queryClient.setQueryData('selectListComment', data => {
        if (!data) {
          return {pageParams: [], pages: []};
        }
        return {
          pageParams: data.pageParams,
          pages: data.pages.map(page =>
            page.find(a => a.id === selectedCommentId)
              ? page.map(a => (a.id === selectedCommentId ? comment : a))
              : page,
          ),
          articleId: articleRef,
        };
      });
      const cacheData = queryClient.getQueryData('selectListComment');
      console.log('mutateUpdateComment >>>>> cacheData=====', cacheData);
    },
  });

  // mutate 댓글 삭제
  const {mutate: mutateDeleteComment} = useMutation(deleteComment, {
    onSuccess: () => {
      queryClient.setQueryData('selectListComment', data => {
        if (!data) {
          return {pageParams: [], pages: []};
        }
        return {
          pageParams: data.pageParams,
          pages: data.pages.map(page => page.filter(a => a.id !== id)),
        };
      });
      const cacheData = queryClient.getQueryData('selectListComment');
      console.log(
        'mutateUpdateComment >>>>> mutateDeleteComment=====',
        cacheData,
      );
    },
  });

  // submit 댓글 입력
  const onSubmitWriteComment = useCallback(
    message => {
      mutateInsertComment({
        articleRef,
        message,
      });
    },
    [mutateInsertComment, articleRef],
  );

  //commentModifyModal
  // 댓글 수정 모달 띄움
  const onVisibleModify = commentId => {
    setSelectedCommentId(commentId);
    setCommentModifyModalVisible(true);
  };

  // 댓글 수정
  const onSubmitModify = message => {
    setCommentModifyModalVisible(false);
    mutateUpdateComment({
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
    mutateDeleteComment({
      id: selectedCommentId,
      articleRef,
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
            nextOffset: lastPage[lastPage.length - 1].id,
            articleId: articleRef,
          };
        } else {
          return {
            articleId: articleRef,
            nextOffset: undefined,
            prevOffset: undefined,
          };
        }
      },
      getPreviousPageParam: (firstPage, allPages) => {
        const validPage = allPages.find(page => page?.length > 0);
        if (!validPage) {
          return {
            articleId: articleRef,
            nextOffset: undefined,
            prevOffset: undefined,
          };
        }
        return {
          prevOffset: validPage[0].id,
          articleId: articleRef,
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

  // if (!items) {
  //   return <ActivityIndicator color="red" />;
  // }

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
          renderItem={({item}) => {
            return (
              <CommentItem
                commentId={item.id}
                message={item.message}
                createdAt={item.created_at}
                username={item.user_name}
                articleRef={articleRef}
                isMyComment={item.user_id === users.user_id}
                initLike={item.liked}
                initHate={item.unliked}
                onVisibleModify={onVisibleModify}
                onVisibleRemove={onVisibleRemove}
                childUpdate={setCommentItemState}
              />
            );
          }}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          ListHeaderComponent={
            <View style={{flexDirection: 'row'}}>
              <TextInput
                mode="outlined"
                placeholder="댓글을 입력하세요!"
                selectionColor={Color.divider}
                activeOutlineColor={Color.pink1}
                outlineColor={Color.divider}
                dense={true}
                style={{
                  backgroundColor: Color.white,
                  fontSize: 11,
                  margin: 10,
                  width: '80%',
                  //height: 30,
                }}
                value={message}
                onSubmitEditing={() => onSubmitWriteComment(message)}
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
          // ☆ 주석 해제시 렌더링 부하 발생
          onEndReachedThreshold={0.5}
          onEndReached={fetchNextPage}
          refreshControl={
            <RefreshControl
              onRefresh={fetchPreviousPage}
              refreshing={isFetchingPreviousPage}
            />
          }
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
  separator: {
    height: 1,
    backgroundColor: Color.divider,
  },
});

export default memo(CommentList);
