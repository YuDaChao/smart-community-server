import { Role } from '@prisma/client';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  userName: string;
  @IsString()
  @MinLength(8)
  password: string;
  @IsString()
  @IsOptional()
  avatar: string;
  @IsEnum(Role)
  role: Role;
  @IsNumber()
  @IsPositive()
  @IsOptional()
  communityId: number;
}
