/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from '../../types/shared';
import { error, success } from './notification';

export function responseWrapper(
  response: Response<any> | undefined,
  successMessage?: string
) {
  if (!response) {
    return;
  } else if (response.hasErrors) {
    response.errors.forEach((err) => error(err.message));
  } else if (successMessage) {
    success(successMessage);
  }
}
