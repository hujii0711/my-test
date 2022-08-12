import {useMutation} from 'react-query';
import {login} from '../api/auth';
import {AuthError} from '../api/types';
import {useNavigation} from '@react-navigation/core';
import {RootStackNavigationProp} from '../screens/types';
import {applyToken} from '../api/client';
import authStorage from '../storages/authStorage';
import useInform from './useInform';
import {useDispatch} from 'react-redux';
import {setAction} from '../redux/users/reducers';

export default function useLogin() {
  const dispatch = useDispatch();
  const navigation = useNavigation<RootStackNavigationProp>();
  const inform = useInform();

  const mutation = useMutation(login, {
    onSuccess: data => {
      dispatch(setAction(data.user)); //setUser(auth.user);
      navigation.pop();
      applyToken(data.jwt);
      authStorage.set(data);
    },
    onError: (error: AuthError) => {
      const message = error.response?.data?.data?.[0]?.messages[0].message ?? '로그인 실패';
      inform({
        title: '오류',
        message,
      });
    },
  });
  return mutation;
}
