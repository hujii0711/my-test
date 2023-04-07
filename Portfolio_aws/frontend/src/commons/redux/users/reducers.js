import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  users: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userSelect(state, action) {
      state.users = action.payload;
      //state.users.user_name = '김형준';
    },
    userDelete(state) {
      // 업데이트 하는 과정에서 action을 사용하지 않으면 생략 가능
      state.users = null;
    },
  },
});

export default userSlice.reducer;
export const {userSelect, userDelete} = userSlice.actions;
