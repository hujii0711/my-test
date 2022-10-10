import {useMutation} from 'react-query';
import {register} from '../../api/login';
import {useNavigation} from '@react-navigation/core';
//import {setHeaderToken} from '../../api/client';
//import authStorage from '../storage/authStorage';
import useInform from './useInform';
//import {useDispatch} from 'react-redux';
//import {userSelect} from '../redux/users/reducers';

export default function useRegister() {
  //const dispatch = useDispatch();
  const navigation = useNavigation();
  const inform = useInform();

  const mutation = useMutation(register, {
    onSuccess: data => {
      navigation.navigation('Login');
      // {
      //   user_name: payload.user_name,
      //   password: hash,
      //   email: payload.email,
      // };
      // 회원가입후 로그인 수행
      //dispatch(userSelect(data.user));
      //navigation.pop();
      //setHeaderToken(data.jwt);
      //authStorage.set(data); //{user:{}, jwt:"XXX"}
    },
    onError: error => {
      const message =
        error.response?.data?.data?.[0]?.messages[0].message ?? '회원가입 실패';
      inform({
        title: '오류',
        message,
      });
    },
  });
  return mutation;
}
