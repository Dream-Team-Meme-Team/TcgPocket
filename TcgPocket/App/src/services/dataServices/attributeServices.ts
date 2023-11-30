import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiCall } from '../helpers/apiCall';
import {
  AttributeDto,
  AttributeFilterDto,
  AttributeGetDto,
} from '../../types/attributes';
import { apiRoutes } from '../../routes/index';
import { PagedResult, Response } from '../../types/shared';

export type AttributeServices = typeof AttributeServices;

export const AttributeServices = {
  getAll: async () => {
    return await apiCall<AttributeGetDto[]>({
      method: 'GET',
      endpoint: apiRoutes.attributes,
    });
  },

  getAllFiltered: async (params?: AttributeFilterDto) => {
    return await apiCall<PagedResult<AttributeGetDto>>({
      method: 'GET',
      endpoint: `${apiRoutes.attributes}/paginated`,
      params: params,
    });
  },

  create: async (values: AttributeDto) => {
    return await apiCall({
      method: 'POST',
      endpoint: apiRoutes.attributes,
      data: values,
    });
  },

  delete: async (id: number) => {
    return await apiCall({
      method: 'DELETE',
      endpoint: `${apiRoutes.attributes}/${id}`,
    });
  },

  edit: async (values: AttributeGetDto) => {
    return await apiCall({
      method: 'PUT',
      endpoint: `${apiRoutes.attributes}/${values.id}`,
      data: values,
    });
  },
};

export const getAllAttributes = createAsyncThunk<
  Response<AttributeGetDto[]>,
  void,
  { rejectValue: Response<AttributeGetDto[]> }
>('getAllAttributes', async () => {
  return await AttributeServices.getAll();
});

export const getAllFilteredAttributes = createAsyncThunk<
  Response<PagedResult<AttributeGetDto>>,
  AttributeFilterDto,
  { rejectValue: Response<PagedResult<AttributeGetDto>> }
>('getAllPagedAttributes', async (filter) => {
  return await AttributeServices.getAllFiltered(filter);
});

export const createAttribute = createAsyncThunk<
  Response<AttributeGetDto>,
  AttributeDto,
  { rejectValue: Response<AttributeGetDto> }
>('createAttribute', async (newAttribute) => {
  return await AttributeServices.create(newAttribute);
});

export const deleteAttribute = createAsyncThunk<
  Response<void>,
  number,
  { rejectValue: Response<void> }
>('deleteAttribute', async (id) => {
  return await AttributeServices.delete(id);
});

export const editAttribute = createAsyncThunk<
  Response<void>,
  AttributeGetDto,
  { rejectValue: Response<void> }
>('editAttribute', async (editedAttribute) => {
  return await AttributeServices.edit(editedAttribute);
});
