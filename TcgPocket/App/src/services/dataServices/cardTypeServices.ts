import { createAsyncThunk } from '@reduxjs/toolkit';
import { OptionItemDto, PagedResult, Response } from '../../types/shared';
import {
  CardTypeDto,
  CardTypeFilterDto,
  CardTypeGetDto,
} from '../../types/card-types';
import { apiCall } from '../helpers/apiCall';
import { apiRoutes } from '../../routes/Index';

export type CardTypeServices = typeof CardTypeServices;

export const CardTypeServices = {
  getAll: async () => {
    return await apiCall<CardTypeGetDto[]>({
      method: 'GET',
      endpoint: apiRoutes.cardTypes,
    });
  },

  getAllFiltered: async (params?: CardTypeFilterDto) => {
    return await apiCall<PagedResult<CardTypeGetDto>>({
      method: 'GET',
      endpoint: `${apiRoutes.cardTypes}/paginated`,
      params: params,
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

  getOptions: async () => {
    return await apiCall({
      method: 'GET',
      endpoint: `${apiRoutes.cardTypes}/options`,
    });
  },

  getOptionsByGameId: async (gameId: number) => {
    return await apiCall({
      method: 'PUT',
      endpoint: `${apiRoutes.cardTypes}/options/${gameId}`,
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

export const getAllFilteredCardTypes = createAsyncThunk<
  Response<PagedResult<CardTypeGetDto>>,
  CardTypeFilterDto,
  { rejectValue: Response<PagedResult<CardTypeGetDto>> }
>('getAllPagedCardTypes', async (filter) => {
  return await CardTypeServices.getAllFiltered(filter);
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

export const getOptions = createAsyncThunk<
  Response<OptionItemDto>,
  void,
  { rejectValue: Response<OptionItemDto> }
>('getOptions', async () => {
  return await CardTypeServices.getOptions();
});

export const getOptionsByGameId = createAsyncThunk<
  Response<OptionItemDto>,
  number,
  { rejectValue: Response<OptionItemDto> }
>('getOptionsByGameId', async (gameId) => {
  return await CardTypeServices.getOptionsByGameId(gameId);
});
