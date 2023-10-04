import { createAsyncThunk } from '@reduxjs/toolkit';
import { Response } from '../../types/shared';
import { SetDto, SetGetDto } from '../../types/sets';
import { apiCall } from '../helpers/api';
import { apiRoutes } from '../../routes';

export const getAllSets = createAsyncThunk<
  Response<SetGetDto[]>,
  void,
  { rejectValue: Response<SetGetDto[]> }
>('getAllSets', async () => {
  return await apiCall<SetGetDto[]>('GET', apiRoutes.sets);
});

export const createSet = createAsyncThunk<
  Response<SetGetDto>,
  SetDto,
  { rejectValue: Response<SetGetDto> }
>('createSet', async (newSet) => {
  return await apiCall<SetGetDto>('POST', apiRoutes.sets, newSet);
});

export const deleteSet = createAsyncThunk<
  Response<void>,
  number,
  { rejectValue: Response<void> }
>('deleteSet', async (id) => {
  return await apiCall<void>('DELETE', `${apiRoutes.sets}/${id}`);
});

export const editSet = createAsyncThunk<
  Response<void>,
  SetGetDto,
  { rejectValue: Response<void> }
>('editSet', async (editedSet) => {
  return await apiCall<void>(
    'PUT',
    `${apiRoutes.sets}/${editedSet.id}`,
    editedSet
  );
});
