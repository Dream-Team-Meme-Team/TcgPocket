import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserGetDto } from '../types/users';

type UserState = {
  user: UserGetDto | undefined;
};

const initialState: UserState = {
  user: undefined,
};

export const userSlice = createSlice({
  initialState,
  name: 'user',
  reducers: {
    assignUser(state, { payload }: PayloadAction<UserState['user']>) {
      state.user = payload;
    },
  },
});

export const { assignUser } = userSlice.actions;
