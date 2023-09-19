import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  SignInUserDto,
  UserCreateDto,
  UserGetDto,
  UserPasswordUpdateDto,
} from '../types/users';
import { apiCall } from './api';
import { apiRoutes } from '../routes';
import { Response } from '../types/shared';

export const registerUser = createAsyncThunk<
  Response<UserGetDto>,
  UserCreateDto,
  { rejectValue: Response<UserGetDto> }
>('registerUser', async (user) => {
  return await apiCall<UserGetDto>('POST', apiRoutes.users.base, user);
});

export const signInUser = createAsyncThunk<
  Response<UserGetDto>,
  SignInUserDto,
  { rejectValue: Response<UserGetDto> }
>('signInUser', async (user) => {
  return await apiCall<UserGetDto>('POST', apiRoutes.users.signIn, user);
});

export const getSignedInUser = createAsyncThunk<
  Response<UserGetDto>,
  void,
  { rejectValue: Response<UserGetDto> }
>('getSignedInUser', async () => {
  return await apiCall<UserGetDto>('GET', apiRoutes.users.signedInUser);
});

export const signOutUser = createAsyncThunk<
  Response<UserGetDto>,
  void,
  { rejectValue: Response<UserGetDto> }
>('signOutUser', async () => {
  return await apiCall<UserGetDto>('POST', apiRoutes.users.signOut);
});

export const updateUserInformation = createAsyncThunk<
  Response<UserGetDto>,
  UserGetDto,
  { rejectValue: Response<UserGetDto> }
>('updateUserInformation', async (user) => {
  return await apiCall<UserGetDto>(
    'PUT',
    `${apiRoutes.users.base}/${user.id}`,
    user
  );
});

export const updateUserPassword = createAsyncThunk<
  Response<UserGetDto>,
  UserPasswordUpdateDto,
  { rejectValue: Response<UserGetDto> }
>('updateUserPassword', async (user) => {
  return await apiCall<UserGetDto>(
    'PUT',
    `${apiRoutes.users.updatePassword}`,
    user
  );
});

export const deleteUserAccount = createAsyncThunk<
  Response<void>,
  number,
  { rejectValue: Response<void> }
>('deleteUserAccount', async (id) => {
  return await apiCall('DELETE', `${apiRoutes.users.base}/${id}`);
});
