import { useLocalStorage } from '@mantine/hooks';
import { apiRoutes } from '../routes';
import { Response } from '../types/shared';
import { SignInUserDto, UserGetDto } from '../types/users';
import axios from 'axios';

export function useAuth() {
  const [value, setValue, removeValue] = useLocalStorage<UserGetDto>({
    key: 'user',
  });

  const signIn = async (values: SignInUserDto) => {
    const { data: response } = await axios.post<Response<UserGetDto>>(
      apiRoutes.users.signIn,
      values
    );

    if (response.hasErrors) {
      return;
    }

    setValue(response.data);
  };

  const signOut = async () => {
    const { data: response } = await axios.post<Response<UserGetDto>>(
      apiRoutes.users.signOut
    );

    if (response.hasErrors) {
      return;
    }

    removeValue();
  };

  const getSignedInUser = () => {
    return value;
  };

  return { signIn, signOut, getSignedInUser };
}
