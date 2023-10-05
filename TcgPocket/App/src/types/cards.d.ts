import { Id, PageDto } from './shared';

export type CardDto = {
  name: string;
  cardNumber: string;
  gameId: number;
  cardTypeId: number;
  rarityId: number;
  setId: number;
  imageUrl: string;
  description: string;
};

export type CardGetDto = Id & CardDto;

export type CardFilterDto = {
  id?: number;
  name?: string;
  cardNumber?: string;
  gameId?: number;
  cardTypeId?: number;
  rarityId?: number;
  setId?: number;
  imageUrl?: string;
  description?: string;
} & PageDto;
