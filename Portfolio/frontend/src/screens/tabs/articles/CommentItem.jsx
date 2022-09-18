import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {Avatar, IconButton} from 'react-native-paper';
import {useMutation} from 'react-query';
import {modifyComment, removeComment} from '../../../api/comments';
import CustomDialog from '../../../commons/utils/CustomDialog';
import CommentModifyModal from './CommentModifyModal';
import {formatDaysAgo} from '../../../commons/utils/common';

function CommentItem({
  commentId,
  message,
  created_at,
  username,
  articleRef,
  isMyComment,
}) {
  const [selectedCommentId, setSelectedCommentId] = useState(commentId ?? 0);
  console.log('CommentItem >>>>> commentId=====', commentId);
  const [askDialogVisible, setAskDialogVisible] = useState(false);
  const [commentModifyModalVisible, setCommentModifyModalVisible] =
    useState(false);

  const [like, setLike] = useState(0);
  const [hate, setHate] = useState(0);

  //const createdAt = formatDaysAgo(created_at);

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

  //CustomDialog
  const onVisibleRemove = id => {
    setSelectedCommentId(id);
    setAskDialogVisible(true);
  };

  const onConfirmRemove = () => {
    setAskDialogVisible(false);
    mutateRemoveComment({
      id: selectedCommentId,
    });
  };

  const onCancelRemove = () => {
    setAskDialogVisible(false);
  };

  // //commentModifyModal
  const onVisibleModify = id => {
    setSelectedCommentId(id);
    setCommentModifyModalVisible(true);
  };

  const onSubmitModify = message => {
    setCommentModifyModalVisible(false);
    mutateModifyComment({
      articleRef,
      message,
    });
  };

  const onCancelModify = () => {
    setCommentModifyModalVisible(false);
  };

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
                icon="emoticon-kiss-outline"
                size={18}
                onPress={() => setLike(like + 1)}
              />
              <Text style={{fontSize: 11, marginLeft: -10}}>{like}</Text>
              <IconButton
                icon="emoticon-devil-outline"
                size={18}
                onPress={() => setHate(hate + 1)}
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
