import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { Response } from '../../types/shared';
axios.defaults.withCredentials = true;

export type HttpMethod = 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH';

type OtherStuff = Omit<
  AxiosRequestConfig<any>,
  'method' | 'url' | 'params' | 'data'
>;

export type ApiCallConfig = {
  method: HttpMethod;
  endpoint: string;
  data?: any;
  params?: any;
  options?: OtherStuff;
};

/**
 * @param options has all of the other stuff for the axios call
 * @returns happiness for the ``@zoe-klein``
 */
export async function apiCall<TResult = any>({
  method,
  endpoint,
  data,
  params,
  options,
}: ApiCallConfig) {
  const response = axios<Response<TResult>>({
    method: method,
    url: endpoint,
    data: data,
    params: params,
    ...options,
  });

  return response
    .then((axiosResponse) => axiosResponse.data)
    .catch((axiosError: AxiosError<Response<TResult>>) => {
      return axiosError.response?.data as Response<TResult>;
    });
}
