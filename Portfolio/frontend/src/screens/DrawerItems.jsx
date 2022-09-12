import * as React from 'react';
import {View, StyleSheet, Pressable} from 'react-native';
import {useNavigation, DrawerActions} from '@react-navigation/native';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import {
  TouchableRipple,
  Text,
  Drawer as DrawerPaper,
  IconButton,
  Avatar,
} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import {useMutation} from 'react-query';
import {logout, getLoginStatus} from '../api/login';
import {clearToken} from '../api/client';
import authStorage from '../commons/storage/authStorage';
import useInform from '../commons/hooks/useInform';
import {userDelete} from '../commons/redux/users/reducers';
import Color from '../commons/style/Color';

const DrawerItems = props => {
  const navigation = useNavigation();
  const inform = useInform();
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(userDelete());
    clearToken();
    authStorage.clear();
    logoutServer();
  };
  const {mutate: logoutServer} = useMutation(logout, {
    onSuccess: data => {
      inform({
        title: '성공',
        message: data.message,
      });
    },
    onError: error => {
      const message =
        error.response?.data?.data?.[0]?.messages[0].message ?? '로그인 실패';
      inform({
        title: '오류',
        message,
      });
    },
  });

  const {mutate: userStateServer} = useMutation(getLoginStatus, {
    onSuccess: data => {
      (async () => {
        const auth = await authStorage.get();
        console.log('userStateServer >>>>>> auth-----', auth);
        console.log('현재 토큰 및 세션 상태::::', data);
      })();
    },
    onError: error => {
      const message =
        error.response?.data?.data?.[0]?.messages[0].message ?? '로그인 실패';
      inform({
        title: '오류',
        message,
      });
    },
  });

  const DrawerMenuData = [
    {
      label: '1. 공유',
      icon: 'share-variant-outline',
      onPress: () => navigation.navigate('ShareScreen'),
    },
    {
      label: '2. 푸시 알림',
      icon: 'bell',
      onPress: () => navigation.navigate('NotifyPushScreen'),
    },
    {
      label: '3. 촬영',
      icon: 'camera',
      onPress: () => navigation.navigate('FilmingScreen'),
    },
    {
      label: '4. 이메일',
      icon: 'email',
      onPress: () => navigation.navigate('SendEmailScreen'),
    },
    {
      label: '5. 달력',
      icon: 'calendar-month',
      onPress: () => navigation.navigate('CalendarScreen'),
    },
    {
      label: '6. QR 코드',
      icon: 'qrcode',
      onPress: () => navigation.navigate('QRCodeScreen'),
    },
    {
      label: '7. MAP',
      icon: 'map-outline',
      onPress: () => navigation.navigate('MapScreen'),
    },
    {
      label: '8. 링크',
      icon: 'link',
      onPress: () => navigation.navigate('LinkScreen'),
    },
    {
      label: '9. 위치 정보',
      icon: 'map-marker',
      onPress: () => navigation.navigate('LocationScreen'),
    },
    {
      label: '10. 음성 인식',
      icon: 'voicemail',
      onPress: () => navigation.navigate('VoiceScreen'),
    },
    {
      label: '11. Alert',
      icon: 'voicemail',
      onPress: () => navigation.navigate('DialogScreen'),
    },
  ];

  return (
    <>
      <DrawerPaper.Section>
        <TouchableRipple onPress={() => navigation.navigate('MainTab')}>
          <Pressable
            style={styles.userInfo}
            android_ripple={{color: Color.red4}}
            onPress={userStateServer}>
            <Avatar.Icon size={50} icon="account" />
            <Text>김형준</Text>
          </Pressable>
        </TouchableRipple>
      </DrawerPaper.Section>
      <DrawerContentScrollView
        alwaysBounceVertical={false}
        style={[
          styles.drawerContent,
          {
            backgroundColor: '#ffffff',
          },
        ]}>
        <DrawerPaper.Section title="Menu">
          {DrawerMenuData.map((props, index) => {
            return <DrawerPaper.Item {...props} key={index} />;
          })}
        </DrawerPaper.Section>
      </DrawerContentScrollView>
      <DrawerPaper.Section>
        <TouchableRipple
          onPress={() => {
            console.log('footer press');
          }}>
          <View style={styles.footer}>
            <IconButton
              icon="account-key"
              size={24}
              onPress={() => navigation.navigate('Login')}
            />
            <IconButton icon="account-lock-open" size={24} onPress={onLogout} />
            <IconButton
              icon="account-plus"
              size={24}
              onPress={() => console.log('Pressed')}
            />
            <IconButton
              icon="account-wrench"
              size={24}
              onPress={() => console.log('Pressed')}
            />
            <IconButton
              icon="close"
              size={24}
              onPress={() => {
                navigation.dispatch(DrawerActions.closeDrawer());
              }}
            />
          </View>
        </TouchableRipple>
      </DrawerPaper.Section>
    </>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },

  userInfo: {
    height: 100,
    backgroundColor: '#d4d4d4',
    justifyContent: 'center',
    alignItems: 'center',
  },

  footer: {
    height: 50,
    flexDirection: 'row',
    backgroundColor: '#d4d4d4',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

export default DrawerItems;
