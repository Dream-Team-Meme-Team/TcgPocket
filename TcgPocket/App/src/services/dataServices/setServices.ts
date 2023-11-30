import { createAsyncThunk } from '@reduxjs/toolkit';
import { OptionItemDto, PagedResult, Response } from '../../types/shared';
import { SetDto, SetFilterDto, SetGetDto } from '../../types/sets';
import { apiCall } from '../helpers/apiCall';
import { apiRoutes } from '../../routes/index';

export type SetServices = typeof SetServices;

export const SetServices = {
  getAllSets: async () => {
    return await apiCall<SetGetDto[]>({
      method: 'GET',
      endpoint: apiRoutes.sets,
    });
  },

  getAllFiltered: async (params?: SetFilterDto) => {
    return await apiCall<PagedResult<SetGetDto>>({
      method: 'GET',
      endpoint: `${apiRoutes.sets}/paginated`,
      params: params,
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

  getOptions: async () => {
    return await apiCall({
      method: 'GET',
      endpoint: `${apiRoutes.sets}/options`,
    });
  },

  getOptionsByGameId: async (gameId: number) => {
    return await apiCall({
      method: 'PUT',
      endpoint: `${apiRoutes.sets}/options/${gameId}`,
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

export const getAllFilteredSets = createAsyncThunk<
  Response<PagedResult<SetGetDto>>,
  SetFilterDto,
  { rejectValue: Response<PagedResult<SetGetDto>> }
>('getAllPagedSets', async (filter) => {
  return await SetServices.getAllFiltered(filter);
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

export const getOptions = createAsyncThunk<
  Response<OptionItemDto[]>,
  void,
  { rejectValue: Response<OptionItemDto[]> }
>('getOptions', async () => {
  return await SetServices.getOptions();
});

export const getOptionsByGameId = createAsyncThunk<
  Response<OptionItemDto[]>,
  number,
  { rejectValue: Response<OptionItemDto[]> }
>('getOptionsByGameId', async (gameId) => {
  return await SetServices.getOptionsByGameId(gameId);
});
