import {useMutation} from 'react-query';
import {register} from '../api/auth';
import {AuthError} from '../api/types';
import {useNavigation} from '@react-navigation/core';
import {RootStackNavigationProp} from '../screens/types';
import {applyToken} from '../api/client';
import authStorage from '../storages/authStorage';
import useInform from './useInform';
import {useDispatch} from 'react-redux';
import {userSelect} from '../redux/users/reducers';

export default function useRegister() {
  const dispatch = useDispatch();
  const navigation = useNavigation<RootStackNavigationProp>();
  const inform = useInform();

  const mutation = useMutation(register, {
    onSuccess: data => {
      dispatch(userSelect(data.user));
      navigation.pop();
      applyToken(data.jwt);
      authStorage.set(data);
    },
    onError: (error: AuthError) => {
      console.log(error.response?.data);
      const message = error.response?.data?.data?.[0]?.messages[0].message ?? '회원가입 실패';
      inform({
        title: '오류',
        message,
      });
    },
  });
  return mutation;
}