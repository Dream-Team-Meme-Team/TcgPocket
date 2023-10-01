/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError } from 'axios';
import { Response } from '../../types/shared';
axios.defaults.withCredentials = true;

export type HttpMethod = 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH';

export async function apiCall<TResult>(
  method: HttpMethod,
  endpoint: string,
  data?: any
) {
  const response = axios<Response<TResult>>({
    method: method,
    url: endpoint,
    data: data,
  });

  return response
    .then((axiosResponse) => axiosResponse.data)
    .catch((axiosError: AxiosError<Response<TResult>>) => {
      return axiosError.response?.data as Response<TResult>;
    });
}
