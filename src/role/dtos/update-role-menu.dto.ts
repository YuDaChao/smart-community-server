import { IsArray, IsNumber, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateRoleMenuDto {
  @IsNumber()
  @IsPositive()
  roleId: number;
  @IsArray()
  @Type(() => Number)
  menuIds: number[];
}
