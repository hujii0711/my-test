import {useEffect} from 'react';
import authStorage from '../storage/authStorage';
import {useDispatch} from 'react-redux';
import {userDelete} from '../redux/users/reducers';
import useAutoLogin from './useAutoLogin';
import {deleteHeaderToken} from '../../api/client';

export default function useAuthLoadEffect() {
  const dispatch = useDispatch();

  const {mutate: mutateAutoLogin} = useAutoLogin();

  const useEffectCallback = () => {
    dispatch(userDelete());
    deleteHeaderToken();
    authStorage.clear('autoLogin');
    authStorage.clear('token');
  };

  useEffect(() => {
    (async () => {
      const autoLogin = await authStorage.get('autoLogin');
      const token = await authStorage.get('token');
      console.log('useAuthLoadEffect >>>> autoLogin=========', autoLogin);
      console.log('useAuthLoadEffect >>>> token=========', token);

      if (!autoLogin) {
        useEffectCallback();
        return;
      }

      // 자동 로그인 체크한 경우
      if (autoLogin === 'Y' && token) {
        console.log('자동로그인 !!!');
        mutateAutoLogin(token);

        //자동 로그인 언체크한 경우
      } else if (autoLogin === 'N') {
        console.log('NOT 자동 로그인 !!!!');
        useEffectCallback();
      }
    })();
  }, []);
}
