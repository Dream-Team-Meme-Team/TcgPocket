import { CardGetDto } from './cards';
import { Id } from './shared';

export type DeckDto = {
  name: string;
  userId: number;
  gameId: number;
};

export type DeckGetDto = Id & DeckDto;

export type DeckDetailDto = DeckGetDto & {
  cards: CardGetDto[];
};

export type DeckDisplayDto = DeckGetDto & {
  cards: CardDisplayDto[];
};
