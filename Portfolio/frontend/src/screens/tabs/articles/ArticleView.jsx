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
import CustomDialog from '../../../commons/utils/CustomDialog';
import {updateArticlePrefer} from '../../../api/articles';

const ArticleView = () => {
  const refRBSheet = useRef();
  const {id: articleRef} = useRoute().params;
  const currentUser = useUser();

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
  //const selectCommentCountQuery = useQuery(
  //  ['selectCommentCount', articleRef],
  //  () => selectCommentCount(articleRef),
  //);

  //selectArticleQuery OR selectCommentCountQuery 반환값이 없으면 로딩바 출력
  if (!selectArticleQuery.data) {
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
    comment_cnt,
    lookup,
    liked,
    unliked,
  } = selectArticleQuery.data;

  //const {comment_cnt} = selectCommentCountQuery.data;

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
  const [askDialogVisible, setAskDialogVisible] = useState(false);

  // 좋아요, 싫어요 관리
  const select = useRef(false);

  const [likeCnt, setLikeCnt] = useState(initLike);
  const [selectedLike, setSelectedLike] = useState(false);

  const [hateCnt, setHateCnt] = useState(initHate);
  const [selectedHate, setSelectedHate] = useState(false);

  useEffect(() => {
    if (selectedLike === false && selectedHate === false) {
      if (select.current === 'like') {
        updateArticlePrefer(id, 'likeDown');
      } else if (select.current === 'hate') {
        updateArticlePrefer(id, 'hateDown');
      }
      select.current = '';
      return;
    } else if (selectedLike === true && selectedHate === false) {
      if (select.current === '') {
        updateArticlePrefer(id, 'likeUp');
      } else if (select.current === 'hate') {
        updateArticlePrefer(id, 'likeUpAndhateDown');
      }
      select.current = 'like';
      return;
    } else if (selectedLike === false && selectedHate === true) {
      if (select.current === '') {
        updateArticlePrefer(id, 'hateUp');
      } else if (select.current === 'like') {
        updateArticlePrefer(id, 'likeDownAndhateUp');
      }
      select.current = 'hate';
      return;
    }
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
    setHateCnt(initHate);
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
    setLikeCnt(initLike);
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

  return (
    <View style={styles.block}>
      <Text style={styles.title}>{title}</Text>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={styles.small_text}>
          {user_name} | {createdAt} | 조회수: {lookup}
        </Text>
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
              icon="thumb-up-outline"
              size={18}
              style={{alignSelf: 'flex-end'}}
              onPress={onPressLike}
            />
            <Text style={[{marginLeft: -10}, styles.small_text]}>{liked}</Text>
            <IconButton
              icon="thumb-up-outline"
              size={18}
              style={{alignSelf: 'flex-end'}}
              onPress={onPressHate}
            />
            <Text style={[{marginLeft: -10}, styles.small_text]}>
              {unliked}
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
