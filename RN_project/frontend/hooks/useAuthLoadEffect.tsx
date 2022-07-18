import {useEffect} from 'react';
import {applyToken} from '../api/client';
import {useUserState} from '../contexts/UserContext';
import authStorage from '../storages/authStorage';
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
  const [, setUser] = useUserState();

  useEffect(() => {
    const fn = async () => {
      const auth = await authStorage.get();
      console.log('useAuthLoadEffect(authStorage) >>>> authStorage.get=======', auth);
      if (!auth) {
        return;
      }
      setUser(auth.user);
      applyToken(auth.jwt);
    };
    fn();
  }, [setUser]);
}
