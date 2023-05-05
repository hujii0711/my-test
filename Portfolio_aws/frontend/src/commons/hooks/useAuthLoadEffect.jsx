import {useEffect} from 'react';
import authStorage from '../storage/authStorage';
import {useDispatch} from 'react-redux';
import {userDelete} from '../redux/users/reducers';
import useAutoLogin from './useAutoLogin';
import {GoogleSignin} from '@react-native-community/google-signin';

export default function useAuthLoadEffect() {
  const dispatch = useDispatch();
  const {mutate: mutateAutoLogin} = useAutoLogin();

  const useEffectCallback = () => {
    dispatch(userDelete());
    authStorage.clear('autoLogin');
    authStorage.clear('autoId');
  };

  // useEffect(() => {
  //   (async () => {
  //     const isSigned = await GoogleSignin.isSignedIn();
  //     const currentUser = await GoogleSignin.getCurrentUser();
  //     const tokens = await GoogleSignin.getTokens();
  //     console.log('isSigned=====', isSigned);
  //     console.log('currentUser=====', currentUser);
  //     console.log('tokens=====', tokens);
  //   })();
  // }, []);

  useEffect(() => {
    (async () => {
      const loginType = await authStorage.get('loginType');
      const autoLogin = await authStorage.get('autoLogin');
      const autoId = await authStorage.get('autoId');
      console.log('useAuthLoadEffect >>>> loginType=====', loginType);
      console.log('useAuthLoadEffect >>>> autoLogin=====', autoLogin);
      console.log('useAuthLoadEffect >>>> autoId=====', autoId);

      if (loginType === 'local') {
        if (autoLogin === 'Y' && autoId) {
          mutateAutoLogin(autoId);
          return;
        }
        useEffectCallback();
      } else if (loginType === 'google') {
        const isSigned = await GoogleSignin.isSignedIn();
        const currentUser = await GoogleSignin.getCurrentUser();
        const tokens = await GoogleSignin.getTokens();
        console.log('isSigned=====', isSigned);
        console.log('currentUser=====', currentUser);
        console.log('tokens=====', tokens);
      }
    })();
  }, []);
}
