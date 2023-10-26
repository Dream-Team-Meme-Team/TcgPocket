import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  SignInUserDto,
  UserCreateDto,
  UserDeleteDto,
  UserGetDto,
  UserPasswordUpdateDto,
} from '../types/users';
import { apiCall } from './helpers/apiCall';
import { apiRoutes } from '../routes/Index';
import { Response } from '../types/shared';

export type AuthServices = typeof AuthServices;

export const AuthServices = {
  registerUser: async (values: UserCreateDto) => {
    return await apiCall<UserGetDto>({
      method: 'POST',
      endpoint: apiRoutes.users.base,
      data: values,
    });
  },

  signInUser: async (values: SignInUserDto) => {
    return await apiCall({
      method: 'POST',
      endpoint: apiRoutes.users.signIn,
      data: values,
    });
  },

  getSignedInUser: async () => {
    return await apiCall({
      method: 'GET',
      endpoint: apiRoutes.users.signedInUser,
    });
  },

  signOutUser: async () => {
    return await apiCall({ method: 'POST', endpoint: apiRoutes.users.signOut });
  },

  updateUserInformation: async (values: UserGetDto) => {
    return await apiCall<UserGetDto>({
      method: 'PUT',
      endpoint: `${apiRoutes.users.base}/${values.id}`,
      data: values,
    });
  },

  updateUserPassword: async (values: UserPasswordUpdateDto) => {
    return await apiCall({
      method: 'PUT',
      endpoint: `${apiRoutes.users.updatePassword}`,
      data: values,
    });
  },

  deleteUser: async (values: UserDeleteDto) => {
    return await apiCall({
      method: 'DELETE',
      endpoint: `${apiRoutes.users.base}`,
      data: values,
    });
  },
};

export const registerUser = createAsyncThunk<
  Response<UserGetDto>,
  UserCreateDto,
  { rejectValue: Response<UserGetDto> }
>('registerUser', async (values) => {
  return await AuthServices.registerUser(values);
});

export const signInUser = createAsyncThunk<
  Response<UserGetDto>,
  SignInUserDto,
  { rejectValue: Response<UserGetDto> }
>('signInUser', async (values) => {
  return await AuthServices.signInUser(values);
});

export const getSignedInUser = createAsyncThunk<
  Response<UserGetDto>,
  void,
  { rejectValue: Response<UserGetDto> }
>('getSignedInUser', async () => {
  return await AuthServices.getSignedInUser();
});

export const signOutUser = createAsyncThunk<
  Response<UserGetDto>,
  void,
  { rejectValue: Response<UserGetDto> }
>('signOutUser', async () => {
  return await AuthServices.signOutUser();
});

export const updateUserInformation = createAsyncThunk<
  Response<UserGetDto>,
  UserGetDto,
  { rejectValue: Response<UserGetDto> }
>('updateUserInformation', async (values) => {
  return await AuthServices.updateUserInformation(values);
});

export const updateUserPassword = createAsyncThunk<
  Response,
  UserPasswordUpdateDto,
  { rejectValue: Response }
>('updateUserPassword', async (values) => {
  return await AuthServices.updateUserPassword(values);
});

export const deleteUser = createAsyncThunk<
  Response,
  UserDeleteDto,
  { rejectValue: Response }
>('deleteUser', async (values) => {
  return await AuthServices.deleteUser(values);
});
