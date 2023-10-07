import { apiRoutes } from '../routes';
import {
  CardDetailDto,
  CardDto,
  CardFilterDto,
  CardGetDto,
} from '../types/cards';
import { apiCall } from './api';

type UpdateCardParams = {
  id: number;
  body: CardDto;
};

export type CardsService = typeof CardsService;

export const CardsService = {
  getAllCards: async (params?: CardFilterDto) => {
    return await apiCall<CardDetailDto>({
      method: 'GET',
      endpoint: apiRoutes.cards,
      params: params,
    });
  },

  getCardById: async (id: number) => {
    return await apiCall<CardDetailDto>({
      method: 'GET',
      endpoint: `${apiRoutes.cards}/${id}`,
    });
  },

  createCard: async (body: CardDto) => {
    return await apiCall<CardDetailDto>({
      method: 'POST',
      endpoint: apiRoutes.cards,
      body: body,
    });
  },

  updateCard: async ({ id, body }: UpdateCardParams) => {
    return await apiCall<CardGetDto>({
      method: 'PUT',
      endpoint: `${apiRoutes.cards}/${id}`,
      body: body,
    });
  },

  deleteCard: async (id: number) => {
    return await apiCall({
      method: 'DELETE',
      endpoint: `${apiRoutes.cards}/${id}`,
    });
  },
};
