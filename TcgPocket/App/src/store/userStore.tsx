import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { UserGetDto } from '../types/users';

const initialState = {
  user: undefined as UserGetDto | undefined,
};

const userSlice = createSlice({
  initialState,
  name: 'user',
  reducers: {
    assignUser(state, action: PayloadAction<UserGetDto | undefined>) {
      state.user = action.payload;
    },
  },
});

export const { assignUser } = userSlice.actions;

export const userStore = configureStore(userSlice);

export type UserState = ReturnType<typeof userStore.getState>;
export type UserDispatch = typeof userStore.dispatch;

export const useCounterDispatch: () => UserDispatch = useDispatch;
export const useCounterSelector: TypedUseSelectorHook<UserState> = useSelector;
