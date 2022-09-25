import React, {useState} from 'react';
import {
  Modal,
  Portal,
  Text,
  Provider,
  TextInput,
  IconButton,
} from 'react-native-paper';
import {View} from 'react-native';
import {useQuery} from 'react-query';
import {selectComment} from '../../../api/comments';
import id from 'date-fns/esm/locale/id/index.js';
import {useEffect} from 'react';

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

  const selectedComment = selectCommentQuery.data;
  const [message, setMessage] = useState('');

  useEffect(() => {
    setMessage(selectedComment?.message);
  }, [selectedComment?.message]);

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
              icon="comment-check-outline"
              size={20}
              onPress={() => onSubmit(message)}
            />
            <IconButton icon="close" size={20} onPress={onClose} />
          </View>
        </Modal>
      </Portal>
    </Provider>
  );
};

export default CommentModifyModal;
