import {useSelector} from 'react-redux';

export default function useUser() {
  return useSelector(({userReducer}) => ({
    users: userReducer.users,
  }));
}
