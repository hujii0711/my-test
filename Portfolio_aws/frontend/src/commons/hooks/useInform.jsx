import {useCallback} from 'react';
import {Alert, Platform, ToastAndroid} from 'react-native';

const useInform = () => {
  const inform = useCallback(({title, message}) => {
    if (Platform.OS === 'ios') {
      Alert.alert(title ?? '알림', message);
    } else {
      ToastAndroid.show(message, ToastAndroid.LONG);
    }
  }, []);

  return inform;
};

export default useInform;
