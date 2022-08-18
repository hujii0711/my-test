//import {ActionType, createAction, createReducer} from 'typesafe-actions';
//import {User} from '../../api/types';

// const SET = 'user/SET';
// const REMOVE = 'user/REMOVE';

// export const setAction = createAction(SET, (user: User) => user)();
// export const removeAction = createAction(REMOVE)();

// interface UserState {
//   users: User | null;
// }

// const initialState: UserState = {
//   users: null,
//   // users: {
//   //   id: 0,
//   //   user_id: '',
//   //   user_name: '',
//   //   email: '',
//   //   provider: '',
//   //   confirmed: false,
//   //   blocked: false,
//   //   role: 0,
//   //   created_at: '',
//   //   updated_at: '',
//   // },
// };

// const actions = {setAction, removeAction};
// type UserAction = ActionType<typeof actions>;

// const users = createReducer<UserState, UserAction>(initialState, {
//   [SET]: (state, {payload}) => ({users: payload}),
//   [REMOVE]: state => ({users: null}),
// });

// export default users;

//---------------------------교재 예제----------------------------
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {User} from '../../api/types';

interface UserState {
  users: User | null;
}

const initialState: UserState = {
  users: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userSelect(state, action: PayloadAction<User>) {
      state.users = action.payload;
      state.users.user_name = '김형준';
    },
    userDelete(state) {
      // 업데이트 하는 과정에서 action을 사용하지 않으면 생략 가능
      state.users = null;
    },
  },
});

export default userSlice.reducer;
export const {userSelect, userDelete} = userSlice.actions;

//----------------------------git 예제---------------------------
// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// const usersInitialState = {
//   data: []
// };

// const usersSlice = createSlice({
//   name: "users",
//   initialState: usersInitialState,
//   reducers: {
//     addUsers: (state, { payload }) => {
//       state.data = payload;
//     }
//   }
// });

// export default usersSlice.reducer;
// export const { addUsers } = usersSlice.actions;
// export const selectUsers = (state: { users: { data: any } }) =>
//   state.users.data;
