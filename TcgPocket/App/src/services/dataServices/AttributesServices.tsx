import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiCall } from '../api';
import { AttributeDto, AttributeGetDto } from '../../types/attributes';
import { apiRoutes } from '../../routes';
import { Response } from '../../types/shared';

export const getAllAttributes = createAsyncThunk<
  Response<AttributeGetDto[]>,
  void,
  { rejectValue: Response<AttributeGetDto[]> }
>('getAllAttributes', async () => {
  return await apiCall<AttributeGetDto[]>('GET', apiRoutes.attributes);
});

export const createAttribute = createAsyncThunk<
  Response<AttributeGetDto>,
  AttributeDto,
  { rejectValue: Response<AttributeGetDto> }
>('createAttribute', async (newAttribute) => {
  return await apiCall<AttributeGetDto>(
    'POST',
    apiRoutes.attributes,
    newAttribute
  );
});

export const deleteAttribute = createAsyncThunk<
  Response<void>,
  number,
  { rejectValue: Response<void> }
>('deleteAttribute', async (id) => {
  return await apiCall<void>('DELETE', `${apiRoutes.attributes}/${id}`);
});

export const editAttribute = createAsyncThunk<
  Response<void>,
  AttributeGetDto,
  { rejectValue: Response<void> }
>('editAttribute', async (editedAttribute) => {
  return await apiCall<void>(
    'PUT',
    `${apiRoutes.attributes}/${editedAttribute.id}`,
    editedAttribute
  );
});
