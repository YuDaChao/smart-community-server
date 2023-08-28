import { Type } from 'class-transformer';
import { IsNumber, IsPositive } from 'class-validator';

export class PageDto {
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  pageSize: number;
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  current: number;
}
