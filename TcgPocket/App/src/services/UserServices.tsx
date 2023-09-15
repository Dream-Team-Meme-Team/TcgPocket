import { createAsyncThunk } from '@reduxjs/toolkit';
import { SignInUserDto, UserCreateDto, UserGetDto } from '../types/users';
import { createAxiosCall } from '../constants/createAxiosCall';
import { apiRoutes } from '../routes';

export const registerUser = createAsyncThunk<UserCreateDto, UserCreateDto>(
  'registerUser',
  async (user) => {
    const { data } = await createAxiosCall<UserCreateDto>(
      'POST',
      `${apiRoutes.users.base}`,
      user
    );
    return data;
  }
);

export const signInUser = createAsyncThunk<SignInUserDto, SignInUserDto>(
  'signInUser',
  async (user) => {
    const { data } = await createAxiosCall<SignInUserDto>(
      'POST',
      `${apiRoutes.users.signIn}`,
      user
    );
    return data;
  }
);

export const getSignedInUser = createAsyncThunk<UserGetDto, void>(
  'getSignedInUser',
  async () => {
    const { data } = await createAxiosCall<UserGetDto>(
      'GET',
      `${apiRoutes.users.signedInUser}`
    );
    return data;
  }
);

export const signOutUser = createAsyncThunk<UserGetDto, void>(
  'signOutUser',
  async () => {
    const { data } = await createAxiosCall<UserGetDto>(
      'POST',
      `${apiRoutes.users.signOut}`
    );
    return data;
  }
);
