import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiCall } from '../helpers/apiCall';
import { RarityDto, RarityFilterDto, RarityGetDto } from '../../types/rarities';
import { apiRoutes } from '../../routes/index';
import { OptionItemDto, PagedResult, Response } from '../../types/shared';

export type RarityServices = typeof RarityServices;

export const RarityServices = {
  getAll: async () => {
    return await apiCall<RarityGetDto[]>({
      method: 'GET',
      endpoint: apiRoutes.rarities,
    });
  },

  getAllFiltered: async (params?: RarityFilterDto) => {
    return await apiCall<PagedResult<RarityGetDto>>({
      method: 'GET',
      endpoint: `${apiRoutes.rarities}/paginated`,
      params: params,
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

  getOptions: async () => {
    return await apiCall({
      method: 'GET',
      endpoint: `${apiRoutes.rarities}/options`,
    });
  },

  getOptionsByGameId: async (gameId: number) => {
    return await apiCall({
      method: 'PUT',
      endpoint: `${apiRoutes.rarities}/options/${gameId}`,
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

export const getAllFilteredRarities = createAsyncThunk<
  Response<PagedResult<RarityGetDto>>,
  RarityFilterDto,
  { rejectValue: Response<PagedResult<RarityGetDto>> }
>('getAllPagedRarities', async (filter) => {
  return await RarityServices.getAllFiltered(filter);
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

export const getOptions = createAsyncThunk<
  Response<OptionItemDto>,
  void,
  { rejectValue: Response<OptionItemDto> }
>('getOptions', async () => {
  return await RarityServices.getOptions();
});

export const getOptionsByGameId = createAsyncThunk<
  Response<OptionItemDto>,
  number,
  { rejectValue: Response<OptionItemDto> }
>('getOptionsByGameId', async (gameId) => {
  return await RarityServices.getOptionsByGameId(gameId);
});
