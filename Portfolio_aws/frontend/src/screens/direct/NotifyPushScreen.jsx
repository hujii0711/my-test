import React, {useState} from 'react';
import {Text, View, StyleSheet, Button} from 'react-native';
import axios from 'axios';
import messaging from '@react-native-firebase/messaging';
import Config from 'react-native-config';
import CustomDialog from '../../commons/utils/CustomDialog';

const NotifyPushScreen = () => {
  console.log('NotifyPushScreen 렌더링!!!!!!!!');
  const [visible, setVisible] = useState(false);
  const toggleDialog = () => setVisible(!visible);

  const goToPushMessage = async () => {
    const fcmToken = await messaging().getToken();
    axios
      .post(Config.API_GATEWAY_PUSH_URL, {
        token: fcmToken,
      })
      .then(resp => {
        // 성공한 경우 실행
        console.log('성공한 경우 실행 >>>> resp=======', resp.data);
      })
      .catch(error => {
        // 에러인 경우 실행
        console.log('에러인 경우 실행 >>>> error======', error);
      });
  };

  return (
    <>
      <View style={styles.container}>
        <Text>NotifyPushScreen</Text>
        <Button title="Go to PUSH" onPress={() => goToPushMessage()} />
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
