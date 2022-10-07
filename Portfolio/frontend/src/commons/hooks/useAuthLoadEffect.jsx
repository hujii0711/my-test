import {useEffect} from 'react';
import {applyToken} from '../../api/client';
import authStorage from '../storage/authStorage';
import {useDispatch} from 'react-redux';
import {userSelect} from '../redux/users/reducers';

export default function useAuthLoadEffect() {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const auth = await authStorage.get();
      if (!auth) {
        return;
      }
      dispatch(userSelect(auth.user));
      applyToken(auth.jwt);
    })();
  }, [dispatch]);
}
