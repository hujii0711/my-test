import {useMutation} from 'react-query';
import {useDispatch} from 'react-redux';
import {googleLogin} from '../../api/login';
import authStorage from '../storage/authStorage';
import useInform from './useInform';
import {userSelect, userDelete} from '../redux/users/reducers';
import {useNavigation} from '@react-navigation/native';

const useGoogleLogin = () => {
  const dispatch = useDispatch();
  const inform = useInform();
  const navigation = useNavigation();

  const mutation = useMutation(googleLogin, {
    onSuccess: async data => {
      if (data) {
        authStorage.set('loginType', data.login_type);
        dispatch(userSelect(data));
        navigation.navigate('MainTab');
      }
    },
    onError: error => {
      console.log('useGoogleLogin >>> onError >>>> error---------', error);
      authStorage.clear('loginType');
      dispatch(userDelete());
      inform({
        title: '오류',
        message: '로그인 실패',
      });
    },
  });

  return mutation;
};

export default useGoogleLogin;
