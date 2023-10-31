import { Id } from './shared';

export type RoleDto = {
  name: string;
};

export type RoleGetDto = Id & RoleDto;
