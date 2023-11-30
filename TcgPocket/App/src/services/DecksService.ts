import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiRoutes } from '../routes/Index';
import {
  DeckCreateDto,
  DeckDetailDto,
  DeckDisplayDto,
  DeckGetDto,
  UpdateDeckParams,
} from '../types/decks';
import { apiCall } from './helpers/apiCall';
import { Response } from '../types/shared';
import { appStore } from '../store/configureStore';

export type DecksService = typeof DecksService;

export const DecksService = {
  getAllDecks: async () => {
    return await apiCall<DeckDetailDto[]>({
      method: 'GET',
      endpoint: apiRoutes.decks,
    });
  },

  getAllDecksForAllGames: async () => {
    return await apiCall<DeckDisplayDto[]>({
      method: 'GET',
      endpoint: `${apiRoutes.decks}/game`,
    });
  },

  getDeckById: async (id: number) => {
    return await apiCall<DeckDetailDto>({
      method: 'GET',
      endpoint: `${apiRoutes.decks}/${id}`,
    });
  },

  createDeck: async (body: DeckCreateDto) => {
    return await apiCall<DeckGetDto>({
      method: 'POST',
      endpoint: apiRoutes.decks,
      data: body,
    });
  },

  updateDeck: async ({ id, body }: UpdateDeckParams) => {
    return await apiCall<DeckDetailDto>({
      method: 'PUT',
      endpoint: `${apiRoutes.decks}/${id}`,
      data: body,
    });
  },

  deleteDeck: async (id: number) => {
    return await apiCall({
      method: 'DELETE',
      endpoint: `${apiRoutes.decks}/${id}`,
    });
  },
};

export const getDeckById = createAsyncThunk<
  Response<DeckDetailDto>,
  number,
  { rejectValue: Response<DeckDetailDto> }
>('getDeckById', async (id) => {
  return await DecksService.getDeckById(id);
});

export const createDeck = createAsyncThunk<
  Response<DeckGetDto>,
  DeckCreateDto,
  { rejectValue: Response<DeckGetDto> }
>('createDeck', async (values) => {
  const games = appStore.getState().data.games;
  const payload = await DecksService.createDeck(values);
  const foundGame = games.find((game) => game.id === values.gameId);

  const data: Response<DeckGetDto> = {
    data: {
      id: payload.data.id,
      name: payload.data.name,
      game: foundGame ?? null,
    },
    errors: payload.errors,
    hasErrors: payload.hasErrors,
  };

  return data;
});

export const updateDeck = createAsyncThunk<
  Response<DeckDetailDto>,
  UpdateDeckParams,
  { rejectValue: Response<DeckDetailDto> }
>('updateDeck', async (values) => {
  return await DecksService.updateDeck(values);
});
