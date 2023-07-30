import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignInDto {
  @IsString()
  @IsNotEmpty()
  userName: string;
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
