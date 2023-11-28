import { AttributeGetDto } from './attributes';
import { CardTypeGetDto } from './card-types';
import { GameGetDto } from './games';
import { RarityGetDto } from './rarities';
import { RoleGetDto } from './roles';
import { SetGetDto } from './sets';
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

export type AddToInventoryDto = {
    cardIds: number[];
  };

export type CardGetDto = Id & CardDto;

export type CardDetailDto = CardGetDto & {
  attributes: CardAttributeDto[];
};

export type CardFilterDto = {
  id?: number;
  name?: string;
  cardNumber?: string;
  gameIds?: number[];
  cardTypeIds?: number[];
  rarityIds?: number[];
  setIds?: number[];
  imageUrl?: string;
  description?: string;
} & PageDto;

export type CardAttributeDisplayDto = {
  attributeName: string;
};

export type CardDisplayDto = Id & {
  name: string;
  cardNumber: string;
  game: GameGetDto;
  cardType: CardTypeGetDto;
  rarity: RarityGetDto;
  set: SetGetDto;
  imageUrl: string;
  description: string;
  attributes: CardAttributeDisplayDto[];
};
