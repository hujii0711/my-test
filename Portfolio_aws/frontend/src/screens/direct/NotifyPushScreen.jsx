import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, Button, ToastAndroid} from 'react-native';
import CustomDialog from '../../commons/utils/CustomDialog';
import PushNotification from 'react-native-push-notification';
import axios from 'axios';
import messaging from '@react-native-firebase/messaging';

const NotifyPushScreen = () => {
  console.log('NotifyPushScreen 렌더링!!!!!!!!');
  const [visible, setVisible] = useState(false);
  const toggleDialog = () => setVisible(!visible);

  const goToPushMessage = async () => {
    const fcmToken = await messaging().getToken();
    console.log('goToPushMessage >>>> fcmToken------', fcmToken);
    axios
      .post(
        `https://hv7bggeql9.execute-api.ap-northeast-2.amazonaws.com/dev/test`,
        {
          token: fcmToken,
        },
      )
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
