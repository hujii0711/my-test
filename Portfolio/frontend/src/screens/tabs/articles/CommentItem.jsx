import React, {useState, useEffect, useRef, memo} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {Avatar, IconButton} from 'react-native-paper';
import {formatDaysAgo} from '../../../commons/utils/common';
import {updateCommentPrefer} from '../../../api/comments';
import {useQueryClient} from 'react-query';

const CommentItem = ({
  commentId,
  message,
  createdAt,
  username,
  articleRef,
  isMyComment,
  onVisibleModify,
  onVisibleRemove,
  initLike = 0,
  initHate = 0,
  childUpdate,
}) => {
  console.log('CommentItem 렌더링!!!');

  const queryClient = useQueryClient();
  const isFirstRender = useRef(false);
  const select = useRef(false);

  const [likeCnt, setLikeCnt] = useState(initLike);
  const [selectedLike, setSelectedLike] = useState(false);

  const [hateCnt, setHateCnt] = useState(initHate);
  const [selectedHate, setSelectedHate] = useState(false);

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

  const created_at = formatDaysAgo(createdAt);

  useEffect(() => {
    //console.log('isFirstRender.current========', isFirstRender.current);
    //console.log('select.current========', select.current);

    // 최초 렌더링시 skip
    // if (isFirstRender.current === false) {
    //   isFirstRender.current = true;
    //   return;
    // }

    // 경우의 수
    // 1. selectedLike=false | selectedHate=false
    // 2. selectedLike=true | selectedHate=false
    // 3. selectedLike=false | selectedHate=true
    if (selectedLike === false && selectedHate === false) {
      if (select.current === 'like') {
        updateCommentPrefer(commentId, 'likeDown');
      } else if (select.current === 'hate') {
        updateCommentPrefer(commentId, 'hateDown');
      }
      select.current = '';
      queryClient.invalidateQueries('selectListComment');
      childUpdate();
      return;
    } else if (selectedLike === true && selectedHate === false) {
      if (select.current === '') {
        updateCommentPrefer(commentId, 'likeUp');
      } else if (select.current === 'hate') {
        updateCommentPrefer(commentId, 'likeUpAndhateDown');
      }
      select.current = 'like';
      queryClient.invalidateQueries('selectListComment');
      childUpdate();
      return;
    } else if (selectedLike === false && selectedHate === true) {
      if (select.current === '') {
        updateCommentPrefer(commentId, 'hateUp');
      } else if (select.current === 'like') {
        updateCommentPrefer(commentId, 'likeDownAndhateUp');
      }
      select.current = 'hate';
      queryClient.invalidateQueries('selectListComment');
      childUpdate();
      return;
    }
  }, [selectedLike, selectedHate]);

  return (
    <React.Fragment key={commentId}>
      <View style={styles.block}>
        {/*left*/}
        <View style={styles.left}>
          <Avatar.Text
            size={30}
            label="AI"
            style={{backgroundColor: '#f6b93b'}}
          />
        </View>
        {/*right*/}
        <View style={styles.right}>
          {/*header*/}
          <View style={styles.header}>
            <Text style={styles.header_text}>{username}</Text>
            <View style={styles.space} />
            <Text style={styles.header_text}>{created_at}</Text>
          </View>
          <View style={styles.divider} />

          {/*content*/}
          <View style={styles.content}>
            <Text style={styles.content_text}>{message}</Text>
          </View>
          <View style={styles.divider} />

          {/*footer*/}
          <View style={styles.footer}>
            <View style={styles.footer_left}>
              <IconButton
                icon={selectedLike ? 'thumb-up' : 'thumb-up-outline'}
                size={18}
                onPress={onPressLike}
              />
              <Text style={{fontSize: 11, marginLeft: -10}}>{likeCnt}</Text>
              <IconButton
                icon={selectedHate ? 'thumb-down' : 'thumb-down-outline'}
                size={18}
                onPress={onPressHate}
              />
              <Text style={{fontSize: 11, marginLeft: -10}}>{hateCnt}</Text>
            </View>
            <View style={styles.footer_right}>
              <IconButton
                icon="comment-edit"
                size={18}
                onPress={() => onVisibleModify(commentId)}
              />
              <IconButton
                icon="comment-remove"
                size={18}
                onPress={() => onVisibleRemove(commentId)}
              />
            </View>
          </View>
        </View>
      </View>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  block: {
    backgroundColor: '#f5f6fa',
    flexDirection: 'row',
  },
  left: {
    backgroundColor: '#f5f6fa',
    paddingVertical: 5,
    paddingHorizontal: 10,
    width: '15%',
  },
  right: {
    backgroundColor: '#f5f6fa',
    width: '85%',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  header: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  header_text: {
    fontSize: 12,
    color: '#3a3a3a',
  },
  content: {
    marginBottom: 10,
  },
  content_text: {
    fontSize: 12,
    color: '#3a3a3a',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  footer_left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footer_right: {
    flexDirection: 'row',
  },
  divider: {
    borderWidth: 1,
    borderColor: '#f5f6fa',
  },
  space: {
    borderWidth: 1,
    width: 1,
    marginHorizontal: 10,
    borderColor: '#dcdde1',
    height: '100%',
  },
  buttonText: {
    fontSize: 11,
    borderWidth: 1,
    padding: 4,
    borderColor: '#3a3a3a',
    marginHorizontal: 5,
    borderRadius: 10,
    color: '#3a3a3a',
  },
  pressed: {
    opacity: 0.75,
  },
});

export default memo(CommentItem);
