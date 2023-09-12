import { Id } from './shared';

export type DeckDto = {
  name: string;
  userId: number;
};

export type DeckGetDto = Id & DeckDto;
