import React from 'react';
import {View} from 'react-native';
import {logout, getLoginStatus} from '../api/auth';
import {useNavigation} from '@react-navigation/core';
import MenuItem from '../components/MenuItem';
import {RootStackNavigationProp} from './types';
import {useUserState} from '../contexts/UserContext';
import {clearToken} from '../api/client';
import authStorage from '../storages/authStorage';
import {useMutation} from 'react-query';
import {AuthError} from '../api/types';
import useInform from '../hooks/useInform';

function UserMenuScreen() {
  const navigation = useNavigation<RootStackNavigationProp>();
  const inform = useInform();
  const [user, setUser] = useUserState();

  const onLogin = () => navigation.navigate('Login');
  const onRegister = () => navigation.navigate('Register');
  const onLogout = () => {
    setUser(null);
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
    onError: (error: AuthError) => {
      const message = error.response?.data?.data?.[0]?.messages[0].message ?? '로그인 실패';
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
    onError: (error: AuthError) => {
      const message = error.response?.data?.data?.[0]?.messages[0].message ?? '로그인 실패';
      inform({
        title: '오류',
        message,
      });
    },
  });

  return (
    <View>
      {user ? (
        <>
          <MenuItem name="로그아웃" onPress={onLogout} />
          <MenuItem name="토큰 및 세션 상태" onPress={userStateServer} />
        </>
      ) : (
        <>
          <MenuItem name="로그인" onPress={onLogin} />
          <MenuItem name="회원가입" onPress={onRegister} />
          <MenuItem name="토큰 및 세션 상태" onPress={userStateServer} />
        </>
      )}
    </View>
  );
}

export default UserMenuScreen;
