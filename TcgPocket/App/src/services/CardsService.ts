import { createAsyncThunk } from '@reduxjs/toolkit';
import {
    CardDetailDto,
    CardDisplayDto,
    CardDto,
    CardFilterDto,
    CardGetDto,
} from '../types/cards';
import { PagedResult } from '../types/shared';
import { apiCall } from './helpers/apiCall';
import { Response } from '../types/shared';
import { apiRoutes } from '../routes/Index';

type UpdateCardParams = {
    id: number;
    body: CardDto;
};

export type CardsService = typeof CardsService;

export const CardsService = {
    getAllCards: async (params?: CardFilterDto) => {
        return await apiCall<PagedResult<CardDetailDto>>({
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
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const qs = require('qs');

        console.log('runing get');

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

export const getAllCards = createAsyncThunk<
    Response<PagedResult<CardDetailDto>>,
    CardFilterDto,
    { rejectValue: Response<PagedResult<CardDetailDto>> }
>('getAllCards', async (values) => {
    return await CardsService.getAllCards(values);
});
