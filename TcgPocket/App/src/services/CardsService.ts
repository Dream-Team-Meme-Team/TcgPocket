import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiRoutes } from '../routes';
import {
    CardDetailDto,
    CardDisplayDto,
    CardDto,
    CardFilterDto,
    CardGetDto,
} from '../types/cards';
import { PagedResult } from '../types/shared';
import { apiCall } from './helpers/api';
import { Response } from '../types/shared';

type UpdateCardParams = {
    id: number;
    body: CardDto;
};

export type CardsService = typeof CardsService;

export const CardsService = {
    getAllCards: async (params?: CardFilterDto) => {
        return await apiCall<CardDetailDto[]>({
            method: 'GET',
            endpoint: apiRoutes.cards,
            params: params,
        });
    },

    getCardById: async (id: number) => {
        return await apiCall<CardDetailDto>({
            method: 'GET',
            endpoint: `${apiRoutes.cards}/${id}`,
        });
    },

    getUserInventory: async (params?: CardFilterDto) => {
        return await apiCall<PagedResult<CardDisplayDto>>({
            method: 'GET',
            endpoint: `${apiRoutes.cards}/inventory`,
            params: params,
        });
    },

    createCard: async (body: CardDto) => {
        return await apiCall<CardDetailDto>({
            method: 'POST',
            endpoint: apiRoutes.cards,
            data: body,
        });
    },

    updateCard: async ({ id, body }: UpdateCardParams) => {
        return await apiCall<CardGetDto>({
            method: 'PUT',
            endpoint: `${apiRoutes.cards}/${id}`,
            data: body,
        });
    },

    deleteCard: async (id: number) => {
        return await apiCall({
            method: 'DELETE',
            endpoint: `${apiRoutes.cards}/${id}`,
        });
    },
};

export const getUserInventory = createAsyncThunk<
    Response<PagedResult<CardDisplayDto>>,
    CardFilterDto,
    { rejectValue: Response<PagedResult<CardDisplayDto>> }
>('getUserInventory', async (values) => {
    return await CardsService.getUserInventory(values);
});
