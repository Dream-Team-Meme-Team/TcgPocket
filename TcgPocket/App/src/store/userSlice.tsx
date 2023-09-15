import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SignInUserDto, UserGetDto } from '../types/users';
import {
  getSignedInUser,
  registerUser,
  signInUser,
  signOutUser,
} from '../services/UserServices';
import {
  errorGetSignedInUser,
  errorRegisterUser,
  errorSignInUser,
  errorSignOutUser,
} from '../constants/errorNotifications';
import {
  successGetSignedInUser,
  successRegisterUser,
  successSignInUser,
  successSignOutUser,
} from '../constants/successNotifications';

type UserState = {
  user: UserGetDto | undefined;
  signInUser: SignInUserDto | undefined;
  isLoading: boolean;
};

const initialState: UserState = {
  user: undefined,
  signInUser: undefined,
  isLoading: false,
};

export const userSlice = createSlice({
  initialState,
  name: 'user',
  reducers: {
    assignUser(state, { payload }: PayloadAction<UserState['user']>) {
      state.user = payload;
    },
    setIsLoading(state, { payload }: PayloadAction<UserState['isLoading']>) {
      state.isLoading = payload;
    },
  },
  extraReducers: (builder) => {
    /**
     * SIGN IN
     */
    builder.addCase(signInUser.fulfilled, (state, { payload }) => {
      state.signInUser = payload;
      state.isLoading = false;
      successSignInUser();
    });
    builder.addCase(signInUser.rejected, (state) => {
      state.isLoading = false;
      errorSignOutUser();
    });
    builder.addCase(signInUser.pending, (state) => {
      state.isLoading = true;
    });
    /**
     * SIGN OUT
     */
    builder.addCase(signOutUser.fulfilled, (state) => {
      state.signInUser = undefined;
      successSignOutUser();
    });
    builder.addCase(signOutUser.rejected, () => {
      errorSignOutUser();
    });
    /**
     * REGISTER
     */
    builder.addCase(registerUser.fulfilled, (state, { payload }) => {
      state.signInUser = payload;
      state.isLoading = false;
      successRegisterUser();
    });
    builder.addCase(registerUser.rejected, (state) => {
      state.isLoading = false;
      errorRegisterUser();
    });
    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true;
    });
    /**
     * GET SIGNED IN USER
     */
    builder.addCase(getSignedInUser.fulfilled, (state, { payload }) => {
      state.user = payload;
      successGetSignedInUser();
    });
    builder.addCase(getSignedInUser.rejected, () => {
      errorSignInUser();
      errorGetSignedInUser();
    });
  },
});

export const { assignUser, setIsLoading } = userSlice.actions;
