import React, {useState, useEffect} from 'react';
import {
  Modal,
  Portal,
  Text,
  Provider,
  TextInput,
  IconButton,
} from 'react-native-paper';
import {View} from 'react-native';
import {selectComment} from '../../../api/comments';

const CommentModifyModal = ({
  visible,
  commentId,
  articleRef,
  onSubmit,
  onClose,
}) => {
  const selectCommentQuery = useQuery(['selectComment', commentId], () =>
    selectComment(articleRef, commentId),
  );

  const [message, setMessage] = useState(
    selectCommentQuery?.data?.message ?? '',
  );

  return (
    <Provider>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={onClose}
          contentContainerStyle={{
            backgroundColor: '#F2F5F9',
            borderRadius: 20,
            padding: 20,
            flex: 0.5,
          }}>
          <Text>댓글 수정</Text>
          <TextInput
            mode="outlined"
            selectionColor="#c2c2c2" //텍스트 select 되었을 때
            activeOutlineColor="#919191" //editmode
            outlineColor="#919191" // input border
            style={{backgroundColor: '#ffffff', fontSize: 12}}
            value={message}
            onChangeText={text => setMessage(text)}
            multiline
          />
          <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
            <IconButton
              icon="sticker-check-outline"
              size={20}
              onPress={onSubmit}
            />
            <IconButton icon="cancel" size={20} onPress={onClose} />
          </View>
        </Modal>
      </Portal>
    </Provider>
  );
};

export default CommentModifyModal;
