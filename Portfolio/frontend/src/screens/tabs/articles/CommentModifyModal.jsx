import * as React from 'react';
import {
  Modal,
  Portal,
  Text,
  Button,
  Provider,
  TextInput,
  IconButton,
} from 'react-native-paper';
import {View} from 'react-native';

const CommentModifyModal = ({visible, initialMessage, onSubmit, onClose}) => {
  const [message, setMessage] = React.useState('');

  // initialMessage가 변경되면 message 변경
  React.useEffect(() => {
    setMessage(initialMessage ?? '');
  }, [initialMessage]);

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
            onChangeText={setMessage}
            onSubmitEditing={() => {
              onSubmit(message);
              setMessage('');
            }}
            multiline
          />
          <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
            <IconButton
              icon="sticker-check-outline"
              size={20}
              onPress={() => console.log('Pressed')}
            />
            <IconButton
              icon="cancel"
              size={20}
              onPress={() => console.log('Pressed')}
            />
          </View>
        </Modal>
      </Portal>
    </Provider>
  );
};

export default CommentModifyModal;
