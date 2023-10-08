import { apiRoutes } from '../routes';
import { DeckDto, DeckGetDto } from '../types/decks';
import { apiCall } from './api';

type UpdateDeckParams = {
  id: number;
  body: DeckDto;
};

export type DecksService = typeof DecksService;

export const DecksService = {
  getAllDecks: async () => {
    return await apiCall<DeckDto[]>({
      method: 'GET',
      endpoint: apiRoutes.decks,
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
      body: body,
    });
  },

  updateDeck: async ({ id, body }: UpdateDeckParams) => {
    return await apiCall<DeckGetDto>({
      method: 'PUT',
      endpoint: `${apiRoutes.decks}/${id}?gameId={}`,
      body: body,
    });
  },

  deleteDeck: async (id: number) => {
    return await apiCall({
      method: 'DELETE',
      endpoint: `${apiRoutes.decks}/${id}`,
    });
  },
};
