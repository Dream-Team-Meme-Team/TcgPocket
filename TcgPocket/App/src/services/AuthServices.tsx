import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  SignInUserDto,
  UserCreateDto,
  UserDeleteDto,
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
>('registerUser', async (values) => {
  return await apiCall<UserGetDto>({
    method: 'POST',
    endpoint: apiRoutes.users.base,
    body: values,
  });
});

export const signInUser = createAsyncThunk<
  Response<UserGetDto>,
  SignInUserDto,
  { rejectValue: Response<UserGetDto> }
>('signInUser', async (values) => {
  return await apiCall<UserGetDto>({
    method: 'POST',
    endpoint: apiRoutes.users.signIn,
    body: values,
  });
});

export const getSignedInUser = createAsyncThunk<
  Response<UserGetDto>,
  void,
  { rejectValue: Response<UserGetDto> }
>('getSignedInUser', async () => {
  return await apiCall<UserGetDto>({
    method: 'GET',
    endpoint: apiRoutes.users.signedInUser,
  });
});

export const signOutUser = createAsyncThunk<
  Response<UserGetDto>,
  void,
  { rejectValue: Response<UserGetDto> }
>('signOutUser', async () => {
  return await apiCall<UserGetDto>({
    method: 'POST',
    endpoint: apiRoutes.users.signOut,
  });
});

export const updateUserInformation = createAsyncThunk<
  Response<UserGetDto>,
  UserGetDto,
  { rejectValue: Response<UserGetDto> }
>('updateUserInformation', async (values) => {
  return await apiCall<UserGetDto>({
    method: 'PUT',
    endpoint: `${apiRoutes.users.base}/${values.id}`,
    body: values,
  });
});

export const updateUserPassword = createAsyncThunk<
  Response,
  UserPasswordUpdateDto,
  { rejectValue: Response }
>('updateUserPassword', async (values) => {
  return await apiCall({
    method: 'PUT',
    endpoint: `${apiRoutes.users.updatePassword}`,
    body: values,
  });
});

export const deleteUser = createAsyncThunk<
  Response,
  UserDeleteDto,
  { rejectValue: Response }
>('deleteUser', async (values) => {
  return await apiCall({
    method: 'DELETE',
    endpoint: apiRoutes.users.base,
    body: values,
  });
});
