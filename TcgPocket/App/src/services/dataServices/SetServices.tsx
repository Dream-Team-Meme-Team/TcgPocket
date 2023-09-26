import { createAsyncThunk } from '@reduxjs/toolkit';
import { Response } from '../../types/shared';
import { SetDto, SetGetDto } from '../../types/sets';
import { apiCall } from '../api';
import { apiRoutes } from '../../routes';

export const getAllSets = createAsyncThunk<
  Response<SetGetDto[]>,
  void,
  { rejectValue: Response<SetGetDto[]> }
>('getAllSets', async () => {
  return await apiCall<SetGetDto[]>('GET', apiRoutes.sets);
});

export const createSet = createAsyncThunk<
  Response<void>,
  SetDto,
  { rejectValue: Response<void> }
>('getAllSets', async (newSet) => {
  return await apiCall<void>('POST', apiRoutes.sets, newSet);
});

export const deleteSet = createAsyncThunk<
  Response<void>,
  number,
  { rejectValue: Response<void> }
>('getAllSets', async (id) => {
  return await apiCall<void>('DELETE', `${apiRoutes.sets}/${id}`);
});

export const editSet = createAsyncThunk<
  Response<void>,
  SetGetDto,
  { rejectValue: Response<void> }
>('getAllSets', async (editedSet) => {
  return await apiCall<void>(
    'PUT',
    `${apiRoutes.sets}/${editedSet.id}`,
    editedSet
  );
});
