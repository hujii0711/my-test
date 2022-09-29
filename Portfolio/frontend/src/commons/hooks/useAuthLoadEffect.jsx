import {useEffect} from 'react';
import {applyToken} from '../../api/client';
import authStorage from '../storage/authStorage';
import {useDispatch} from 'react-redux';
import {userSelect} from '../redux/users/reducers';
import io from 'socket.io-client';

const connectSocket = () => {
  console.log('[CLIENT] websocket conntion....');

  // 폴링 연결 후, 웹 소켓을 사용할 수 있다면 웹 소켓으로 업그레이드되는 것이다.
  // 웹 소켓을 지원하지 않는 브라우저는 폴링 방식으로, 지원하는 브라우저는 웹 소켓 방식으로 사용 가능한 것이다.
  // 처음부터 웹 소켓만 사용하고 싶으면, 클라이언트에서 연결할 때 다음처럼 transport 옵션을 추가하면 된다.
  const socket = io('http://10.0.2.2:4000/token', {
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
