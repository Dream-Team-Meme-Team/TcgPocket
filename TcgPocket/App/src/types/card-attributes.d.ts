import { Id } from './shared';

export type CardAttributeDto = {
  cardId: number;
  attributeId: number;
};

export type CardAttributeGetDto = Id & CardAttributeDto;
