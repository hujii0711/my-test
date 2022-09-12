import {useEffect} from 'react';
import {applyToken} from '../../api/client';
import authStorage from '../storage/authStorage';
import {useDispatch} from 'react-redux';
import {userSelect} from '../redux/users/reducers';
import io from 'socket.io-client';

const connectSocket = () => {
  console.log('[CLIENT] websocket conntion....');

  const socket = io('http://10.0.2.2:4000', {
    path: '/socket.io',
    transports: ['websocket'],
  });

  socket.on('newToken', data => {
    applyToken(data);
  });
};

export default function useAuthLoadEffect() {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      // 서버 재기동해도 authStorage.get()의 값을 살아있음
      const auth = await authStorage.get();
      if (!auth) {
        return;
      }
      dispatch(userSelect(auth.user));
      applyToken(auth.jwt);
    })();

    //웹소켓 연결 및 응답 받기
    connectSocket();
  }, [dispatch]);
}
