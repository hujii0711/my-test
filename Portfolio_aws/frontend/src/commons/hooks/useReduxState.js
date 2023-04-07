import {useSelector} from 'react-redux';

export const useUser = () => {
  const select = useSelector(({userReducer}) => ({
    users: userReducer.users,
  }));

  return select.users;
};
