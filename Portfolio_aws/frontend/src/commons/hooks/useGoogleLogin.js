import {useMutation} from 'react-query';
import {useNavigation} from '@react-navigation/core';
import {useDispatch} from 'react-redux';
import {googleLogin} from '../../api/login';
import authStorage from '../storage/authStorage';
import useInform from './useInform';
import {userSelect, userDelete} from '../redux/users/reducers';

export default function useLogin() {
  const dispatch = useDispatch();
  const inform = useInform();
  const navigation = useNavigation();

  const mutation = useMutation(googleLogin, {
    onSuccess: async data => {
      if (data) {
        navigation.navigate('MainTab');
      }
    },
    onError: error => {
      console.log('useLogin >>> onError >>> error---------', error);
      dispatch(userDelete());
      inform({
        title: '오류',
        message: '로그인 실패',
      });
    },
  });

  return mutation;
}
