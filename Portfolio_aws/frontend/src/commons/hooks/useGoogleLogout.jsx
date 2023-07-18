import {useDispatch} from 'react-redux';
import {useNavigation, DrawerActions} from '@react-navigation/native';
import {GoogleSignin} from '@react-native-community/google-signin';
import {userDelete} from '../../commons/redux/users/reducers';

const useGoogleLogout = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  return async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
    } catch (err) {
      console.error('useGoogleLogout >>> err ---------', err);
    } finally {
      //authStorage.clear('loginType');
      dispatch(userDelete());
      navigation.dispatch(DrawerActions.closeDrawer());
    }
  };
};

export default useGoogleLogout;
