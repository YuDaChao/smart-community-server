import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateResidentDto } from './dtos/create-resident.dto';
import { GetResidentDto } from './dtos/get-resident.dto';
import { UpdateResidentDto } from './dtos/update-resident.dto';
import { ResidentService } from './resident.service';

@Controller('resident')
export class ResidentController {
  constructor(private readonly residentService: ResidentService) {}

  @Post()
  async createResident(@Body() createResidentDto: CreateResidentDto) {
    return await this.residentService.createResident(createResidentDto);
  }

  @Put(':residentId')
  async updateResident(
    @Param('residentId', new ParseIntPipe()) residentId: number,
    @Body() updateResidentDto: UpdateResidentDto,
  ) {
    return await this.residentService.updateResident(
      residentId,
      updateResidentDto,
    );
  }

  @Get()
  async getResidentList(@Query() getResidentDto: GetResidentDto) {
    return this.residentService.getResidentList(getResidentDto);
  }
}
