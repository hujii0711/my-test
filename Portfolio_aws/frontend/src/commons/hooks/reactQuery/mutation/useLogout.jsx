import {useMutation} from 'react-query';
import {useNavigation, DrawerActions} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {logout} from '../../../../api/login';
import useInform from '../../useInform';
import authStorage from '../../../../commons/storage/authStorage';
import {userDelete} from '../../../../commons/redux/users/reducers';

const useLogout = () => {
  const inform = useInform();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const logoutCallback = () => {
    dispatch(userDelete());
    authStorage.clear('autoId');
    authStorage.clear('autoLogin');
    authStorage.clear('loginType');
  };

  return useMutation(logout, {
    onSuccess: data => {
      logoutCallback();
      inform({
        title: '성공',
        message: '로그아웃 성공',
      });
      navigation.dispatch(DrawerActions.closeDrawer());
    },
    onError: error => {
      inform({
        title: '오류',
        message: '로그아웃 실패',
      });
    },
  });
};

export default useLogout;
