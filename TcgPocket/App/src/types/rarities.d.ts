import { Id, PageDto } from './shared';

export type RarityDto = {
  name: string;
  gameId: number;
};

export type RarityGetDto = Id & RarityDto;

export type RarityFilterDto = {
  id?: number;
  name?: string;
  gameId?: number;
} & PageDto;
