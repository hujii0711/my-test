import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useRef, useCallback, useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ActivityIndicator, IconButton} from 'react-native-paper';
import {useMutation, useQuery, useQueryClient} from 'react-query';
import {
  selectArticle,
  deleteArticle,
  updateArticleLookUpCnt,
} from '../../../api/articles';
import {useUser} from '../../../commons/hooks/useReduxState';
import Color from '../../../commons/style/Color';
import {formatDaysAgo} from '../../../commons/utils/common';
import CommentEntry from './CommentEntry';
import CommentList from './CommentList';
import CustomDialog from '../../../commons/utils/CustomDialog';
import {updateArticleLikeCnt} from '../../../api/articles';

const ArticleView = () => {
  console.log('ArticleView 렌더링!!!!!!!');

  const refRBSheet = useRef();
  const {id: articleRef} = useRoute().params;
  const currentUser = useUser();
  const [, setCommentListUpdate] = useState(false);
  const setCommentListState = () => {
    console.log('setCommentListState!!!!!!!!!!');
    setCommentListUpdate(!false);
  };

  // 조회수 증가
  useEffect(() => {
    (async () => {
      console.log("ArticleView >>> useEffect >>> articleRef=====", articleRef);
      await updateArticleLookUpCnt(articleRef);
    })();
  }, [articleRef]);

  // 게시판 상세
  const selectArticleQuery = useQuery(['selectArticle', articleRef], () =>
    selectArticle(articleRef),
  );

  if (!selectArticleQuery.data) {
    return (
      <ActivityIndicator size="small" style={{flex: 1}} color={Color.blue2} />
    );
  }

  const {
    title,
    contents,
    created_dt,
    user_id,
    user_name,
    lookup,
    liked,
    unliked,
  } = selectArticleQuery.data;

  return (
    <>
      <ArticleViewItems
        id={articleRef}
        title={title}
        contents={contents}
        created_dt={created_dt}
        user_name={user_name}
        lookup={lookup}
        liked={liked}
        unliked={unliked}
        isMyArticle={currentUser?.user_id === user_id}
      />
      <CommentEntry refRBSheet={refRBSheet} commentCnt={10} />
      <CommentList
        refRBSheet={refRBSheet}
        articleRef={articleRef}
        childUpdate={setCommentListState}
      />
    </>
  );
};

const ArticleViewItems = ({
  id,
  title,
  contents,
  created_dt,
  user_name,
  isMyArticle,
  lookup = 0,
  liked = 0,
  unliked = 0,
}) => {

  const createdAt = formatDaysAgo(created_dt);
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const [askDialogVisible, setAskDialogVisible] = useState(false);

  // 좋아요, 싫어요 관리
  const select = useRef(false);

  const [likeCnt, setLikeCnt] = useState(liked);
  const [selectedLike, setSelectedLike] = useState(false);

  const [hateCnt, setHateCnt] = useState(unliked);
  const [selectedHate, setSelectedHate] = useState(false);

  useEffect(() => {
    if (selectedLike === false && selectedHate === false) {
      if (select.current === 'like') {
        updateArticleLikeCnt(id, 'likeDown');
      } else if (select.current === 'hate') {
        updateArticleLikeCnt(id, 'hateDown');
      }
      select.current = '';
      return;
    } else if (selectedLike === true && selectedHate === false) {
      if (select.current === '') {
        updateArticleLikeCnt(id, 'likeUp');
      } else if (select.current === 'hate') {
        updateArticleLikeCnt(id, 'likeUpAndhateDown');
      }
      select.current = 'like';
      return;
    } else if (selectedLike === false && selectedHate === true) {
      if (select.current === '') {
        updateArticleLikeCnt(id, 'hateUp');
      } else if (select.current === 'like') {
        updateArticleLikeCnt(id, 'likeDownAndhateUp');
      }
      select.current = 'hate';
      return;
    } // 컴포넌트가 언마운트(사라질때)시 실행
    return () => {
      console.log('타이머가 종료되었습니다.');
    };
  }, [selectedLike, selectedHate]);

  const onPressLike = () => {
    if (selectedLike) {
      setLikeCnt(likeCnt - 1);
      setSelectedLike(false);
    } else {
      setLikeCnt(likeCnt + 1);
      setSelectedLike(true);
    }
    setSelectedHate(false);
    setHateCnt(unliked);
  };

  const onPressHate = () => {
    if (selectedHate) {
      setHateCnt(hateCnt - 1);
      setSelectedHate(false);
    } else {
      setHateCnt(hateCnt + 1);
      setSelectedHate(true);
    }
    setSelectedLike(false);
    setLikeCnt(liked);
  };

  const onPressDeleteArticle = useCallback(() => {
    setAskDialogVisible(true);
  }, [id]);

  const onConfirmRemove = () => {
    mutateDeleteArticle(id);
  };

  const onCancelRemove = () => {
    setAskDialogVisible(false);
  };

  const onPressNaviMove = () => {
    navigation.navigate('ArticleWrite', {id});
  };

  // mutate 댓글 삭제
  const {mutate: mutateDeleteArticle} = useMutation(deleteArticle, {
    onSuccess: () => {
      queryClient.setQueryData('selectArticlePagingList', data => {
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

  return (
    <View style={styles.block}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.small_text}>{user_name}</Text>
      <Text style={styles.small_text}>{createdAt}</Text>
      <Text style={styles.small_text}>조회수: {lookup}</Text>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        {isMyArticle ? (
          <View style={{flexDirection: 'row'}}>
            <IconButton
              icon="note-edit-outline"
              size={18}
              style={{alignSelf: 'flex-end'}}
              onPress={() => onPressNaviMove()}
            />
            <IconButton
              icon="note-remove-outline"
              size={18}
              style={{alignSelf: 'flex-end'}}
              onPress={() => onPressDeleteArticle()}
            />
          </View>
        ) : (
          <View style={{flexDirection: 'row'}}>
            <IconButton
              icon={selectedLike ? 'thumb-up' : 'thumb-up-outline'}
              size={18}
              style={{alignSelf: 'flex-end'}}
              onPress={onPressLike}
            />
            <Text style={[{marginLeft: -10}, styles.small_text]}>
              {likeCnt}
            </Text>
            <IconButton
              icon={selectedHate ? 'thumb-down' : 'thumb-down-outline'}
              size={18}
              style={{alignSelf: 'flex-end'}}
              onPress={onPressHate}
            />
            <Text style={[{marginLeft: -10}, styles.small_text]}>
              {hateCnt}
            </Text>
          </View>
        )}
      </View>
      <View style={styles.separator} />
      <Text style={styles.content}>{contents}</Text>

      {isMyArticle && (
        <CustomDialog
          visible={askDialogVisible}
          title="게시글 삭제"
          message="게시글을 삭제하시겠습니까?"
          confirmText="삭제"
          onConfirm={onConfirmRemove}
          onClose={onCancelRemove}
        />
      )}
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
