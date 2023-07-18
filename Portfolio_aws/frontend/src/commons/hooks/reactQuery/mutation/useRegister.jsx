import {useMutation} from 'react-query';
import {useNavigation} from '@react-navigation/core';
import {register} from '../../../../api/login';
import useInform from '../../useInform';

const useRegister = () => {
  const navigation = useNavigation();
  const inform = useInform();

  return useMutation(register, {
    onSuccess: data => {
      if (data.customResponse) {
        inform({
          title: '오류',
          message: data.message,
        });
        return;
      }
      inform({
        title: '성공',
        message: '회원가입이 성공하였습니다.\n로그인을 수행해주세요.',
      });
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
};

export default useRegister;
