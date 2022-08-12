import {useEffect} from 'react';
import {applyToken} from '../api/client';
import authStorage from '../storages/authStorage';
import {useSelector, useDispatch} from 'react-redux';
import {setAction} from '../redux/users/reducers';
import {User} from '../api/types';
//import io from 'socket.io-client';

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
export default function useAuthLoadEffect() {
  const users = useSelector((state: {users: User}) => state.users);
  console.log('useAuthLoadEffect >>>> users====', users);

  const dispatch = useDispatch();

  useEffect(() => {
    const fn = async () => {
      const auth = await authStorage.get();
      console.log('useAuthLoadEffect(authStorage) >>>> authStorage.get=======', auth);
      if (!auth) {
        return;
      }
      dispatch(setAction(auth.user)); //setUser(auth.user);
      applyToken(auth.jwt);
    };

    // const socket = io('http://localhost:4000/', {
    //   path: '/socket.io',
    //   transports: ['websocket'],
    // });

    // socket.on('news', function (data) {
    //   console.log(data);
    //   socket.emit('reply', 'Hello Node.JS');
    // });

    // socket.emit('roomjoin', '');
    fn();
  }, [users]); //setUser
}
