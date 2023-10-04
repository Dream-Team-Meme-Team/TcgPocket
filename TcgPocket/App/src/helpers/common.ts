import { error } from '../services/helpers/notification';
import { Error } from '../types/shared';

export const notifyErrors = (errors: Error[]) => {
  errors.forEach((x) => error(x.message));
};
