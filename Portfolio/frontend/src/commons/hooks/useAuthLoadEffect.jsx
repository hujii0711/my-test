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
      // 리덕스 변경
      dispatch(userSelect(auth.user));
      // AsyncStotage 토큰 변경
      applyToken(auth.jwt);
    })();
  }, [dispatch]);
}
