import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  SignInUserDto,
  UserCreateDto,
  UserDeleteDto,
  UserGetDto,
  UserPasswordUpdateDto,
} from '../types/users';
import { apiCall } from './helpers/api';
import { apiRoutes } from '../routes';
import { Response } from '../types/shared';

export const registerUser = createAsyncThunk<
  Response<UserGetDto>,
  UserCreateDto,
  { rejectValue: Response<UserGetDto> }
>('registerUser', async (values) => {
  return await apiCall<UserGetDto>('POST', apiRoutes.users.base, values);
});

export const signInUser = createAsyncThunk<
  Response<UserGetDto>,
  SignInUserDto,
  { rejectValue: Response<UserGetDto> }
>('signInUser', async (values) => {
  return await apiCall<UserGetDto>('POST', apiRoutes.users.signIn, values);
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
>('updateUserInformation', async (values) => {
  return await apiCall<UserGetDto>(
    'PUT',
    `${apiRoutes.users.base}/${values.id}`,
    values
  );
});

export const updateUserPassword = createAsyncThunk<
  Response,
  UserPasswordUpdateDto,
  { rejectValue: Response }
>('updateUserPassword', async (values) => {
  return await apiCall('PUT', `${apiRoutes.users.updatePassword}`, values);
});

export const deleteUser = createAsyncThunk<
  Response,
  UserDeleteDto,
  { rejectValue: Response }
>('deleteUser', async (values) => {
  return await apiCall('DELETE', apiRoutes.users.base, values);
});
