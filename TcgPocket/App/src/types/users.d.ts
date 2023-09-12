import { RoleGetDto } from './roles';
import { Id } from './shared';

export type UserDto = {
  userName: string;
  email: string;
  phoneNumber: string;
};

export type UserGetDto = Id & UserDto;
export type UserCreateDto = UserDto & { password: string };

export type UserRoleDto = {
  roles: RoleGetDto[];
};
