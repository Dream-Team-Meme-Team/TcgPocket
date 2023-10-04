import axios, { AxiosError } from 'axios';
import { Response } from '../types/shared';
axios.defaults.withCredentials = true;

export type HttpMethod = 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH';

export async function apiCall<TResult = any>(
  method: HttpMethod,
  endpoint: string,
  data?: any,
  params?: any
) {
  console.log('params: ', params);

  const response = axios<Response<TResult>>({
    method: method,
    url: endpoint,
    data: data,
    params: params,
  });

  return response
    .then((axiosResponse) => axiosResponse.data)
    .catch((axiosError: AxiosError<Response<TResult>>) => {
      return axiosError.response?.data as Response<TResult>;
    });
}
