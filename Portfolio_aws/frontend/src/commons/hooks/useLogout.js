import {useMutation} from 'react-query';
import {logout} from '../../api/login';
import useInform from './useInform';
import {deleteHeaderToken} from '../../api/client';
import authStorage from '../../commons/storage/authStorage';
import {userDelete} from '../../commons/redux/users/reducers';
import {useDispatch} from 'react-redux';
import {useNavigation, DrawerActions} from '@react-navigation/native';

export default function useLogout() {
  const inform = useInform();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const mutation = useMutation(logout, {
    onSuccess: data => {
      dispatch(userDelete());
      deleteHeaderToken();
      authStorage.clear('token');
      authStorage.clear('autoLogin');
      inform({
        title: '성공',
        message: '로그아웃 성공',
      });
      navigation.dispatch(DrawerActions.closeDrawer());
    },
    onError: error => {
      console.log('useLogout >>> onError >>> error---------', error);
      dispatch(userDelete());
      deleteHeaderToken();
      authStorage.clear('token');
      authStorage.clear('autoLogin');
      inform({
        title: '오류',
        message: '로그아웃 실패',
      });
    },
  });
  return mutation;
}
