import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { UserCreateDto, UserGetDto } from '../types/users';
import axios from 'axios';
import { apiRoutes } from '../routes';
import { Response } from './../types/shared';

interface UserState {
  user: UserGetDto | undefined;
  users: UserGetDto[];
}

const initialState: UserState = {
  user: undefined,
  users: [],
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
  name: 'user',
  initialState,
  reducers: {
    setUser(state, { payload }: PayloadAction<UserState['user']>) {
      state.user = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.fulfilled, (state, { payload }) => {
      state.user = payload;
    });
    builder.addCase(getAllUsers.fulfilled, (state, { payload }) => {
      state.users = payload;
    });
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
