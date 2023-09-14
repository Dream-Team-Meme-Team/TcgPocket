import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserGetDto } from '../types/users';

type UserState = {
  user: UserGetDto | undefined;

};
const initialState: UserState = {
  user: undefined,
};
export const registerUser = createAsyncThunk<UserGetDto, UserCreateDto>(
  'registerUsers',
  async (user) => {
    const { data } = await axios.post<Response<UserGetDto>>(
      `${apiRoutes.users.base}`,
      user
    );
    return data.data;
  }
);

export const getAllUsers = createAsyncThunk<UserGetDto[], void>(
  'getAllUsers',
  async () => {
    const { data } = await axios({
      url: `${apiRoutes.users.base}`,
      method: 'GET',
    });
    return data;
  }
);

export const userSlice = createSlice({
  initialState,
  name: 'user',
  reducers: {
    assignUser(state, { payload }: PayloadAction<UserState['user']>) {
      state.user = payload;
    },
  },
});

export const { assignUser } = userSlice.actions;
