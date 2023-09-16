import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SignInUserDto, UserGetDto } from '../types/users';
import {
  getSignedInUser,
  registerUser,
  signInUser,
  signOutUser,
} from '../services/AuthServices';
import { notification } from '../services/notification';

const { error, success } = notification();

type AuthState = {
  user: UserGetDto | undefined;
  signInUser: SignInUserDto | undefined;
  isLoading: boolean;
};

const initialState: AuthState = {
  user: undefined,
  signInUser: undefined,
  isLoading: false,
};

export const authSlice = createSlice({
  initialState,
  name: 'auth',
  reducers: {
    assignUser(state, { payload }: PayloadAction<AuthState['user']>) {
      state.user = payload;
    },
    setIsLoading(state, { payload }: PayloadAction<AuthState['isLoading']>) {
      state.isLoading = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signInUser.fulfilled, (state, { payload }) => {
      state.signInUser = payload;
      state.isLoading = false;
      success('Successfully logged in.');
    });
    builder.addCase(signInUser.rejected, (state) => {
      state.isLoading = false;
      error('Error signing in.');
    });
    builder.addCase(signInUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(signOutUser.fulfilled, (state) => {
      state.signInUser = undefined;
      success('Successfully signed out.');
    });
    builder.addCase(signOutUser.rejected, () => {
      error('Error signing out.');
    });
    builder.addCase(registerUser.fulfilled, (state, { payload }) => {
      state.signInUser = payload;
      state.isLoading = false;
      success('Successfully registered.');
    });
    builder.addCase(registerUser.rejected, (state) => {
      state.isLoading = false;
      error('Error registering.');
    });
    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getSignedInUser.fulfilled, (state, { payload }) => {
      state.user = payload;
      success('Successfully signed in.');
    });
    builder.addCase(getSignedInUser.rejected, () => {
      error('Error signing in.');
    });
  },
});

export const { assignUser, setIsLoading } = authSlice.actions;
