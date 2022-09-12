import * as React from 'react';
import {Button, Portal, Dialog, Provider, Paragraph} from 'react-native-paper';

const CustomDialog = ({visible, close, message}) => {
  return (
    <Provider>
      <Portal>
        <Dialog
          onDismiss={close}
          style={{
            backgroundColor: '#FEFEFE',
          }}
          visible={visible}>
          <Dialog.Title style={{color: '#3A3A3A'}}>Alert</Dialog.Title>
          <Dialog.Content>
            <Paragraph style={{color: '#3A3A3A'}}>{message}</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button color="#3A3A3A" onPress={close}>
              Ok
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </Provider>
  );
};

export default CustomDialog;
