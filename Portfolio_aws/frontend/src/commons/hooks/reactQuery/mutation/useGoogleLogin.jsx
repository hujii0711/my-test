import {useMutation} from 'react-query';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {userSelect, userDelete} from '../../../redux/users/reducers';
import useInform from '../../useInform';
import authStorage from '../../../storage/authStorage';
import {googleLogin} from '../../../../api/login';

const useGoogleLogin = () => {
  const dispatch = useDispatch();
  const inform = useInform();
  const navigation = useNavigation();

  return useMutation(googleLogin, {
    onSuccess: async data => {
      if (data) {
        authStorage.set('loginType', data.login_type);
        dispatch(userSelect(data));
        navigation.navigate('MainTab');
      }
    },
    onError: error => {
      console.log('useGoogleLogin >>> onError >>> error---------', error);
      authStorage.clear('loginType');
      dispatch(userDelete());
      inform({
        title: '오류',
        message: '로그인 실패',
      });
    },
  });
};

export default useGoogleLogin;
