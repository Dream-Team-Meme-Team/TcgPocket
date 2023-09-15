import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SignInUserDto, UserGetDto } from '../types/users';
import { NotificationProps, notifications } from '@mantine/notifications';
import {
  getSignedInUser,
  registerUser,
  signInUser,
  signOutUser,
} from '../services/UserServices';

type UserState = {
  user: UserGetDto | undefined;
  signInUser: SignInUserDto | undefined;
};

const initialState: UserState = {
  user: undefined,
  signInUser: undefined,
};

export const userSlice = createSlice({
  initialState,
  name: 'user',
  reducers: {
    assignUser(state, { payload }: PayloadAction<UserState['user']>) {
      state.user = payload;
    },
  },
  extraReducers: (builder) => {
    /**
     * SIGN IN
     */
    builder.addCase(signInUser.fulfilled, (state, { payload }) => {
      state.signInUser = payload;
    });
    builder.addCase(signInUser.rejected, () => {
      console.error('An error occured signing in');

      notifications.show({
        title: 'An error occurred signing in',
        color: 'red',
      } as NotificationProps);
    });
    /**
     * SIGN OUT
     */
    builder.addCase(signOutUser.fulfilled, (state) => {
      state.signInUser = undefined;
    });
    builder.addCase(signOutUser.rejected, () => {
      console.error('An error occured signing out');

      notifications.show({
        title: 'An error occurred signing out',
        color: 'red',
      } as NotificationProps);
    });
    /**
     * REGISTER
     */
    builder.addCase(registerUser.fulfilled, (state, { payload }) => {
      state.signInUser = payload;
    });
    builder.addCase(registerUser.rejected, () => {
      console.error('An error occured registering');

      notifications.show({
        title: 'An error occurred registering',
        color: 'red',
      } as NotificationProps);
    });
    /**
     * GET SIGNED IN USER
     */
    builder.addCase(getSignedInUser.fulfilled, (state, { payload }) => {
      state.user = payload;
    });
    builder.addCase(getSignedInUser.rejected, () => {
      console.error('An error occured staying signed in');

      notifications.show({
        title: 'An error occurred signed in',
        color: 'red',
      } as NotificationProps);
    });
  },
});

export const { assignUser } = userSlice.actions;
