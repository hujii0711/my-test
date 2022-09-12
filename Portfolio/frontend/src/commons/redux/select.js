import {useSelector} from 'react-redux';

export function useUserState() {
  const {users} = useSelector(({userReducer}) => ({
    users: userReducer.users,
  }));
  console.log('users=======', users);
  if (!users) {
    throw new Error('useUserState is not used');
  }
  return users;
}
