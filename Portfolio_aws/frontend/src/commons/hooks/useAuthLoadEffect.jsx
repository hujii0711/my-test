import {useEffect} from 'react';
import authStorage from '../storage/authStorage';
import {useDispatch} from 'react-redux';
import {userDelete} from '../redux/users/reducers';
import useAutoLogin from './useAutoLogin';
import {GoogleSignin} from '@react-native-community/google-signin';
import useGoogleLogin from './useGoogleLogin';

const useAuthLoadEffect = () => {
  const dispatch = useDispatch();
  const {mutate: mutateGoogleLogin} = useGoogleLogin();
  const {mutate: mutateAutoLogin} = useAutoLogin();

  const useEffectCallback = loginType => {
    if (loginType === 'local') {
      dispatch(userDelete());
      authStorage.clear('autoLogin');
      authStorage.clear('autoId');
    } else if (loginType === 'google') {
      dispatch(userDelete());
    }
  };

  useEffect(() => {
    (async () => {
      const loginType = await authStorage.get('loginType');
      const autoLogin = await authStorage.get('autoLogin');
      const autoId = await authStorage.get('autoId');

      if (loginType === 'local') {
        if (autoLogin === 'Y' && autoId) {
          mutateAutoLogin(autoId);
          return;
        }
        useEffectCallback(loginType);
      } else if (loginType === 'google') {
        const isSigned = await GoogleSignin.isSignedIn();

        if (isSigned) {
          const currentUser = await GoogleSignin.getCurrentUser();
          const googleId = currentUser.user.id;
          mutateGoogleLogin({googleId});
          return;
        }
        useEffectCallback(loginType);
      }
    })();
  }, []);
};

export default useAuthLoadEffect;
