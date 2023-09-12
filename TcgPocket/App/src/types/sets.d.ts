import { Id } from './shared';

export type SetDto = {
  name: string;
  gameId: number;
};

export type SetGetDto = Id & SetDto;
