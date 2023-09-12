import { Id } from './shared';

export type GameDto = {
  name: string;
};

export type GameGetDto = Id & GameDto;
