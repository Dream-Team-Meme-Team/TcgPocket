import { Id, PageDto } from './shared';
import { CardAttributeDto } from './card-attributes';

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

export type CardDetailDto = CardGetDto & {
  attributes: CardAttributeDto[];
};
