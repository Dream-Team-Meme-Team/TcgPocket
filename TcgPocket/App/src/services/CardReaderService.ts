import { apiRoutes } from '../routes/Index';
import { UserCardGetDto } from '../types/user-cards';
import { apiCall } from './helpers/apiCall';

export type CardReaderService = typeof CardReaderService;

export const CardReaderService = {
  readCard: async (file: ArrayBuffer) => {
    return await apiCall<UserCardGetDto>({
      method: 'POST',
      endpoint: apiRoutes.readCard,
      data: { data: file },
      options: {
        headers: { 'Content-Type': 'multipart/form-data' },
      },
    });
  },
};
