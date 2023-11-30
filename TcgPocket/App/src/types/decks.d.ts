import {
  CardDisplayDto,
  CardGetDto,
  DeckCardDisplayDto,
  MiniCardDto,
} from './cards';
import { GameGetDto } from './games';
import { Id } from './shared';

export type DeckDto = {
  name: string;
  game: GameGetDto;
  userId: number;
};

export type DeckGetDto = Id & DeckDto;

export type DeckDetailDto = DeckGetDto & {
  cards: CardGetDto[];
};

export type DeckDisplayDto = DeckGetDto & {
  cards: DeckCardDisplayDto[];
};

export type DeckCreateDto = {
  name: string;
  gameId: number;
};

export type DeckUpdateDto = DeckCreateDto & {
  cards: MiniCardDto[];
};

export type UpdateDeckParams = {
  id: number;
  body: DeckUpdateDto;
};
