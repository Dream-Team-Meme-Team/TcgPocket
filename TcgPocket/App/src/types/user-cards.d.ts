import { Id } from './shared';

export type UserCardDto = {
  userId: string;
  cardId: string;
};

export type UserCardGetDto = Id & UserCardDto;
