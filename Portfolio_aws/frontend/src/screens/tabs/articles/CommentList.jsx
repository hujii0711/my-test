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
import {useUser} from '../../../commons/hooks/useReduxState';
import CommentModifyModal from './CommentModifyModal';
import CustomDialog from '../../../commons/utils/CustomDialog';
import {
  insertArticleComment,
  updateArticleComment,
  deleteArticleComment,
} from '../../../api/articles';
import com from '../../../commons/utils/common';

const CommentList = ({
  _refRBSheet,
  _articleId,
  _articleCreatedDt,
  _comments,
  _childUpdate,
}) => {
  console.log('CommentList 렌더링!!!');

  const queryClient = useQueryClient();

  //comments 캐시 set
  const commentsJson = _comments ? JSON.parse(_comments) : [];
  queryClient.setQueryData('selectListComment', () => {
    return commentsJson;
  });

  const selectListCommentQuery = queryClient.getQueryData('selectListComment');

  const users = useUser();
  const [message, setMessage] = useState('');
  //const [, setCommentItemUpdate] = useState(false);

  //const setCommentItemState = () => {
  //  setCommentItemUpdate(!false);
  //};

  const [selectedCommentId, setSelectedCommentId] = useState(null);
  const [askDialogVisible, setAskDialogVisible] = useState(false);
  const [commentModifyModalVisible, setCommentModifyModalVisible] =
    useState(false);

  // mutate 댓글 입력
  const {mutate: mutateInsertArticleComment} = useMutation(
    insertArticleComment,
    {
      onSuccess: comment => {
        //댓글 목록 리캐싱
        /*queryClient.setQueryData('selectListComment', data => {
        if (!data) {
          return {
            pageParams: [undefined],
            pages: [[comment]],
            articleId: articleId,
          };
        }
        const [firstPage, ...rest] = data.pages;
        return {
          ...data,
          pages: [[comment, ...firstPage], ...rest],
          articleId: articleId,
        };
      });
      const cacheData = queryClient.getQueryData('selectListComment');

      //ArticleView 리렌더링 시키기!!
      queryClient.invalidateQueries(['selectArticle', articleId]);
      childUpdate();*/
      },
    },
  );

  // mutate 댓글 수정
  const {mutate: mutateUpdateComment} = useMutation(updateArticleComment, {
    onSuccess: comment => {
      /*// ☆ update 리턴 데이터 캐싱할 데이터 원본과 다름
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
          articleId: articleId,
        };
      });
      const cacheData = queryClient.getQueryData('selectListComment');
      console.log('mutateUpdateComment >>>>> cacheData=====', cacheData);*/
    },
  });

  // mutate 댓글 삭제
  const {mutate: mutateDeleteComment} = useMutation(deleteArticleComment, {
    onSuccess: () => {
      /*queryClient.setQueryData('selectListComment', data => {
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
      );*/
    },
  });

  // submit 댓글 입력
  const onSubmitWriteComment = useCallback(
    message => {
      const newObj = {
        id: com.uuidv4(),
        message,
        user_id: 'fujii0711',
        user_name: '김형준',
        liked: 0,
        unliked: 0,
        created_dt: com.krDate(),
        updated_dt: null,
      };

      const commentBody = com.makeInsertJson(commentsJson, newObj);
      mutateInsertArticleComment({_articleCreatedDt, commentBody});
    },
    [mutateInsertArticleComment, _articleCreatedDt],
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

    const updateObj = com.findJson(commentsJson, 'id', selectedCommentId);
    updateObj.message = message;
    updateObj.updated_dt = com.krDate();

    const commentBody = com.makeUpdateJson(
      commentsJson,
      updateObj,
      'id',
      selectedCommentId,
    );

    mutateUpdateComment({
      articleCreatedDt: _articleCreatedDt,
      commentBody,
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

    const commentBody = com.makeDeleteJson(
      commentsJson,
      'id',
      selectedCommentId,
    );

    mutateDeleteComment({
      articleCreatedDt: _articleCreatedDt,
      commentBody,
    });
  };

  // 댓글 삭제 취소
  const onCancelRemove = () => {
    setAskDialogVisible(false);
  };

  /*const {
    data,
    isFetchingNextPage,
    isFetchingPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
  } = useInfiniteQuery(
    'selectListComment',
    ({pageParam}) => selectListComment({...pageParam, articleId: articleId}),
    {
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage?.length === 10) {
          return {
            nextOffset: lastPage[lastPage.length - 1].id,
            articleId: articleId,
          };
        } else {
          return {
            articleId: articleId,
            nextOffset: undefined,
            prevOffset: undefined,
          };
        }
      },
      getPreviousPageParam: (firstPage, allPages) => {
        const validPage = allPages.find(page => page?.length > 0);
        if (!validPage) {
          return {
            articleId: articleId,
            nextOffset: undefined,
            prevOffset: undefined,
          };
        }
        return {
          prevOffset: validPage[0].id,
          articleId: articleId,
        };
      },
    },
  );
  */

  const items = useMemo(() => {
    if (!commentsJson) {
      return null;
    }
    return commentsJson;
  }, [commentsJson]);

  if (!items) {
    return <ActivityIndicator color="red" />;
  }
  return (
    <RBSheet
      ref={_refRBSheet}
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
          onPress={() => _refRBSheet.current.close()}
        />
        <FlatList
          data={items}
          renderItem={({item}) => {
            return (
              <CommentItem
                _commentId={item.id}
                _message={item.message}
                _createdDt={item.created_dt}
                _userName={item.user_name ?? '김형준'}
                _articleCreatedDt={_articleCreatedDt}
                _initLike={item.liked}
                _initHate={item.unliked}
                _onVisibleModify={onVisibleModify}
                _onVisibleRemove={onVisibleRemove}
              />
            );
          }}
          keyExtractor={(item, index) => item.id}
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
              {/* {isFetchingNextPage && (
                <ActivityIndicator
                  size="small"
                  color="blue"
                  style={{flex: 1}}
                />
              )} */}
            </>
          )}
          // ☆ 주석 해제시 렌더링 부하 발생
          //onEndReachedThreshold={0.5}
          // onEndReached={fetchNextPage}
          // refreshControl={
          //   <RefreshControl
          //     onRefresh={fetchPreviousPage}
          //     refreshing={isFetchingPreviousPage}
          //   />
          // }
        />
      </View>
      {selectedCommentId && (
        <>
          <CommentModifyModal
            _visible={commentModifyModalVisible}
            _commentId={selectedCommentId}
            _onSubmit={onSubmitModify}
            _onClose={onCancelModify}
          />
          <CustomDialog
            _visible={askDialogVisible}
            _title="댓글 삭제"
            _message="댓글을 삭제하시겠습니까?"
            _confirmText="삭제"
            _onConfirm={onConfirmRemove}
            _onClose={onCancelRemove}
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
