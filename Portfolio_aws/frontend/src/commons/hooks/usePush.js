import PushNotification from 'react-native-push-notification';
import axios from 'axios';

export const usePush = () => {
  // Must be outside of any component LifeCycle (such as `componentDidMount`).
  PushNotification.configure({
    // (optional) Called when Token is generated (iOS and Android)
    onRegister: function (info) {
      console.log('INFO:', info);

      //람다호출 (api Gateway)
      axios
        .post(
          `https://hv7bggeql9.execute-api.ap-northeast-2.amazonaws.com/dev/test`,
          {
            token: info.token,
          },
        )
        .then(resp => {
          // 성공한 경우 실행
          console.log('resp12=======', resp);
        })
        .catch(error => {
          // 에러인 경우 실행
          console.log('error_TEST======', error);
        });

      //{"os": "android", "token": "eMMUIUlWSoeOYcLOixuF66:APA91bHEkFNxsYVnAvuYN0JbHU4X5W_yEwWdyOWHy2yp8QQGtAEfknL48Fdga8hpxSfOHqtl7Np_Ybn8ISErxWfyhZZX91hWD5hPRPx38Nq6zQsmxQ8DUvGsPsd2vAOZfk-9tefiQt1D"}
    },

    // (required) Called when a remote is received or opened, or local notification is opened
    onNotification: function (notification) {
      console.log('NOTIFICATION:', notification);
      // process the notification
    },

    // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
    onAction: function (notification) {
      console.log('ACTION:', notification.action);
      console.log('NOTIFICATION:', notification);

      // process the action
    },

    // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
    onRegistrationError: function (err) {
      console.error(err.message, err);
    },

    // IOS ONLY (optional): default: all - Permissions to register.
    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },

    // Should the initial notification be popped automatically
    // default: true
    popInitialNotification: true,

    /**
     * (optional) default: true
     * - Specified if permissions (ios) and token (android and ios) will requested or not,
     * - if not, you must call PushNotificationsHandler.requestPermissions() later
     * - if you are not using remote notification or do not have Firebase installed, use this:
     *     requestPermissions: Platform.OS === 'ios'
     */
    requestPermissions: true,
  });
};
