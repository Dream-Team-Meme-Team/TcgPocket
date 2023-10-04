import { apiRoutes } from '../routes';
import { CardDetailDto, CardDto, CardGetDto } from '../types/cards';
import { Response } from '../types/shared';
import { apiCall } from './api';

type UpdateCardParams = {
  id: number;
  body: CardDto;
};

export type CardsService = {
  getCardById: (id: number) => Response<CardDetailDto>;
  createCard: (body: CardDto) => Response<CardDetailDto>;
  updateCard: ({ id, body }: UpdateCardParams) => Response<CardGetDto>;
  deleteCard: (id: number) => Response;
};

export const CardsService = {
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
