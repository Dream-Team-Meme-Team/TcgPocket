import { createAsyncThunk } from '@reduxjs/toolkit';
import { SignInUserDto, UserCreateDto, UserGetDto } from '../types/users';
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
