import axios, { AxiosError } from 'axios';
import { Response } from '../../types/shared';
axios.defaults.withCredentials = true;

export type HttpMethod = 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH';

export type ApiCallConfig = {
    method: HttpMethod;
    endpoint: string;
    data?: any;
    params?: any;
    paramsSerializer?: any;
};

export async function apiCall<TResult = any>({
    method,
    endpoint,
    data,
    params,
    paramsSerializer,
}: ApiCallConfig) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires, no-var
    var qs = require('qs');

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
