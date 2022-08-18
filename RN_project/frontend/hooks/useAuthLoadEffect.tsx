import {useEffect} from 'react';
import {applyToken} from '../api/client';
import authStorage from '../storages/authStorage';
import {useDispatch, useSelector} from 'react-redux';
import {userSelect} from '../redux/users/reducers';
import io from 'socket.io-client';

// const result = {
//   jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9c',
//   user: {
//     id: 3,
//     user_id: 'fujii0711',
//     user_name: 'fujii0711',
//     email: 'test3@daum.net',
//     confirmed: true,
//     password: '1234',
//     provider: 'local',
//     created_at: '2022-07-18T04:41:58.636Z',
//     updated_at: '2022-07-18T04:41:58.636Z',
//   },
// };

const connectSocket = () => {
  console.log('[CLIENT] websocket conntion....');
  // socket.io는 ws와 다르게 http 프로토콜의 사용(ws는 ws 프로토콜)
  // path 옵션은 서버의 path 옵션과 일치해야 통신이 가능하다.
  const socket = io('http://10.0.2.2:4000', {
    path: '/socket.io',
    transports: ['websocket'], // 폴링 방식 말고 처음 부터 웹소켓만 사용하고 싶을 때 사용하는 옵션
  });

  socket.on('newToken', data => {
    applyToken(data);
  });
};

export default function useAuthLoadEffect() {
  //const users = useSelector((state: {users: RootState}) => state.users);
  //userReducer는 combineReducers의 이름
  const {users} = useSelector(({userReducer}) => ({
    users: userReducer.users,
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      // 서버 재기동해도 authStorage.get()의 값을 살아있음
      const auth = await authStorage.get();
      console.log('auth=======', auth);
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
