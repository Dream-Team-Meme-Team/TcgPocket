import { createAsyncThunk } from '@reduxjs/toolkit';
import { Response } from '../../types/shared';
import { SetDto, SetGetDto } from '../../types/sets';
import { apiCall } from '../helpers/apiCall';
import { apiRoutes } from '../../routes/Index';

export type SetServices = typeof SetServices;

export const SetServices = {
  getAllSets: async () => {
    return await apiCall<SetGetDto[]>({
      method: 'GET',
      endpoint: apiRoutes.sets,
    });
  },

  createSet: async (values: SetDto) => {
    return await apiCall<SetGetDto>({
      method: 'POST',
      endpoint: apiRoutes.sets,
      data: values,
    });
  },

  deleteSet: async (id: number) => {
    return await apiCall({
      method: 'DELETE',
      endpoint: `${apiRoutes.sets}/${id}`,
    });
  },

  editSet: async (values: SetGetDto) => {
    return await apiCall({
      method: 'PUT',
      endpoint: `${apiRoutes.sets}/${values.id}`,
      data: values,
    });
  },
};

export const getAllSets = createAsyncThunk<
  Response<SetGetDto[]>,
  void,
  { rejectValue: Response<SetGetDto[]> }
>('getAllSets', async () => {
  return await SetServices.getAllSets();
});

export const createSet = createAsyncThunk<
  Response<SetGetDto>,
  SetDto,
  { rejectValue: Response<SetGetDto> }
>('createSet', async (newSet) => {
  return await SetServices.createSet(newSet);
});

export const deleteSet = createAsyncThunk<
  Response<void>,
  number,
  { rejectValue: Response<void> }
>('deleteSet', async (id) => {
  return await SetServices.deleteSet(id);
});

export const editSet = createAsyncThunk<
  Response<void>,
  SetGetDto,
  { rejectValue: Response<void> }
>('editSet', async (editedSet) => {
  return await SetServices.editSet(editedSet);
});
