import { Id } from './shared';

export type AttributeDto = {
  name: string;
  gameId: number;
};

export type AttributeGetDto = Id & AttributeDto;
