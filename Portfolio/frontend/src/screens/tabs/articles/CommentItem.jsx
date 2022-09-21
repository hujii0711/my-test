import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {Avatar, IconButton} from 'react-native-paper';
import {formatDaysAgo} from '../../../commons/utils/common';

function CommentItem({
  commentId,
  message,
  created_at,
  username,
  articleRef,
  isMyComment,
  onVisibleModify,
  onVisibleRemove,
}) {
  const initLike = 12;
  const [like, setLike] = useState(initLike);
  const [selectedLike, setSelectedLike] = useState(false);

  const initHate = 10;
  const [hate, setHate] = useState(initHate);
  const [selectedHate, setSelectedHate] = useState(false);

  const onPressLike = () => {
    // 좋아요 토클
    if (selectedLike) {
      setLike(like - 1);
      //update like-1
      setSelectedLike(false);
    } else {
      setLike(like + 1);
      //update like+1
      setSelectedLike(true);
    }
    // 싫어요 언체크
    setSelectedHate(false);

    // 싫어요는 원래 값으로 초기화
    setHate(initHate);
  };

  const onPressHate = () => {
    // 싫어요 토클
    if (selectedHate) {
      setHate(hate - 1);
      setSelectedHate(false);
    } else {
      setHate(hate + 1);
      setSelectedHate(true);
    }
    // 좋아요 언체크
    setSelectedLike(false);

    // 좋아요는 원래 값으로 초기화
    setLike(initLike);
  };

  const createdAt = formatDaysAgo(created_at);

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
            <Text style={styles.header_text}>{createdAt}</Text>
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
              <Text style={{fontSize: 11, marginLeft: -10}}>{like}</Text>
              <IconButton
                icon={selectedHate ? 'thumb-down' : 'thumb-down-outline'}
                size={18}
                onPress={onPressHate}
              />
              <Text style={{fontSize: 11, marginLeft: -10}}>{hate}</Text>
            </View>
            <View style={styles.footer_right}>
              <Pressable
                style={({pressed}) => pressed && styles.pressed}
                onPress={() => onVisibleModify(commentId)}>
                <Text style={styles.buttonText}>수정</Text>
              </Pressable>
              <Pressable
                style={({pressed}) => pressed && styles.pressed}
                onPress={() => onVisibleRemove(commentId)}>
                <Text style={styles.buttonText}>삭제</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </React.Fragment>
  );
}

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

export default CommentItem;
