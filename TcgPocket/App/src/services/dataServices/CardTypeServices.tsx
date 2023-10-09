import { createAsyncThunk } from '@reduxjs/toolkit';
import { Response } from '../../types/shared';
import { CardTypeDto, CardTypeGetDto } from '../../types/card-types';
import { apiCall } from '../helpers/api';
import { apiRoutes } from '../../routes';

export type CardTypeServices = typeof CardTypeServices;

export const CardTypeServices = {
  getAll: async () => {
    return await apiCall<CardTypeGetDto[]>({
      method: 'GET',
      endpoint: apiRoutes.cardTypes,
    });
  },

  create: async (values: CardTypeDto) => {
    return await apiCall<CardTypeGetDto>({
      method: 'POST',
      endpoint: apiRoutes.cardTypes,
      data: values,
    });
  },

  delete: async (id: number) => {
    return await apiCall({
      method: 'DELETE',
      endpoint: `${apiRoutes.cardTypes}/${id}`,
    });
  },

  edit: async (values: CardTypeGetDto) => {
    return await apiCall({
      method: 'PUT',
      endpoint: `${apiRoutes.cardTypes}/${values.id}`,
      data: values,
    });
  },
};

export const getAllCardTypes = createAsyncThunk<
  Response<CardTypeGetDto[]>,
  void,
  { rejectValue: Response<CardTypeGetDto[]> }
>('getAllCardTypes', async () => {
  return await CardTypeServices.getAll();
});

export const createCardType = createAsyncThunk<
  Response<CardTypeGetDto>,
  CardTypeDto,
  { rejectValue: Response<CardTypeGetDto> }
>('createCardType', async (values) => {
  return await CardTypeServices.create(values);
});

export const deleteCardType = createAsyncThunk<
  Response<void>,
  number,
  { rejectValue: Response<void> }
>('deleteCardType', async (id) => {
  return await CardTypeServices.delete(id);
});

export const editCardType = createAsyncThunk<
  Response<void>,
  CardTypeGetDto,
  { rejectValue: Response<void> }
>('editCardType', async (editedCardType) => {
  return await CardTypeServices.edit(editedCardType);
});
