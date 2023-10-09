import { RoleGetDto } from './roles';
import { Id } from './shared';

export type UserDto = {
  userName: string;
  email: string;
  phoneNumber: string;
};

export type UserGetDto = {
  roles: List<RoleGetDto>;
} & Id &
  UserDto;

export type UserCreateDto = UserDto & {
  password: string;
  confirmPassword: string;
};

export type UserRoleDto = {
  roles: RoleGetDto[];
};

export type SignInUserDto = {
  userName: string;
  password: string;
};

export type UserPasswordUpdateDto = {
  userName: string;
  currentPassword: string;
  newPassword: string;
  newPasswordConfirmation: string;
};

export type UserDeleteDto = {
  password: string;
  confirmPassword: string;
};
