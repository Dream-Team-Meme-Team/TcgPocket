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

export type PagedResult<CardGetDto> = {
  items: List<CardGetDto>;
  PageCount: number;
  ItemCount: number;
  FirstRowOnPage: number;
  LastRowOnPage: number;
} & PageDto;

export type CardGetDto = Id & CardDto;
