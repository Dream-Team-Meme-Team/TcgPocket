import { createAsyncThunk } from '@reduxjs/toolkit';
import { Response } from '../../types/shared';
import { CardTypeDto, CardTypeGetDto } from '../../types/card-types';
import { apiCall } from '../api';
import { apiRoutes } from '../../routes';

export const getAllCardTypes = createAsyncThunk<
  Response<CardTypeGetDto[]>,
  void,
  { rejectValue: Response<CardTypeGetDto[]> }
>('getAllCardTypes', async () => {
  return await apiCall<CardTypeGetDto[]>('GET', apiRoutes.cardTypes);
});

export const createCardType = createAsyncThunk<
  Response<CardTypeGetDto>,
  CardTypeDto,
  { rejectValue: Response<CardTypeGetDto> }
>('createCardType', async (newCardType) => {
  return await apiCall<CardTypeGetDto>(
    'POST',
    apiRoutes.cardTypes,
    newCardType
  );
});

export const deleteCardType = createAsyncThunk<
  Response<void>,
  number,
  { rejectValue: Response<void> }
>('deleteCardType', async (id) => {
  return await apiCall<void>('DELETE', `${apiRoutes.cardTypes}/${id}`);
});

export const editCardType = createAsyncThunk<
  Response<void>,
  CardTypeGetDto,
  { rejectValue: Response<void> }
>('editCardType', async (editedCardType) => {
  return await apiCall<void>(
    'PUT',
    `${apiRoutes.cardTypes}/${editedCardType.id}`,
    editedCardType
  );
});
