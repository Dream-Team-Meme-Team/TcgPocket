/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

export type HttpMethod = 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH';

// const axiosCall = (
//   method: HttpMethod,
//   endpoint: string,
//   data?: any
// ) => {
//   return axios({
//     method: method,
//     url: endpoint,
//     data: data,
//   });
// };

export function createAxiosCall<TResultType>(
  method: HttpMethod,
  endpoint: string,
  data?: any
) {
  const response = axios<TResultType>({
    method: method,
    url: endpoint,
    data: data,
  });

  return response;
}

// export const createAxiosCall = (
//   method: HttpMethod,
//   endpoint: string,
//   data?: any
// ) => {
//   const response = createAxiosCall(method, endpoint, data);

//   response.catch((error) => {
//     console.error('An error occurred:', error);

//     notifications.show({
//       title: 'An error occurred while processing your request',
//       color: 'red',
//     } as NotificationProps);

//     return Promise.reject('An error occurred');
//   });

//   return response;
// };
