import { Id } from './shared';

export type CardTypeDto = {
  name: string;
  gameId: number;
};

export type CardTypeGetDto = Id & CardTypeDto;
