import { createAsyncThunk } from '@reduxjs/toolkit';
import { Response } from '../../types/shared';
import { GameDto, GameGetDto } from '../../types/games';
import { apiCall } from '../helpers/api';
import { apiRoutes } from '../../routes';

export const getAllGames = createAsyncThunk<
    Response<GameGetDto[]>,
    void,
    { rejectValue: Response<GameGetDto[]> }
>('getAllGames', async () => {
    return await apiCall<GameGetDto[]>('GET', apiRoutes.games);
});

export const createGame = createAsyncThunk<
    Response<void>,
    GameDto,
    { rejectValue: Response<void> }
>('createGame', async (newGame) => {
    return await apiCall<void>('POST', `${apiRoutes.games}`, newGame);
});

export const deleteGame = createAsyncThunk<
    Response<void>,
    number,
    { rejectValue: Response<void> }
>('deleteGame', async (id) => {
    return await apiCall<void>('DELETE', `${apiRoutes.games}/${id}`);
});

export const editGame = createAsyncThunk<
    Response<void>,
    GameGetDto,
    { rejectValue: Response<void> }
>('editGame', async (editedGame) => {
    return await apiCall<void>(
        'PUT',
        `${apiRoutes.games}/${editedGame.id}`,
        editedGame
    );
});
