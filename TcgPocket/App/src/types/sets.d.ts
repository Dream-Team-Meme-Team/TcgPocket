import { Id, PageDto } from './shared';

export type SetDto = {
  name: string;
  gameId: number;
};

export type SetGetDto = Id & SetDto;

export type SetFilterDto = {
  id?: number;
  name?: string;
  gameId?: number;
} & PageDto;
