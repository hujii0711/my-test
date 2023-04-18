import {useMutation} from 'react-query';
import {register} from '../../api/login';
import {useNavigation} from '@react-navigation/core';
import useInform from './useInform';

export default function useRegister() {
  const navigation = useNavigation();
  const inform = useInform();

  const mutation = useMutation(register, {
    onSuccess: data => {
      navigation.navigate('Login');
    },
    onError: error => {
      console.log('useRegister >>> onError >>> error---------', error);
      inform({
        title: '오류',
        message: '회원가입 실패',
      });
    },
  });
  return mutation;
}
