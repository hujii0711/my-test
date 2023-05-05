import {userDelete} from '../../commons/redux/users/reducers';
import {useDispatch} from 'react-redux';
import {useNavigation, DrawerActions} from '@react-navigation/native';
import {GoogleSignin} from '@react-native-community/google-signin';

export default function useGoogleLogout() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const singOut = async () => {
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
  return singOut;
}
