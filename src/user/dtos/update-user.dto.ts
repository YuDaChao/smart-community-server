import { IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  avatar?: string;
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  communityId?: number;
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  roleId?: number;
}
