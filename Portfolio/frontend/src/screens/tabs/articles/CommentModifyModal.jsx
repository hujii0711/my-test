import * as React from 'react';
import {
  Modal,
  Portal,
  Text,
  Button,
  Provider,
  TextInput,
} from 'react-native-paper';
import {View} from 'react-native';

const MyComponent = () => {
  const [visible, setVisible] = React.useState(false);
  const [text, setText] = React.useState('');

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 20};

  return (
    <Provider>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}>
          <Text>댓글 추가</Text>
          <TextInput
            label="Email"
            value={text}
            onChangeText={text => setText(text)}
          />
          <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
            <Button
              mode="text"
              icon="archive-cog-outline"
              onPress={() => console.log('Pressed')}
              color="#3a3a3a"
              style={{
                borderRadius: 5,
                padding: 0,
                marginHorizontal: 5,
              }}
              labelStyle={{fontWeight: 'bold', fontSize: 12}}>
              수정
            </Button>
            <Button
              mode="text"
              icon="archive-cog-outline"
              onPress={() => console.log('Pressed')}
              color="#3a3a3a"
              style={{
                borderRadius: 5,
                padding: 0,
                marginHorizontal: 5,
              }}
              labelStyle={{fontWeight: 'bold', fontSize: 12}}>
              삭제
            </Button>
          </View>
        </Modal>
      </Portal>
      <Button style={{marginTop: 30}} onPress={showModal}>
        Show
      </Button>
    </Provider>
  );
};

export default MyComponent;
