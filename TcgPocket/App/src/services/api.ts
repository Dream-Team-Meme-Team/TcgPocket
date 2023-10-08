import axios, { AxiosError } from 'axios';
import { Response } from '../types/shared';
axios.defaults.withCredentials = true;

export type HttpMethod = 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH';

type ApiCallParameters = {
  method: HttpMethod;
  endpoint: string;
  body?: any;
  params?: any;
};

export async function apiCall<TResult = any>({
  method,
  endpoint,
  body,
  params,
}: ApiCallParameters) {
  const response = axios<Response<TResult>>({
    method: method,
    url: endpoint,
    data: body,
    params: params,
  });

  return response
    .then((axiosResponse) => axiosResponse.data)
    .catch((axiosError: AxiosError<Response<TResult>>) => {
      return axiosError.response?.data as Response<TResult>;
    });
}
