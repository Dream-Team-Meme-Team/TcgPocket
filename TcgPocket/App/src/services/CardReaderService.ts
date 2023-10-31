import axios from 'axios';
import { apiRoutes } from '../routes/Index';
// import { apiCall } from './helpers/apiCall';
import { Response } from '../types/shared';

export type CardReaderService = typeof CardReaderService;

export const CardReaderService = {
  readCard: async (file: any) => {
    const response = axios<Response<string>>({
      method: 'POST',
      url: apiRoutes.readCard,
      data: file,
      headers: {
        Accept: 'text/plain',
        'Content-Type': 'multipart/form-data',
      },
    });

    return (await response).data;
    // return await apiCall<string>({
    //   method: 'POST',
    //   endpoint: apiRoutes.readCard,
    //   data: file,
    // });
  },
};
