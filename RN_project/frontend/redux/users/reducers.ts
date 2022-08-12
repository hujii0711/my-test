import {ActionType, createAction, createReducer} from 'typesafe-actions';
import {User} from '../../api/types';

const SET = 'user/SET';
const REMOVE = 'user/REMOVE';

export const setAction = createAction(SET, (user: User) => user)();
export const removeAction = createAction(REMOVE)();

interface UserState {
  users: User;
}

const initialState: UserState = {
  users: {
    id: 0,
    user_id: '',
    user_name: '',
    email: '',
    provider: '',
    confirmed: false,
    blocked: false,
    role: 0,
    created_at: '',
    updated_at: '',
  },
};

const actions = {setAction, removeAction};
type UserAction = ActionType<typeof actions>;

const users = createReducer<UserState, UserAction>(initialState, {
  [SET]: (state, action) => ({users: action.payload}),
  [REMOVE]: () => initialState,
});

export default users;
