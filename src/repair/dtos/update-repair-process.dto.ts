import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateRepairProcessDto {
  @IsNumber()
  repairId: number;
  @IsString()
  @IsOptional()
  remark: string;
}
