import * as React from 'react';
import {View} from 'react-native';
import {Button, Paragraph, Dialog, Portal, Provider} from 'react-native-paper';

const DialogScreen = () => {
  const [visible, setVisible] = React.useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  return (
    <Provider>
      <View>
        <Button onPress={showDialog}>Show Dialog</Button>
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>Alert</Dialog.Title>
            <Dialog.Content>
              <Paragraph>
                로그인이 성공했읍니다.로그인이 성공했읍니다.로그인이
                성공했읍니다.로그인이 성공했읍니다.로그인이
                성공했읍니다.로그인이 성공했읍니다.로그인이
                성공했읍니다.로그인이 성공했읍니다.로그인이
                성공했읍니다.로그인이 성공했읍니다.로그인이
                성공했읍니다.로그인이 성공했읍니다.로그인이
                성공했읍니다.로그인이 성공했읍니다.로그인이
                성공했읍니다.로그인이 성공했읍니다.
              </Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog}>확인</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </Provider>
  );
};

export default DialogScreen;
