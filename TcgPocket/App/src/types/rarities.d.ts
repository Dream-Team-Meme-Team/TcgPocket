import { Id } from './shared';

export type RarityDto = {
  name: string;
  gameId: number;
};

export type RarityGetDto = Id & RarityDto;
