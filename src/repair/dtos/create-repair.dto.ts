import { IsDate, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateRepairDto {
  @IsString()
  repairDesc: string;
  @IsDate()
  @Type(() => Date)
  serviceAt: Date;
  @IsNumber()
  @Type(() => Number)
  repairTypeId: number;
  @IsNumber()
  @Type(() => Number)
  residentId: number;
}
