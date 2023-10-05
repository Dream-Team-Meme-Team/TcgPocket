import { AttributeGetDto } from './attributes';
import { CardTypeGetDto } from './card-types';
import { GameGetDto } from './games';
import { RarityGetDto } from './rarities';
import { RoleGetDto } from './roles';
import { SetGetDto } from './sets';
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

export type CardDisplayDto = Id & {
  name: string;
  cardNumber: string;
  game: GameGetDto;
  cardType: CardTypeGetDto;
  rarity: RarityGetDto;
  set: SetGetDto;
  imageUrl: string;
  description: string;
  attributes: AttributeGetDto[];
};
