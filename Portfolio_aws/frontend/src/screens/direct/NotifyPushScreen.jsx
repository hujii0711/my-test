import React, {useState} from 'react';
import {Text, View, StyleSheet, Button} from 'react-native';
import CustomDialog from '../../commons/utils/CustomDialog';
//import {usePush} from '../commons/hooks/usePush';

const NotifyPushScreen = () => {
  const [visible, setVisible] = useState(false);
  const toggleDialog = () => setVisible(!visible);

  return (
    <>
      <View style={styles.container}>
        <Text>NotifyPushScreen</Text>
        <Button
          title="Go to MOVE"
          onPress={() => console.log('MOVE')} //drawer 네비 이므로 push 사용 불가
        />
      </View>
      <Button
        title="Custom colors"
        onPress={toggleDialog}
        style={styles.button}></Button>
      <CustomDialog
        visible={visible}
        close={toggleDialog}
        message="11111111111111111111"
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    margin: 4,
  },
});

export default NotifyPushScreen;
