import { createAsyncThunk } from '@reduxjs/toolkit';
import { Response } from '../../types/shared';
import { GameDto, GameGetDto } from '../../types/games';
import { apiCall } from '../helpers/api';
import { apiRoutes } from '../../routes';

export const GameServices = {
  getAllGames: async () => {
    return await apiCall<GameGetDto[]>({
      method: 'GET',
      endpoint: apiRoutes.games,
    });
  },

  createGame: async (values: GameDto) => {
    return await apiCall<void>({
      method: 'POST',
      endpoint: apiRoutes.games,
      data: values,
    });
  },

  deleteGame: async (id: number) => {
    return await apiCall<void>({
      method: 'DELETE',
      endpoint: `${apiRoutes.games}/${id}`,
    });
  },

  editGame: async (values: GameGetDto) => {
    return await apiCall<void>({
      method: 'PUT',
      endpoint: `${apiRoutes.games}/${values.id}`,
      data: values,
    });
  },
};

export const getAllGames = createAsyncThunk<
  Response<GameGetDto[]>,
  void,
  { rejectValue: Response<GameGetDto[]> }
>('getAllGames', async () => {
  return await GameServices.getAllGames();
});

export const createGame = createAsyncThunk<
  Response<void>,
  GameDto,
  { rejectValue: Response<void> }
>('createGame', async (values) => {
  return await GameServices.createGame(values);
});

export const deleteGame = createAsyncThunk<
  Response<void>,
  number,
  { rejectValue: Response<void> }
>('deleteGame', async (id) => {
  return await GameServices.deleteGame(id);
});

export const editGame = createAsyncThunk<
  Response<void>,
  GameGetDto,
  { rejectValue: Response<void> }
>('editGame', async (values) => {
  return await GameServices.editGame(values);
});
