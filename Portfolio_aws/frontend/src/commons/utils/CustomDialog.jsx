import * as React from 'react';
import {Button, Portal, Dialog, Provider, Paragraph} from 'react-native-paper';

const CustomDialog = ({
  _visible,
  _title,
  _message,
  _confirmText,
  _onConfirm,
  _onClose,
}) => {
  return (
    <Provider>
      <Portal>
        <Dialog
          onDismiss={_onClose}
          style={{
            backgroundColor: '#FEFEFE',
          }}
          visible={_visible}>
          <Dialog.Title style={{color: '#3A3A3A'}}>{_title}</Dialog.Title>
          <Dialog.Content>
            <Paragraph style={{color: '#3A3A3A'}}>{_message}</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button color="#3A3A3A" onPress={_onConfirm}>
              {_confirmText}
            </Button>
            <Button color="#3A3A3A" onPress={_onClose}>
              취소
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </Provider>
  );
};

export default CustomDialog;

// import * as React from 'react';
// import { View } from 'react-native';
// import { Button, Paragraph, Dialog, Portal, Provider } from 'react-native-paper';

// const MyComponent = () => {
//   const [visible, setVisible] = React.useState(false);

//   const showDialog = () => setVisible(true);

//   const hideDialog = () => setVisible(false);

//   return (
//     <Provider>
//       <View>
//         <Button onPress={showDialog}>Show Dialog</Button>
//         <Portal>
//           <Dialog visible={visible} onDismiss={hideDialog}>
//             <Dialog.Title>Alert</Dialog.Title>
//             <Dialog.Content>
//               <Paragraph>This is simple dialog</Paragraph>
//             </Dialog.Content>
//             <Dialog.Actions>
//               <Button onPress={hideDialog}>Done</Button>
//             </Dialog.Actions>
//           </Dialog>
//         </Portal>
//       </View>
//     </Provider>
//   );
// };

// export default MyComponent;
