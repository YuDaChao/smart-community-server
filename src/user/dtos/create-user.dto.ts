import {
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
  @IsNumber()
  @IsPositive()
  roleId: number;
  @IsNumber()
  @IsPositive()
  @IsOptional()
  communityId: number;
}
