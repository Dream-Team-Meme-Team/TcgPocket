/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError } from 'axios';
import { Response } from '../types/shared';

export type HttpMethod = 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH';

export async function createAxiosCall<TResponse>(
  method: HttpMethod,
  endpoint: string,
  data?: any
) {
  const response = axios<Response<TResponse>>({
    method: method,
    url: endpoint,
    data: data,
  });

  return response
    .then((axiosResponse) => axiosResponse.data)
    .catch((error: AxiosError<Response<TResponse>>) => {
      console.error(error.message, error.name, error.request);
      return error.response?.data as Response<TResponse>;
    });
}
