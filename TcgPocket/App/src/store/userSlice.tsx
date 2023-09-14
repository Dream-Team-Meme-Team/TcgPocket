import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserGetDto } from '../types/users';

const initialState = {
  user: undefined as UserGetDto | undefined,
};

export const userSlice = createSlice({
  initialState,
  name: 'user',
  reducers: {
    assignUser(state, action: PayloadAction<UserGetDto | undefined>) {
      state.user = action.payload;
    },
  },
});

export const { assignUser } = userSlice.actions;
