import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiCall } from '../helpers/apiCall';
import { RarityDto, RarityGetDto } from '../../types/rarities';
import { apiRoutes } from '../../routes/index';
import { Response } from '../../types/shared';

export type RarityServices = typeof RarityServices;

export const RarityServices = {
  getAll: async () => {
    return await apiCall<RarityGetDto[]>({
      method: 'GET',
      endpoint: apiRoutes.rarities,
    });
  },

  create: async (values: RarityDto) => {
    return await apiCall<RarityGetDto>({
      method: 'POST',
      endpoint: apiRoutes.rarities,
      data: values,
    });
  },

  delete: async (id: number) => {
    return await apiCall({
      method: 'DELETE',
      endpoint: `${apiRoutes.rarities}/${id}`,
    });
  },

  edit: async (values: RarityGetDto) => {
    return await apiCall({
      method: 'PUT',
      endpoint: `${apiRoutes.rarities}/${values.id}`,
      data: values,
    });
  },
};

export const getAllRarities = createAsyncThunk<
  Response<RarityGetDto[]>,
  void,
  { rejectValue: Response<RarityGetDto[]> }
>('getAllRarities', async () => {
  return await RarityServices.getAll();
});

export const createRarity = createAsyncThunk<
  Response<RarityGetDto>,
  RarityDto,
  { rejectValue: Response<RarityGetDto> }
>('createRarity', async (newRarity) => {
  return await RarityServices.create(newRarity);
});

export const deleteRarity = createAsyncThunk<
  Response<void>,
  number,
  { rejectValue: Response<void> }
>('deleteRarity', async (id) => {
  return await RarityServices.delete(id);
});

export const editRarity = createAsyncThunk<
  Response<void>,
  RarityGetDto,
  { rejectValue: Response<void> }
>('editRarity', async (editedRarity) => {
  return await RarityServices.edit(editedRarity);
});
