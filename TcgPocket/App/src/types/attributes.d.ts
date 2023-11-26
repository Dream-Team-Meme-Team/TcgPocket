import { Id, PageDto } from './shared';

export type AttributeDto = {
  name: string;
  gameId: number;
};

export type AttributeGetDto = Id & AttributeDto;

export type AttributeFilterDto = {
  id?: number;
  name?: string;
  gameId?: number;
} & PageDto;
