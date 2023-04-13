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
import {useQueryClient} from 'react-query';
import com from '../../../commons/utils/common';

const CommentModifyModal = ({_visible, _commentId, _onSubmit, _onClose}) => {
  const queryClient = useQueryClient();

  //comments 캐시 get
  const selectListCommentQuery = queryClient.getQueryData('selectListComment');
  const selectedCommentData = com.findJson(
    selectListCommentQuery,
    'id',
    _commentId,
  );

  const [message, setMessage] = useState('');

  useEffect(() => {
    setMessage(selectedCommentData?.message);
  }, [selectedCommentData?.message]);

  return (
    <Provider>
      <Portal>
        <Modal
          visible={_visible}
          onDismiss={_onClose}
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
              icon="tooltip-check-outline"
              size={20}
              onPress={() => _onSubmit(message)}
            />
            <IconButton icon="undo" size={20} onPress={_onClose} />
          </View>
        </Modal>
      </Portal>
    </Provider>
  );
};

export default CommentModifyModal;
