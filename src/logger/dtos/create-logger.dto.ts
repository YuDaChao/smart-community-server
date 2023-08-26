import { IsNumber, IsObject, IsPositive, IsString } from 'class-validator';

export class CreateLoggerDto {
  @IsString()
  method: string;
  @IsString()
  url: string;
  @IsString()
  query: string;
  @IsString()
  param: string;
  @IsNumber()
  @IsPositive()
  userId: number;
  @IsObject()
  body: object;
}
