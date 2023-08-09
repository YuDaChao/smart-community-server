import { SetMetadata } from '@nestjs/common';
import { Permission } from '../commons/enums/permission.enum';

export const PERMISSION_KEY = 'permission_key';
export const Permissions = (...permissions: Permission[]) =>
  SetMetadata(PERMISSION_KEY, permissions);
