import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { UserGetDto } from '../types/users';
import {
  registerUser,
  signInUser,
  signOutUser,
  updateUserInformation,
} from '../services/AuthServices';

type AuthState = {
  user: UserGetDto | undefined | null;
  isLoading: boolean;
};

const initialState: AuthState = {
  user: undefined,
  isLoading: false,
};

export const authSlice = createSlice({
  initialState,
  name: 'auth',
  reducers: {
    setIsLoading(state, { payload }: PayloadAction<AuthState['isLoading']>) {
      state.isLoading = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signInUser.fulfilled, (state, { payload }) => {
      state.user = payload.data;
      state.isLoading = false;
    });
    builder.addCase(signInUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(signOutUser.fulfilled, (state) => {
      state.user = undefined;
    });
    builder.addCase(registerUser.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateUserInformation.fulfilled, (state, { payload }) => {
      state.user = payload.data;
    });
  },
});

export const { setIsLoading } = authSlice.actions;