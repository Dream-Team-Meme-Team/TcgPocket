import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiCall } from '../helpers/api';
import { RarityDto, RarityGetDto } from '../../types/rarities';
import { apiRoutes } from '../../routes';
import { Response } from '../../types/shared';

export const getAllRarities = createAsyncThunk<
  Response<RarityGetDto[]>,
  void,
  { rejectValue: Response<RarityGetDto[]> }
>('getAllRarities', async () => {
  return await apiCall<RarityGetDto[]>('GET', apiRoutes.rarities);
});

export const createRarity = createAsyncThunk<
  Response<RarityGetDto>,
  RarityDto,
  { rejectValue: Response<RarityGetDto> }
>('createRarity', async (newRarity) => {
  return await apiCall<RarityGetDto>('POST', apiRoutes.rarities, newRarity);
});

export const deleteRarity = createAsyncThunk<
  Response<void>,
  number,
  { rejectValue: Response<void> }
>('deleteRarity', async (id) => {
  return await apiCall<void>('DELETE', `${apiRoutes.rarities}/${id}`);
});

export const editRarity = createAsyncThunk<
  Response<void>,
  RarityGetDto,
  { rejectValue: Response<void> }
>('editRarity', async (editedRarity) => {
  return await apiCall<void>(
    'PUT',
    `${apiRoutes.rarities}/${editedRarity.id}`,
    editedRarity
  );
});
