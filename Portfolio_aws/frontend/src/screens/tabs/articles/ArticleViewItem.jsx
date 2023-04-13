import {useNavigation} from '@react-navigation/native';
import React, {useRef, useCallback, useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {IconButton} from 'react-native-paper';
import {useMutation} from 'react-query';
import {deleteArticle, updateArticleLikeUpDown} from '../../../api/articles';
import Color from '../../../commons/style/Color';
import com from '../../../commons/utils/common';
import CustomDialog from '../../../commons/utils/CustomDialog';

const ArticleViewItem = ({
  _id,
  _title,
  _contents,
  _createdDt,
  _userName,
  _isMyArticle,
  _lookup = 0,
  _liked = 0,
  _unliked = 0,
}) => {
  console.log('ArticleViewItem 렌더링!!!!');
  const createdDtAgo = com.formatDaysAgo(_createdDt);
  const navigation = useNavigation();
  const [askDialogVisible, setAskDialogVisible] = useState(false);

  // 좋아요, 싫어요 관리
  const select = useRef(false);

  const [likeCnt, setLikeCnt] = useState(_liked);
  const [selectedLike, setSelectedLike] = useState(false);

  const [hateCnt, setHateCnt] = useState(_unliked);
  const [selectedHate, setSelectedHate] = useState(false);

  useEffect(() => {
    if (selectedLike === false && selectedHate === false) {
      if (select.current === 'like') {
        updateArticleLikeUpDown(_createdDt, 'likeDown');
      } else if (select.current === 'hate') {
        updateArticleLikeUpDown(_createdDt, 'hateDown');
      }
      select.current = '';
      return;
    } else if (selectedLike === true && selectedHate === false) {
      if (select.current === '') {
        updateArticleLikeUpDown(_createdDt, 'likeUp');
      } else if (select.current === 'hate') {
        updateArticleLikeUpDown(_createdDt, 'likeUpAndhateDown');
      }
      select.current = 'like';
      return;
    } else if (selectedLike === false && selectedHate === true) {
      if (select.current === '') {
        updateArticleLikeUpDown(_createdDt, 'hateUp');
      } else if (select.current === 'like') {
        updateArticleLikeUpDown(_createdDt, 'likeDownAndhateUp');
      }
      select.current = 'hate';
      return;
    } // 컴포넌트가 언마운트(사라질때)시 실행
    return () => {
      console.log('ArticleViewItem >>>> 컴포넌트가 언마운트(사라질때)시 실행');
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
    setHateCnt(_unliked);
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
    setLikeCnt(_liked);
  };

  const onPressDeleteArticle = useCallback(() => {
    setAskDialogVisible(true);
  }, [_id]);

  const onConfirmRemove = () => {
    mutateDeleteArticle(_createdDt);
  };

  const onCancelRemove = () => {
    setAskDialogVisible(false);
  };

  const onPressNaviMove = () => {
    const move = {id: _id, createdDt: _createdDt};
    navigation.navigate('ArticleWrite', move);
  };

  // mutate 댓글 삭제
  const {mutate: mutateDeleteArticle} = useMutation(deleteArticle, {
    onSuccess: () => {
      // queryClient.setQueryData('selectArticlePagingList', data => {
      //   if (!data) {
      //     return {pageParams: [], pages: []};
      //   }
      //   return {
      //     pageParams: data.pageParams,
      //     pages: data.pages.map(page => page.filter(a => a.id !== id)),
      //   };
      // });
      navigation.goBack();
    },
  });

  return (
    <View style={styles.block}>
      <Text style={styles.title}>{_title}</Text>
      <Text style={styles.small_text}>{_userName}</Text>
      <Text style={styles.small_text}>{createdDtAgo}</Text>
      <Text style={styles.small_text}>조회수: {_lookup}</Text>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        {_isMyArticle ? (
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
      <Text style={styles.content}>{_contents}</Text>

      {_isMyArticle && (
        <CustomDialog
          _visible={askDialogVisible}
          _title="게시글 삭제"
          _message="게시글을 삭제하시겠습니까?"
          _confirmText="삭제"
          _onConfirm={onConfirmRemove}
          _onClose={onCancelRemove}
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

export default ArticleViewItem;
