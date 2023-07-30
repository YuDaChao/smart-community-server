import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { AreaService } from './area.service';

@Controller('area')
export class AreaController {
  constructor(private readonly areaService: AreaService) {}

  @Get(':areaId')
  async getAreaInfo(@Param('areaId', new ParseIntPipe()) areaId: number) {
    return this.areaService.getRecursiveAreaInfoById(areaId);
  }
}
