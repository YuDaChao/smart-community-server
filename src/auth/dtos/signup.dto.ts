import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class SignupDto {
  @IsString()
  @IsNotEmpty()
  userName: string;
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
  @IsOptional()
  @IsString()
  avatar: string;
  @IsNumber()
  communityId: number;
}
