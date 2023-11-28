import { apiRoutes } from '../routes/Index';
import {
  DeckDetailDto,
  DeckDisplayDto,
  DeckDto,
  DeckGetDto,
} from '../types/decks';
import { apiCall } from './helpers/apiCall';

type UpdateDeckParams = {
  id: number;
  body: DeckDto;
};

export type DecksService = typeof DecksService;

export const DecksService = {
  getAllDecks: async () => {
    return await apiCall<DeckDetailDto[]>({
      method: 'GET',
      endpoint: apiRoutes.decks,
    });
  },

  getAllDecksByGameId: async (id: number) => {
    return await apiCall<DeckDisplayDto[]>({
      method: 'GET',
      endpoint: `${apiRoutes.decks}/game/${id}`,
    });
  },

  getDeckById: async (id: number) => {
    return await apiCall<DeckGetDto>({
      method: 'GET',
      endpoint: `${apiRoutes.decks}/${id}`,
    });
  },

  createDeck: async (body: DeckDto) => {
    return await apiCall<DeckGetDto>({
      method: 'POST',
      endpoint: apiRoutes.decks,
      data: body,
    });
  },

  updateDeck: async ({ id, body }: UpdateDeckParams) => {
    return await apiCall<DeckGetDto>({
      method: 'PUT',
      endpoint: `${apiRoutes.decks}/${id}?gameId={}`,
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
