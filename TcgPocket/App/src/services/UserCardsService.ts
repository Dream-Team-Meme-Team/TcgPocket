import { apiRoutes } from '../routes';
import { UserCardDto, UserCardGetDto } from '../types/user-cards';
import { apiCall } from './api';

type UpdateUserCardParams = {
  id: number;
  body: UserCardDto;
};

export type UserCardsService = typeof UserCardsService;

export const UserCardsService = {
  getAllUserCards: async () => {
    return await apiCall<UserCardDto[]>({
      method: 'GET',
      endpoint: apiRoutes.userCards,
    });
  },

  getUserCardById: async (id: number) => {
    return await apiCall<UserCardDto>({
      method: 'GET',
      endpoint: `${apiRoutes.userCards}/${id}`,
    });
  },

  createUserCard: async (body: UserCardDto) => {
    return await apiCall<UserCardDto>({
      method: 'POST',
      endpoint: apiRoutes.userCards,
      body: body,
    });
  },

  updateUserCard: async ({ id, body }: UpdateUserCardParams) => {
    return await apiCall<UserCardGetDto>({
      method: 'PUT',
      endpoint: `${apiRoutes.userCards}/${id}`,
      body: body,
    });
  },

  deleteUserCard: async (id: number) => {
    return await apiCall({
      method: 'DELETE',
      endpoint: `${apiRoutes.userCards}/${id}`,
    });
  },
};
