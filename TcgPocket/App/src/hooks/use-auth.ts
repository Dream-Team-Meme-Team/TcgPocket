import { apiRoutes } from '../routes';
import { Response } from '../types/shared';
import { SignInUserDto, UserCreateDto, UserGetDto } from '../types/users';
import axios from 'axios';
import { assignUser } from '../store/userSlice';
import { useMemo } from 'react';
import { dispatch, useAppSelector } from '../store/configureStore';

axios.defaults.withCredentials = true;

export function useAuth() {
  const userFromContext = useAppSelector((state) => state.user.user);

  const signIn = async (values: SignInUserDto) => {
    const { data: response } = await axios.post<Response<UserGetDto>>(
      apiRoutes.users.signIn,
      values
    );

    if (response.hasErrors) {
      return;
    }
  };

  const registerUser = async (values: UserCreateDto) => {
    const { data: response } = await axios.post<Response<UserGetDto>>(
      apiRoutes.users.base,
      values
    );

    if (response.hasErrors) {
      return;
    }

    return response.data;
  };

  const signOut = async () => {
    const { data: response } = await axios.post<Response<UserGetDto>>(
      apiRoutes.users.signOut
    );

    if (response.hasErrors) {
      return;
    }
  };

  const getSignedInUser = async () => {
    const { data: response } = await axios.get<Response<UserGetDto>>(
      apiRoutes.users.signedInUser
    );

    if (response.hasErrors) {
      dispatch(assignUser(undefined));
    }

    dispatch(assignUser(response.data));
  };

  const signedInUser = useMemo(() => {
    const user = userFromContext;
    return user;
  }, [userFromContext]);

  return { signedInUser, signIn, signOut, getSignedInUser, registerUser };
}