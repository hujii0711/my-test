import {useMutation} from 'react-query';
import {useNavigation} from '@react-navigation/core';
import {useDispatch} from 'react-redux';
import {setHeaderToken} from '../../api/client';
import {login} from '../../api/login';
import authStorage from '../storage/authStorage';
import useInform from './useInform';
import {userSelect, userDelete} from '../redux/users/reducers';

export default function useLogin() {
  const dispatch = useDispatch();
  const inform = useInform();
  const navigation = useNavigation();

  const mutation = useMutation(login, {
    onSuccess: data => {
      if (data) {
        const sessionUser = data.sessionUser;
        const l_token = data.token;
        const l_sessionUser = {...sessionUser, token: l_token};
        dispatch(userSelect(l_sessionUser));
        setHeaderToken(l_token);
        authStorage.set('token', l_token);
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
