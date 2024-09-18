import type { Role } from '@/interface/user/login';
import type {  UserState } from '@/interface/user/user';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { getGlobalState } from '@/utils/getGloabal';

const initialState: UserState = {
  ...getGlobalState(),
  noticeCount: 0,
  logged: localStorage.getItem('t') ? true : false,
  email: localStorage.getItem('email') || '',
  role: (localStorage.getItem('email') || '') as Role,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserItem(state, action: PayloadAction<Partial<UserState>>) {
      const { email } = action.payload;

      if (email !== state.email) {
        localStorage.setItem('email', action.payload.email || '');
      }

      Object.assign(state, action.payload);
    },
  },
});

export const { setUserItem } = userSlice.actions;

export default userSlice.reducer;
