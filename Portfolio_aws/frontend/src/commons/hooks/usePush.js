import PushNotification from 'react-native-push-notification';
import {ToastAndroid} from 'react-native';
import messaging from '@react-native-firebase/messaging';

export default function usePush() {
  // Foreground 상태인 경우
  messaging().onMessage(async remoteMessage => {
    console.log('onMessage >>>> remoteMessage1=========', remoteMessage);
    ToastAndroid.show(remoteMessage.data.message, ToastAndroid.SHORT);
  });

  // Background, Quit 상태인 경우
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log(
      'setBackgroundMessageHandler >>>> remoteMessage1=========',
      remoteMessage,
    );
    PushNotification.localNotification({
      channelId: 'fujii0711',
      title: '백그라운드 알림',
      message: remoteMessage.data.message,
    });
  });

  PushNotification.configure({
    onRegister: token => {
      console.log('onRegister >>>> token=========', token);
      //디바이스 토큰 DB 저장 로직 필요
    },
    onNotification: notification => {
      console.log('onNotification >>>> notification=========', notification);
      if (notification.channelId === 'fujii0711') {
      }
    },
    onAction: notification => {
      console.log('onAction >>>> notification=========', notification);
      console.log('onAction >>>> action=========', notification.action);
    },

    onRegistrationError: err => {
      console.log('onRegistrationError >>>> err=========', err);
    },

    popInitialNotification: true,
    requestPermissions: true,
    vibrate: true,
    sound: true,
  });

  PushNotification.createChannel(
    {
      channelId: 'fujii0711', // (required)
      channelName: '앱 전반', // (required)
      channelDescription: '앱 실행하는 알림', // (optional) default: undefined.
      soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
      importance: 4, // (optional) default: 4. Int value of the Android notification importance
      vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
    },
    created => console.log(`createChannel fujii0711 returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
  );
}
