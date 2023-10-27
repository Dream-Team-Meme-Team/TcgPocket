import axios, { AxiosError } from 'axios';
import { Response } from '../../types/shared';
import qs from 'qs';

axios.defaults.withCredentials = true;

export type HttpMethod = 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH';

export type ApiCallConfig = {
    method: HttpMethod;
    endpoint: string;
    data?: any;
    params?: any;
};

export async function apiCall<TResult = any>({
    method,
    endpoint,
    data,
    params,
}: ApiCallConfig) {
    const response = axios<Response<TResult>>({
        method: method,
        url: endpoint,
        data: data,
        params: params,
        paramsSerializer: (params) => qs.stringify(params),
    });

    return response
        .then((axiosResponse) => axiosResponse.data)
        .catch((axiosError: AxiosError<Response<TResult>>) => {
            return axiosError.response?.data as Response<TResult>;
        });
}
