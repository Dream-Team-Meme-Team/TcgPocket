import { apiRoutes } from '../routes/Index';
import { apiCall } from './helpers/apiCall';

export type CardReaderService = typeof CardReaderService;

export const CardReaderService = {
  readCard: async (file: File) => {
    return await apiCall<string>({
      method: 'POST',
      endpoint: apiRoutes.readCard,
      data: { data: file },
      options: {
        headers: { 'Content-Type': 'multipart/form-data' },
      },
    });
  },
};
