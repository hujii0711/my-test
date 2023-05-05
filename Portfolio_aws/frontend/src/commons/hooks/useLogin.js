import {useMutation} from 'react-query';
import {useNavigation} from '@react-navigation/core';
import {useDispatch} from 'react-redux';
import {login, updateSessionExpires} from '../../api/login';
import authStorage from '../storage/authStorage';
import useInform from './useInform';
import {userSelect, userDelete} from '../redux/users/reducers';

export default function useLogin() {
  const dispatch = useDispatch();
  const inform = useInform();
  const navigation = useNavigation();

  const loginCallback = async sessionUser => {
    dispatch(userSelect(sessionUser));
    authStorage.clear('autoId');
    authStorage.clear('loginType');

    const _loginType = await authStorage.get('loginType');
    const _autoId = await authStorage.get('autoId');
    const _autoLogin = await authStorage.get('autoLogin');

    console.log('1loginCallback >>>> loginType=======', _loginType);
    console.log('1loginCallback >>>> autoId=======', _autoId);
    console.log('1loginCallback >>>> autoLogin=======', _autoLogin);
  };

  const autoLoginCallback = async sessionUser => {
    dispatch(userSelect(sessionUser));
    authStorage.set('autoId', sessionUser.id);
    authStorage.set('loginType', sessionUser.login_type);
    // session 테이블 동시성 문제로 req.login 이후 ession.expires 항목 update가 되지 않아서 로그인 성공이후 api 호출
    mutateUpdateSessionExpires();

    const _loginType = await authStorage.get('loginType');
    const _autoId = await authStorage.get('autoId');
    const _autoLogin = await authStorage.get('autoLogin');

    console.log('2autoLoginCallback >>>> loginType=======', _loginType);
    console.log('2autoLoginCallback >>>> autoId=======', _autoId);
    console.log('2autoLoginCallback >>>> autoLogin=======', _autoLogin);
  };

  const mutation = useMutation(login, {
    onSuccess: async data => {
      if (data) {
        const autoLogin = await authStorage.get('autoLogin');
        console.log('login >>> onSuccess1 >>>> data---------', data);
        console.log('login >>> onSuccess >>>> autoLogin---------', autoLogin);
        const sessionUser = data.sessionUser;

        if (autoLogin === 'Y') {
          autoLoginCallback(sessionUser);
        } else {
          loginCallback(sessionUser);
        }
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

  const {mutate: mutateUpdateSessionExpires} = useMutation(
    updateSessionExpires,
    {
      onSuccess: data => {
        console.log(
          'updateSessionExpires >>> onSuccess >>> data---------',
          data,
        );
      },
      onError: error => {
        console.log('useLogin >>> onError >>> error---------', error);
        inform({
          title: '오류',
          message: '로그인 실패',
        });
      },
    },
  );
  return mutation;
}
